'use strict';

const path = require('path');

const { promisify } = require('util');
const { stat } = require('fs');
const statAsync = promisify(stat);

const formstream = require('formstream');

const { postJSON } = require('./util');

/**
 * 上传永久素材，分别有图片（image）、语音（voice）、视频（video）和普通文件（file）
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E4%B8%8A%E4%BC%A0%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
 * Examples:
 *    await api.addMaterial('filepath', type);
 *
 * Result:
 *    {
 *        "errcode":0,
 *        "errmsg":"ok",
 *        "media_id": "2-G6nrLmr5EFSDC3MMfasdfb_-zK1dDdzmd0p7"
 *    }
 *
 * Shortcut:
 *
 * - `exports.addImage(filepath);`
 * - `exports.addVoice(filepath);`
 * - `exports.addVideo(filepath);`
 * - `exports.addFile(filepath);`
 *
 * @param {String} filepath 文件路径
 * @param {String} type 媒体类型，可用值有image、voice、video、file
 */
exports.addMaterial = async function (filepath, type) {
  const { accessToken } = await this.ensureAccessToken();
  var stat = await statAsync(filepath);
  var form = formstream();
  form.file('media', filepath, path.basename(filepath), stat.size);
  var url = this.prefix + 'material/add_material?access_token=' + accessToken + '&type=' + type + '&agentid=' + this.agentid;
  var opts = {
    dataType: 'json',
    type: 'POST',
    timeout: 60000, // 60秒超时
    headers: form.headers(),
    stream: form
  };
  return this.request(url, opts);
};

['image', 'voice', 'video', 'file'].forEach(function (type) {
  var method = 'add' + type[0].toUpperCase() + type.substring(1) + 'Material';
  exports[method] = async function (filepath) {
    this.addMaterial(filepath, type);
  };
});

/**
 * 上传永久图文素材
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E4%B8%8A%E4%BC%A0%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
 * Examples:
 *    await api.addMPNews(mpnews);
 *
 * Result:
 *    {
 *        "errcode": "0",
 *        "errmsg": "ok",
 *        "media_id": "2-G6nrLmr5EC3MMfasdfb_-zK1dDdzmd0p7"
 *    }
 *
 * @param {String} mpnews 图文消息的结构
 */
exports.addMPNews = async function (mpnews) {
  const { accessToken } = await this.ensureAccessToken();
  var post_data = {
    agentid: this.agentid,
    mpnews: mpnews
  };

  var url = this.prefix + 'material/add_mpnews?access_token=' + accessToken;
  return this.request(url, postJSON(post_data));
};

/**
 * 更新永久图文素材
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E4%BF%AE%E6%94%B9%E6%B0%B8%E4%B9%85%E5%9B%BE%E6%96%87%E7%B4%A0%E6%9D%90>
 * Examples:
 *    await api.updateMPNews( media_id, mpnews);
 *
 * Result:
 * {"errcode": "0","errmsg": "ok"}
 *
 * @param {String} media_id 素材id
 * @param {String} mpnews 图文消息的结构
 */
exports.updateMPNews = async function (agentid, media_id, mpnews) {
  const { accessToken } = await this.ensureAccessToken();

  var post_data = {
    agentid: this.agentid,
    media_id: media_id,
    mpnews: mpnews
  };
  var url = this.prefix + 'material/update_mpnews?access_token=' + accessToken;
  return this.request(url, postJSON(post_data));
};

/**
 * 获取永久素材
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
 * Examples:
 *    await api.getMaterial('media_id');
 *
 * @param {String} mediaId 媒体文件的ID
 */
exports.getMaterial = async function (mediaId) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'material/get?access_token=' + accessToken + '&media_id=' + mediaId + '&agentid=' + this.agentid;
  var opts = {
    method: 'POST',
    data: JSON.stringify({'media_id': mediaId}),
    headers: {
      'Content-Type': 'application/json'
    },
    timeout : 60000 // 60秒超时
  };
  return this.request(url, opts);
};

/**
 * 删除永久素材
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E5%88%A0%E9%99%A4%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
 * Examples:
 *    await api.delMaterial('media_id');
 *
 * Result:
 *    {"errcode": "0","errmsg": "deleted"}
 *
 * @param {String} mediaId 媒体文件的ID
 */
exports.delMaterial = async function (mediaId) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'material/del?access_token=' + accessToken + '&media_id=' + mediaId + '&agentid=' + this.agentid;
  return this.request(url);
};

/**
 * 获取素材总数
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E7%B4%A0%E6%9D%90%E6%80%BB%E6%95%B0>
 * Examples:
 *    await api.countMaterial();
 * 
 * Result:
 *    {
 *        "errcode": "0",
 *        "errmsg": "ok", 
 *        "total_count": 37,
 *        "image_count": 12, 
 *        "voice_count": 10, 
 *        "video_count": 3,  
 *        "file_count": 3, 
 *        "mpnews_count": 6
 *    }
 *
 */
exports.countMaterial = async function () {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'material/get_count?access_token=' + accessToken + '&agentid=' + this.agentid;
  return this.request(url);
};

/**
 * 获取素材列表
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E7%B4%A0%E6%9D%90%E5%88%97%E8%A1%A8>
 * type 可为图片（image）、语音（voice）、视频（video）、普通文件（file）、图文消息（mpnews）
 * 
 * Examples:
 *    await api.batchgetMaterial(type, offset, count);
 *
 *
 * Result:
 *    {
 *        "errcode": "0",
 *        "errmsg": "ok", 
 *        "total_count": 37,
 *        "image_count": 12, 
 *        "voice_count": 10, 
 *        "video_count": 3,  
 *        "file_count": 3, 
 *        "mpnews_count": 6
 *    }
 *
 * @param {String} type 媒体类型 可以为图文(mpnews)、图片（image）、音频（voice）、视频（video）、文件（file）
 * @param {String} offset 从该类型素材的该偏移位置开始返回，0表示从第一个素材返回
 * @param {String} count 返回素材的数量，取值在1到50之间
 */
exports.batchgetMaterial = async function (type, offset, count) {
  const { accessToken } = await this.ensureAccessToken();
  var url = this.prefix + 'material/batchget?access_token=' + accessToken;
  var post_data = {
    "type": type, 
    "agentid": this.agentid,
    "offset": parseInt(offset || 0), 
    "count": parseInt(count || 10)
  }
  return this.request(url, postJSON(post_data));
};


