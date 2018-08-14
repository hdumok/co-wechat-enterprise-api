// 本文件用于实现异步批量任务接口
// 所有的批量操作都是以上传的数据文件(CSV格式)作为基础的，
// 所以在调用一下接口之前需要先调用uploadMedia把数据文件传到微信的服务器上。
'use strict';

const { postJSON } = require('./util');

/**
 * 批量邀请成员
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=
 *
 * Examples:
 *    await api.batchInviteUser(to, taskCb);
 *
 * To:
 *    {
 *        "touser":"xxx|xxx",
 *        "toparty":"xxx|xxx",
 *        "totag":"xxx|xxx",
 *        "invite_tips":"xxx",
 *    }
 *
 * TaskCb:
 *    {
 *        "url": "xxx",
 *        "token": "xxx",
 *        "encodingaeskey": "xxx"
 *    }
 *
 * Result:
 *    {
 *        "errcode": 0,
 *        "errmsg": "ok",
 *        "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 *    }
 *
 * @param {Object} to 批量邀请的数据结构
 * @param {Object} taskCb 任务执行完毕后的回调结构
 */
exports.batchInviteUser = async function (to, taskCb) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'batch/inviteuser?access_token=' + accessToken;
  var data = to;
  if (taskCb) {
    data.callback = taskCb;
  }
  return this.request(url, postJSON(data));
};

/**
 * 批量更新成员
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=
 *
 * Examples:
 *    await api.batchSyncUser(mediaId, taskCb);
 *
 * TaskCb:
 *    {
 *        "url": "xxx",
 *        "token": "xxx",
 *        "encodingaeskey": "xxx"
 *    }
 * 
 * Result:
 *    {
 *        "errcode": 0,
 *        "errmsg": "ok",
 *        "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 *    }
 *
 * @param {String} mediaId 数据文件的mediaId
 * @param {Object} taskCb 任务执行完毕后的回调结构
 */
exports.batchSyncUser = async function (mediaId, taskCb) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'batch/syncuser?access_token=' + accessToken;
  var data = {
    media_id: mediaId
  };

  if (taskCb) {
    data.callback = taskCb;
  }

  return this.request(url, postJSON(data));
};

/**
 * 全量覆盖成员
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=
 *
 * Examples:
 *    await api.batchReplaceUser(mediaId, taskCb);
 *
 * TaskCb:
 *    {
 *        "url": "xxx",
 *        "token": "xxx",
 *        "encodingaeskey": "xxx"
 *    }
 *
 * Result:
 *    {
 *       "errcode": 0,
 *       "errmsg": "ok",
 *       "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 *    }
 *
 * @param {String} mediaId 数据文件的mediaId
 * @param {Object} taskCb 任务执行完毕后的回调结构
 */
exports.batchReplaceUser = async function (mediaId, taskCb) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'batch/replaceuser?access_token=' + accessToken;
  var data = {
    media_id: mediaId
  };

  if (taskCb) {
    data.callback = taskCb;
  }

  return this.request(url, postJSON(data));
};

/**
 * 全量覆盖部门
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=
 *
 * Examples:
 *    await api.batchReplaceParty(mediaId, taskCb);
 *
 * TaskCb:
 *    {
 *        "url": "xxx",
 *        "token": "xxx",
 *        "encodingaeskey": "xxx"
 *    }
 *
 * Result:
 *    {
 *        "errcode": 0,
 *        "errmsg": "ok",
 *        "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 *    }
 *
 * @param {Object} mediaId 数据文件的mediaId
 * @param {Object} taskCb 任务执行完毕后的回调结构
 */
exports.batchReplaceParty = async function (mediaId, taskCb) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'batch/replaceparty?access_token=' + accessToken;
  var data = {
    media_id: mediaId
  };

  if (taskCb) {
    data.callback = taskCb;
  }

  return this.request(url, postJSON(data));
};

/**
 * 获取批量任务的结果
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=管理成员
 *
 * Examples:
 *    await api.batchGetResult(jobid);
 *
 * 返回结果参考微信的官方文档
 * @param {String} jobid 启动批量任务时返回的任务ida
 */
exports.batchGetResult = async function (jobid) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'batch/getresult?access_token=' + accessToken + '&jobid=' + jobid;
  return this.request(url);
};
