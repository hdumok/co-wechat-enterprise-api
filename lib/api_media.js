'use strict';

const util = require('util');
const path = require('path');

const {stat} = require('fs');

const statAsync = util.promisify(stat);

const formstream = require('formstream');

/**
 * 上传多媒体文件，分别有图片（image）、语音（voice）、视频（video）和普通文件（file）
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=上传媒体文件>
 *   
 * Examples:
 *    await api.uploadMedia('filepath', type);
 *
 * Result:
 *    {"type":"image","media_id":"0000001","created_at":123456789}
 *
 * Shortcut:
 *
 * - `exports.uploadImage(filepath);`
 * - `exports.uploadVoice(filepath);`
 * - `exports.uploadVideo(filepath);`
 * - `exports.uploadFile(filepath);`
 *
 * @param {String} filepath 文件路径
 * @param {String} type 媒体类型，可用值有image、voice、video、file
 */
exports.uploadMedia = async function (filepath, type) {
  const {accessToken} = await this.ensureAccessToken();
  var form = formstream();
  if (Buffer.isBuffer(filepath)) {
    form.buffer('media', filepath, filename, mime);
  } else if (typeof filepath === 'string') {
    var stat = await statAsync(filepath);
    form.file('media', filepath, filename || path.basename(filepath), stat.size);
  }
  var url = this.prefix + 'media/upload?access_token=' + accessToken + '&type=' + type;
  var opts = {
    method: 'POST',
    timeout: 60000, // 60秒超时
    headers: form.headers(),
    data: form
  };
  opts.headers.Accept = 'application/json';
  return this.request(url, opts);
};

['image', 'voice', 'video', 'file'].forEach(function (type) {
  var method = 'upload' + type[0].toUpperCase() + type.substring(1);
  exports[method] = function (filepath) {
    this.uploadMedia(filepath, type);
  };
});

/**
 * 根据媒体ID获取媒体内容
 * 详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=获取媒体文件>
 *   
 * Examples:
 *    await api.getMedia('media_id');
 *
 * @param {String} mediaId 媒体文件的ID
 */
exports.getMedia = async function (mediaId) {
  const {accessToken} = await this.ensureAccessToken();
  var url = this.prefix + 'media/get?access_token=' + accessToken + '&media_id=' + mediaId;
  var opts = {
    timeout: 60000 // 60秒超时
  };
  return this.request(url, opts);
};
