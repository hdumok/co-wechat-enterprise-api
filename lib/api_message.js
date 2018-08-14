'use strict';

const { postJSON } = require('./util');

/**
 * 发送消息分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）
 * 详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=发送接口说明
 * 
 * Examples:
 *    await api.send(to, message);
 *
 * To:
 *    {
 *        "touser": "UserID1|UserID2|UserID3",
 *        "toparty": " PartyID1 | PartyID2 ",
 *        "totag": " TagID1 | TagID2 "
 *    }
 *
 * Message:
 *    文本消息：
 *    {
 *     "msgtype": "text",
 *     "text": {
 *       "content": "Holiday Request For Pony(http://xxxxx)"
 *     },
 *     "safe":"0"
 *    }
 *
 *    图片消息：
 *    {
 *     "msgtype": "image",
 *     "image": {
 *       "media_id": "MEDIA_ID"
 *     },
 *     "safe":"0"
 *    }
 *
 *    语音消息：
 *    
 *    {
 *     "msgtype": "voice",
 *     "voice": {
 *       "media_id": "MEDIA_ID"
 *     },
 *     "safe":"0"
 *    }
 *
 *    视频消息：
 *    {
 *     "msgtype": "video",
 *     "video": {
 *       "media_id": "MEDIA_ID"
 *       "title": "Title",
 *       "description": "Description"
 *     },
 *     "safe":"0"
 *    }
 *
 *    文件消息：
 *    {
 *     "msgtype": "file",
 *     "file": {
 *       "media_id": "MEDIA_ID"
 *     },
 *     "safe":"0"
 *    }
 *
 *    图文消息：
 *    {
 *     "msgtype": "news",
 *     "news": {
 *       "articles":[
 *         {
 *           "title": "Title",
 *           "description": "Description",
 *           "url": "URL",
 *           "picurl": "PIC_URL",
 *         },
 *         {
 *           "title": "Title",
 *           "description": "Description",
 *           "url": "URL",
 *           "picurl": "PIC_URL",
 *         }
 *       ]
 *     },
 *     "safe":"0"
 *    }
 *
 *    MP消息：
 *    {
 *     "msgtype": "mpnews",
 *     "mpnews": {
 *       "articles":[
 *         {
 *           "thumb_media_id": "id",
 *           "author": "Author",
 *           "content_source_url": "URL",
 *           "content": "Content"
 *           "digest": "Digest description",
 *           "show_cover_pic": "0"
 *         },
 *         {
 *           "thumb_media_id": "id",
 *           "author": "Author",
 *           "content_source_url": "URL",
 *           "content": "Content"
 *           "digest": "Digest description",
 *           "show_cover_pic": "0"
 *         }
 *       ],
 *       "media_id": "id"
 *     },
 *     "safe":"0"
 *    }
 *
 *
 * Result:
 *    {
 *     "errcode": 0,
 *     "errmsg": "ok",
 *     "invaliduser": "UserID1",
 *     "invalidparty":"PartyID1",
 *     "invalidtag":"TagID1"
 *    }
 *
 *
 * @param {Object} to 接受消息的用户
 * @param {Object} message 消息对象
 */
exports.send = async function (to, message) {
  const { accessToken } = await this.ensureAccessToken();
  // https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=ACCESS_TOKEN
  var url = this.prefix + 'message/send?access_token=' + accessToken;
  var data = {
    agentid: this.agentid
  };
  Object.assign(data, to);
  Object.assign(data, message);

  return this.request(url, postJSON(data));
};
