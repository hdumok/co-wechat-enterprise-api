'use strict';

const { postJSON } = require('./util');

/**
 * 创建部门
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=管理部门
 *
 * Examples:
 *    await api.createDepartment(name, opts);
 *
 * Opts:
 * - `parentid`, 父部门id，根部门id为1
 * - `order`，在父部门中的次序。从1开始，数字越大排序越靠后
 * - `id`，部门ID。用指定部门ID新建部门，不指定此参数时，则自动生成
 *
 * Result:
 *    {
 *        "errcode": 0,
 *        "errmsg": "created",
 *        "id": 2
 *    }
 *
 * @param {String} name 部门名字
 * @param {Object} opts 选项
 */
exports.createDepartment = async function (name, opts) {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/department/create?access_token=ACCESS_TOKEN
  var url = this.prefix + 'department/create?access_token=' + accessToken;
  var data = {
    name: name
  };
  if (typeof opts === 'object') {
    data.parentid = Number(opts.parentid) || 1;
    data.order = Number(opts.order) || 1;
    if (opts.id) {
      data.id = Number(opts.id);
    };
  } else {
    data.parentid = Number(opts);
  }

  return this.request(url, postJSON(data));
};

/**
 * 更新部门
 *
 * Examples:
 *    var opts = {name: 'new name', parentid: 1, order: 5};
 *    await api.updateDepartment(id, opts);
 *
 * Opts:
 * - `name`, 新的部门名字。可选
 * - `parentid`, 父部门id，根部门id为1。可选
 * - `order`，在父部门中的次序。从1开始，数字越大排序越靠后。可选，默认为1
 *
 * Result:
 *    {
 *        "errcode": 0,
 *        "errmsg": "updated"
 *    }
 *
 * @param {Number} id 部门ID
 * @param {Object} opts 选项
 */
exports.updateDepartment = async function (id, opts) {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/department/update?access_token=ACCESS_TOKEN
  var url = this.prefix + 'department/update?access_token=' + accessToken;
  var data = {
    id: Number(id)
  };
  if (typeof opts === 'object') {
    if (opts.name) {
      data.name = opts.name;
    }
    if (opts.parentid) {
      data.parentid = Number(opts.parentid);
    }
    if (opts.order) {
      data.order = Number(opts.order) || 1;
    }
  } else {
    data.name = opts;
  }

  return this.request(url, postJSON(data));
};

/**
 * 删除部门
 *
 * Examples:
 *    await api.deleteDepartment(id);
 *    await api.deleteDepartment([id1, id2]);
 *
 * Result:    
 *    {
 *        "errcode": 0,
 *        "errmsg": "deleted"
 *    }
 *
 * @param {Number|Array} id 部门ID
 */
exports.deleteDepartment = async function (id) {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/department/delete?access_token=ACCESS_TOKEN&id=1&id=2
  var url = this.prefix + 'department/delete?access_token=' + accessToken;
  var opts = {
    data: {id}
  };
  return this.request(url, opts);
};

/**
 * 查看所有部门
 *
 * Examples:
 *    await api.getDepartments(callback);
 *
 *
 * Result:
 *    {
 *        "errcode": 0,
 *        "errmsg": "ok",
 *        "department": [
 *              {
 *                "id": 1,
 *                "name": "广州研发中心",
 *                "parentid": 0
 *              },
 *              {
 *                "id": 2
 *                "name": "邮箱产品部",
 *                "parentid": 1
 *              }
 *        ]
 *    }
 *
 */
exports.getDepartments = async function () {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/department/list?access_token=ACCESS_TOKEN
  var url = this.prefix + 'department/list?access_token=' + accessToken;
  return this.request(url);
};
