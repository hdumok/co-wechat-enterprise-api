'use strict';

const { postJSON } = require('./util');

/**
 * 获取设备及用户信息
 *
 * Examples:
 *    await api.getShakeInfo("ticket");
 *
 * Result:
 *    {
 *        "errcode": 0,
 *        "errmsg": "ok"
 *    }   
 *
 * @param {String} ticket 摇周边业务的ticket，可在摇到的URL中得到，ticket生效时间为30分钟，每一次摇都会重新生成新的ticket
 */

exports.getShakeInfo = async function (ticket) {
  const { accessToken } = await this.ensureAccessToken();
  //https://qyapi.weixin.qq.com/cgi-bin/shakearound/getshakeinfo?access_token=ACCESS_TOKEN
  var url = this.prefix + 'shakearound/getshakeinfo?access_token=' + accessToken;
  var opts = {
    "ticket": ticket
  };
  return this.request(url, postJSON(opts));
};