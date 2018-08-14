'use strict';

const crypto = require('crypto');

class Ticket {
  constructor(ticket, expireTime) {
    this.ticket = ticket;
    this.expireTime = expireTime;
  }

  isValid() {
    return !!this.ticket && (new Date().getTime()) < this.expireTime;
  }
}

/**
 * 多台服务器负载均衡时，ticketToken需要外部存储共享。
 * 需要调用此registerTicketHandle来设置获取和保存的自定义方法。
 *
 * Examples:
 *    await api.registerTicketHandle(async function () {
 *      // 传入一个获取全局 ticket 的方法
 *      var txt = await fs.readFile('ticket.txt', 'utf8');
 *      return JSON.parse(txt);
 *    }, async function (ticket) {
 *      // 请将 ticket 存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
 *      // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
 *      await fs.writeFile('ticket.txt', JSON.stringify(ticket));
 *    });
 *
 * @param {AsyncFunction} getTicketToken 获取外部ticketToken的函数
 * @param {AsyncFunction} saveTicketToken 存储外部ticketToken的函数
 */
exports.registerTicketHandle = function (getTicketToken, saveTicketToken) {
  if (!getTicketToken && !saveTicketToken) {
    this.ticketStore = {};
  }
  this.getTicketToken = getTicketToken || async function (type) {
    type = type || 'jsapi';
    return this.ticketStore[type];
  };

  this.saveTicketToken = saveTicketToken || async function (type, ticketToken) {
    // 向下兼容
    if (arguments.length === 1) {
      ticketToken = type;
      type = 'jsapi';
    }

    this.ticketStore[type] = ticketToken;
    if (process.env.NODE_ENV === 'production') {
      console.warn('Dont save ticket in memory, when cluster or multi-computer!');
    }
  };
};

/**
 * 获取js sdk所需的有效js ticket
 *
 * Result:
 * - `errcode`, 0为成功
 * - `errmsg`, 成功为'ok'，错误则为详细错误信息
 * - `ticket`, js sdk有效票据，如：bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA
 * - `expires_in`, 有效期7200秒，开发者必须在自己的服务全局缓存jsapi_ticket
 *
 */
exports.getTicket = async function (type) {
  const { accessToken } = await this.ensureAccessToken();
  type = type || 'jsapi';

  var url = this.prefix + 'get_jsapi_ticket?access_token=' + accessToken;
  var data = await this.request(url);

  // 过期时间，因网络延迟等，将实际过期时间提前10秒，以防止临界点
  var expireTime = Date.now() + (data.expires_in - 10) * 1000;
  var ticket = new Ticket(data.ticket, expireTime);
  await this.saveTicketToken(type, ticket);
  return ticket;
};

/*!
 * 生成随机字符串
 */
var createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

/*!
 * 生成时间戳
 */
var createTimestamp = function () {
  return '' + Math.floor(Date.now() / 1000);
};

/*!
 * 排序查询字符串
 */
var raw = function (args) {
  var keys = Object.keys(args);
  keys = keys.sort();
  var newArgs = {};
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    newArgs[key.toLowerCase()] = args[key];
  }

  var string = '';
  var newKeys = Object.keys(newArgs);
  for (let i = 0; i < newKeys.length; i++) {
    let k = newKeys[i];
    string += '&' + k + '=' + newArgs[k];
  }
  return string.substr(1);
};

/*!
 * 签名算法
 *
 * @param {String} nonceStr 生成签名的随机串
 * @param {String} jsapi_ticket 用于签名的jsapi_ticket
 * @param {String} timestamp 时间戳
 * @param {String} url 用于签名的url，注意必须与调用JSAPI时的页面URL完全一致
 */
var sign = function (nonceStr, jsapi_ticket, timestamp, url) {
  var ret = {
    jsapi_ticket: jsapi_ticket,
    nonceStr: nonceStr,
    timestamp: timestamp,
    url: url
  };
  var string = raw(ret);
  var shasum = crypto.createHash('sha1');
  shasum.update(string);
  return shasum.digest('hex');
};

exports.ensureTicket = async function (type) {
  var cache = await this.getTicketToken(type);

  var ticket;
  // 有ticket并且ticket有效直接调用
  if (cache) {
    ticket = new Ticket(cache.ticket, cache.expireTime);
  }

  // 没有ticket或者无效
  if (!ticket || !ticket.isValid()) {
    // 从微信端获取ticket
    ticket = await this.getTicket(type);
  }
  return ticket;
};


/**
 * 获取微信JS SDK Config的所需参数
 * 
 * Examples:
 *    var param = {
 *     debug: false,
 *     jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
 *     url: 'http://www.xxx.com'
 *    };
 *    await api.getJsConfig(param);
 *
 * - `result`, 调用正常时得到的js sdk config所需参数
 * @param {Object} param 参数
 */
exports.getJsConfig = async function (param) {

  var ticket = await this.ensureTicket('jsapi');
  var nonceStr = createNonceStr();
  var jsAPITicket = ticket.ticket;
  var timestamp = createTimestamp();
  var signature = sign(nonceStr, jsAPITicket, timestamp, param.url);

  return {
    debug: param.debug,
    appId: this.appid,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: param.jsApiList
  };
};

/**
 * 获取最新的js api ticket
 * 
 * Examples:
 *    await api.getLatestTicket();
 *
 * - `err`, 获取js api ticket出现异常时的异常对象
 * - `ticket`, 获取的ticket
 */
exports.getLatestTicket = async function () {
  return this.ensureTicket('jsapi');
};
