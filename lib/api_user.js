'use strict';

const { postJSON } = require('./util');
const querystring = require('querystring');

/**
 * 创建成员
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=管理成员
 *
 * Examples:
 *    await api.createUser(user);
 *
 * User:
 *    {
 *      "userid": "zhangsan",
 *      "name": "张三",
 *      "department": [1, 2],
 *      "position": "产品经理",
 *      "mobile": "15913215421",
 *      "gender": 1,
 *      "tel": "62394",
 *      "email": "zhangsan@gzdev.com",
 *      "weixinid": "zhangsan4dev"
 *    }
 *
 *
 * Result:
 *    {
 *      "errcode": 0,
 *      "errmsg": "created"
 *    }
 *
 * @param {Object} user 成员信息
 */
exports.createUser = async function (user) {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/user/create?access_token=ACCESS_TOKEN
  var url = this.prefix + 'user/create?access_token=' +  accessToken;
  return this.request(url, postJSON(user));
};

/**
 * 更新成员
 *
 * Examples:
 *    await api.updateUser(user);
 *
 * User:
 *    {
 *      "userid": "zhangsan",
 *      "name": "李四",
 *      "department": [1],
 *      "position": "后台工程师",
 *      "mobile": "15913215421",
 *      "gender": 1,
 *      "tel": "62394",
 *      "email": "zhangsan@gzdev.com",
 *      "weixinid": "lisifordev",
 *      "enable": 1
 *    }
 *
 * Result:
 *    {
 *     "errcode": 0,
 *     "errmsg": "updated"
 *    }
 *
 * @param {Object} user 成员信息
 */
exports.updateUser = async function (user) {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/user/update?access_token=ACCESS_TOKEN
  var url = this.prefix + 'user/update?access_token=' +  accessToken;
  return this.request(url, postJSON(user));
};

/**
 * 删除成员
 *
 * Examples:
 *    await api.deleteUser(id);
 *
 * Result:
 *    {
 *     "errcode": 0,
 *     "errmsg": "deleted"
 *    }
 *
 * @param {Number} id 成员ID
 */
exports.deleteUser = async function (id) {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/user/delete?access_token=ACCESS_TOKEN&userid=lisi
  var url = this.prefix + 'user/delete?access_token=' +  accessToken;
  var opts = {
    data: {userid: id}
  };
  return this.request(url, opts);
};

/**
 * 批量删除成员
 *
 * Examples:
 *    await api.deleteUsers(["zhangsan", "lisi"]);
 *
 * Result:
 *    {
 *     "errcode": 0,
 *     "errmsg": "deleted"
 *    }
 *
 * @param {Array} users 待删除的用户
 */
exports.deleteUser = async function (users) {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/user/batchdelete?access_token=ACCESS_TOKEN
  var url = this.prefix + 'user/batchdelete?access_token=' +  accessToken;
  var opts = {
    "useridlist": users
  };
  return this.request(url, postJSON(opts));
};

/**
 * 获取成员
 *
 * Examples:
 *    await api.getUser(id);
 *
 * Result:
 *    {
 *      "errcode": 0,
 *      "errmsg": "ok",
 *      "userid": "zhangsan",
 *      "name": "李四",
 *      "department": [1, 2],
 *      "position": "后台工程师",
 *      "mobile": "15913215421",
 *      "gender": 1,
 *      "tel": "62394",
 *      "email": "zhangsan@gzdev.com",
 *      "weixinid": "lisifordev",
 *      "avatar": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA3WJ6DSZUfiakYe37PKnQhBIeOQBO4czqrnZDS79FH5Wm5m4X69TBicnHFlhiafvDwklOpZeXYQQ2icg/0",
 *      "status": 1
 *    }
 *
 * @param {Number} id 成员ID
 */
exports.getUser = async function (id) {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=ACCESS_TOKEN&userid=lisi
  var url = this.prefix + 'user/get?access_token=' +  accessToken;
  var opts = {
    data: {userid: id}
  };
  return this.request(url, opts);
};

/**
 * 获取部门成员
 *
 * Examples:
 *    await api.getDepartmentUsers(departmentId, fetchChild, status);
 *
 * Result:
 *    {
 *      "errcode": 0,
 *      "errmsg": "ok",
 *      "userlist": [
 *        {
 *          "userid": "zhangsan",
 *          "name": "李四"
 *        }
 *      ]
 *    }
 *
 * @param {Number} departmentId 部门ID
 * @param {Number} fetchChild 值：1/0，是否递归获取子部门下面的成员
 * @param {Number} status 0获取全部员工，1获取已关注成员列表，2获取禁用成员列表，4获取未关注成员列表。status可叠加
 */
exports.getDepartmentUsers = async function (departmentId, fetchChild, status) {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/user/simplelist?access_token=ACCESS_TOKEN&department_id=1&fetch_child=0&status=0
  var url = this.prefix + 'user/simplelist?access_token=' +  accessToken;
  var opts = {
    data: {
      department_id: departmentId,
      fetch_child: fetchChild,
      status: status
    }
  };
  return this.request(url, opts);
};

/**
 * 获取部门成员(详情)
 *
 * Examples:
 *    await api.getDepartmentUsersDetail(departmentId, fetchChild, status);
 *
 * Result:
 *    {
 *     "errcode": 0,
 *     "errmsg": "ok",
 *     "userlist": [
 *       {
 *         "userid": "zhangsan",
 *         "name": "李四",
 *         "department": [1, 2],
 *         "position": "后台工程师",
 *         "mobile": "15913215421",
 *         "email": "zhangsan@gzdev.com",
 *         "weixinid": "lisifordev",
 *         "avatar": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA3WJ6DSZUfiakYe37PKnQhBIeOQBO4czqrnZDS79FH5Wm5m4X69TBicnHFlhiafvDwklOpZeXYQQ2icg/0",
 *         "status": 1,
 *         "extattr": {"attrs":[{"name":"爱好","value":"旅游"},{"name":"卡号","value":"1234567234"}]}
 *       }
 *     ]
 *    }
 *
 * @param {Number} departmentId 部门ID
 * @param {Number} fetchChild 值：1/0，是否递归获取子部门下面的成员
 * @param {Number} status 0获取全部员工，1获取已关注成员列表，2获取禁用成员列表，4获取未关注成员列表。status可叠加
 */
exports.getDepartmentUsersDetail = async function (departmentId, fetchChild, status) {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/user/list?access_token=ACCESS_TOKEN&department_id=1&fetch_child=0&status=0
  var url = this.prefix + 'user/list?access_token=' +  accessToken;
  var opts = {
    data: {
      department_id: departmentId,
      fetch_child: fetchChild,
      status: status
    }
  };
  return this.request(url, opts);
};

/**
 * 邀请成员关注
 *
 * 详情：http://qydev.weixin.qq.com/wiki/index.php?title=%E7%AE%A1%E7%90%86%E6%88%90%E5%91%98#.E9.82.80.E8.AF.B7.E6.88.90.E5.91.98.E5.85.B3.E6.B3.A8
 *
 * Examples:
 *    await api.inviteUser(id, invite_tips);
 *
 * Callback:
 * - `err`, 调用失败时得到的异常
 * - `result`, 调用正常时得到的对象
 *
 * Result:
 *    {
 *     "errcode": 0,
 *     "errmsg": "ok",
 *     "type":1
 *    }
 *
 * @param {String} id userid
 * @param {String} invite_tips 邀请的一句话
 */
exports.inviteUser = async function (id, invite_tips) {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/invite/send?access_token=ACCESS_TOKEN
  var url = this.prefix + 'invite/send?access_token=' +  accessToken;
  var opts = {
    userid: id,
    invite_tips: invite_tips
  };
  return this.request(url, postJSON(opts));
};

/**
 * 根据Code获取用户ID
 *
 * 详情：http://qydev.weixin.qq.com/wiki/index.php?title=根据code获取成员信息
 *
 * Examples:
 *    await api.getUserIdByCode(code);
 *
 * Result:
 *    {
 *      "UserId": "USERID"
 *    }
 *
 * @param {String} code OAuth授权获取的code
 */
exports.getUserIdByCode = async function (code) {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=ACCESS_TOKEN&code=CODE&agentid=AGENTID
  var url = this.prefix + 'user/getuserinfo?access_token=' +  accessToken;
  var opts = {
    data: {
      code: code,
      agentid: this.agentid
    }
  };
  return this.request(url, opts);
};

/**
 * 获取授权页面的URL地址
 * @param {String} redirect 授权后要跳转的地址
 * @param {String} state 开发者可提供的数据
 * @param {String} scope 作用范围，值为snsapi_userinfo和snsapi_base，前者用于弹出，后者用于跳转
 */
exports.getAuthorizeURL = function (redirect, state, scope) {
  var url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
  var info = {
    appid: this.corpid,
    redirect_uri: redirect,
    response_type: 'code',
    scope: scope || 'snsapi_base',
    state: state || ''
  };

  return url + '?' + querystring.stringify(info) + '#wechat_redirect';
};
