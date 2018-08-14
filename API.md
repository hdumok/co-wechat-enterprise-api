  - [exports.getAgent](#exportsgetagent)
  - [exports.setAgent](#exportssetagent)
  - [exports.listAgent](#exportslistagent)
  - [exports.batchInviteUser](#exportsbatchinviteuser)
  - [exports.batchSyncUser](#exportsbatchsyncuser)
  - [exports.batchReplaceUser](#exportsbatchreplaceuser)
  - [exports.batchReplaceParty](#exportsbatchreplaceparty)
  - [exports.batchGetResult](#exportsbatchgetresult)
  - [exports.createDepartment](#exportscreatedepartment)
  - [exports.updateDepartment](#exportsupdatedepartment)
  - [exports.deleteDepartment](#exportsdeletedepartment)
  - [exports.getDepartments](#exportsgetdepartments)
  - [exports.getIp](#exportsgetip)
  - [exports.registerTicketHandle()](#exportsregistertickethandlegettickettokenasyncfunctionsavetickettokenasyncfunction)
  - [exports.getTicket](#exportsgetticket)
  - [exports.getJsConfig](#exportsgetjsconfig)
  - [exports.getLatestTicket](#exportsgetlatestticket)
  - [exports.addMaterial](#exportsaddmaterial)
  - [exports.addMPNews](#exportsaddmpnews)
  - [exports.updateMPNews](#exportsupdatempnews)
  - [exports.getMaterial](#exportsgetmaterial)
  - [exports.delMaterial](#exportsdelmaterial)
  - [exports.countMaterial](#exportscountmaterial)
  - [exports.batchgetMaterial](#exportsbatchgetmaterial)
  - [exports.uploadMedia](#exportsuploadmedia)
  - [exports.getMedia](#exportsgetmedia)
  - [exports.createMenu](#exportscreatemenu)
  - [exports.getMenu](#exportsgetmenu)
  - [exports.removeMenu](#exportsremovemenu)
  - [exports.send](#exportssend)
  - [exports.getShakeInfo](#exportsgetshakeinfo)
  - [exports.createTag](#exportscreatetag)
  - [exports.updateTagName](#exportsupdatetagname)
  - [exports.deleteTag](#exportsdeletetag)
  - [exports.listTags](#exportslisttags)
  - [exports.getTagUsers](#exportsgettagusers)
  - [exports.addTagUsers](#exportsaddtagusers)
  - [exports.deleteTagUsers](#exportsdeletetagusers)
  - [exports.createUser](#exportscreateuser)
  - [exports.updateUser](#exportsupdateuser)
  - [exports.deleteUser](#exportsdeleteuser)
  - [exports.deleteUser](#exportsdeleteuser)
  - [exports.getUser](#exportsgetuser)
  - [exports.getDepartmentUsers](#exportsgetdepartmentusers)
  - [exports.getDepartmentUsersDetail](#exportsgetdepartmentusersdetail)
  - [exports.inviteUser](#exportsinviteuser)
  - [exports.getUserIdByCode](#exportsgetuseridbycode)
  - [exports.getAuthorizeURL()](#exportsgetauthorizeurlredirectstringstatestringscopestring)

## exports.getAgent

  获取企业号应用
  详细请看：<http://qydev.weixin.qq.com/wiki/index.php?title=获取企业号应用>
  
  Examples:
```js
 await api.getAgent();
```

  Result:
```js
 {
     "errcode":"0",
     "errmsg":"ok" ,
     "agentid":"1" ,
     "name":"NAME" ,
     "square_logo_url":"xxxxxxxx" ,
     "round_logo_url":"yyyyyyyy" ,
     "description":"desc" ,
     "allow_userinfos":{
        "user":[
           {
               "userid":"id1",
               "status":"1"
           },
           {
               "userid":"id2",
               "status":"1"
           },
           {
               "userid":"id3",
               "status":"1"
           }
        ]
      },
     "allow_partys":{
         "partyid": [1]
      },
     "allow_tags":{
         "tagid": [1,2,3]
      }
     "close":0 ,
     "redirect_domain":"www.qq.com",
     "report_location_flag":0,
     "isreportuser":0,
     "isreportenter":0
 }
```

## exports.setAgent

  设置企业号应用
  详细请看：<http://qydev.weixin.qq.com/wiki/index.php?title=设置企业号应用>
  
  Examples:
```js
 await api.setAgent(opts);
```

  
  Opts:
```js
 {
     "agentid": "5",
     "report_location_flag": "0",
     "logo_mediaid": "xxxxx",
     "name": "NAME",
     "description": "DESC",
     "redirect_domain": "xxxxxx",
     "isreportuser":0,
     "isreportenter":0
 }
```

  
  Result:
```js
 {
     "errcode":"0",
     "errmsg":"ok" ,
 }
```

## exports.listAgent

  获取应用概况列表
  详细请看：<http://qydev.weixin.qq.com/wiki/index.php?title=获取应用概况列表>
  
  Examples:
```js
 await api.listAgent();
```

  
  Result:
```js
 {
     "errcode": 0,
     "errmsg": "ok",
     "agentlist": [
         {
            "agentid": "5",
            "name": "企业小助手",
            "square_logo_url": "url",
            "round_logo_url": "url"
         },
         {
            "agentid": "8",
            "name": "HR小助手",
            "square_logo_url": "url",
            "round_logo_url": "url"
         }
     ]
 }
```

## exports.batchInviteUser

  批量邀请成员
  详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=
  
  Examples:
```js
 await api.batchInviteUser(to, taskCb);
```

  
  To:
```js
 {
     "touser":"xxx|xxx",
     "toparty":"xxx|xxx",
     "totag":"xxx|xxx",
     "invite_tips":"xxx",
 }
```

  
  TaskCb:
```js
 {
     "url": "xxx",
     "token": "xxx",
     "encodingaeskey": "xxx"
 }
```

  
  Result:
```js
 {
     "errcode": 0,
     "errmsg": "ok",
     "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 }
```

## exports.batchSyncUser

  批量更新成员
  详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=
  
  Examples:
```js
 await api.batchSyncUser(mediaId, taskCb);
```

  
  TaskCb:
```js
 {
     "url": "xxx",
     "token": "xxx",
     "encodingaeskey": "xxx"
 }
```

  
  Result:
```js
 {
     "errcode": 0,
     "errmsg": "ok",
     "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 }
```

## exports.batchReplaceUser

  全量覆盖成员
  详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=
  
  Examples:
```js
 await api.batchReplaceUser(mediaId, taskCb);
```

  
  TaskCb:
```js
 {
     "url": "xxx",
     "token": "xxx",
     "encodingaeskey": "xxx"
 }
```

  
  Result:
```js
 {
    "errcode": 0,
    "errmsg": "ok",
    "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 }
```

## exports.batchReplaceParty

  全量覆盖部门
  详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=
  
  Examples:
```js
 await api.batchReplaceParty(mediaId, taskCb);
```

  
  TaskCb:
```js
 {
     "url": "xxx",
     "token": "xxx",
     "encodingaeskey": "xxx"
 }
```

  
  Result:
```js
 {
     "errcode": 0,
     "errmsg": "ok",
     "jobid": "IoZW03y44Zcwuz-2K6T6rHTcf1uwyVbcYu2aRALKw-U"
 }
```

## exports.batchGetResult

  获取批量任务的结果
  详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=管理成员
  
  Examples:
```js
 await api.batchGetResult(jobid);
```

  
  返回结果参考微信的官方文档

## exports.createDepartment

  创建部门
  详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=管理部门
  
  Examples:
```js
 await api.createDepartment(name, opts);
```

  
  Opts:
  - `parentid`, 父部门id，根部门id为1
  - `order`，在父部门中的次序。从1开始，数字越大排序越靠后
  - `id`，部门ID。用指定部门ID新建部门，不指定此参数时，则自动生成
  
  Result:
```js
 {
     "errcode": 0,
     "errmsg": "created",
     "id": 2
 }
```

## exports.updateDepartment

  更新部门
  
  Examples:
```js
 var opts = {name: 'new name', parentid: 1, order: 5};
 await api.updateDepartment(id, opts);
```

  
  Opts:
  - `name`, 新的部门名字。可选
  - `parentid`, 父部门id，根部门id为1。可选
  - `order`，在父部门中的次序。从1开始，数字越大排序越靠后。可选，默认为1
  
  Result:
```js
 {
     "errcode": 0,
     "errmsg": "updated"
 }
```

## exports.deleteDepartment

  删除部门
  
  Examples:
```js
 await api.deleteDepartment(id);
 await api.deleteDepartment([id1, id2]);
```

  
  Result:    
```js
 {
     "errcode": 0,
     "errmsg": "deleted"
 }
```

## exports.getDepartments

  查看所有部门
  
  Examples:
```js
 await api.getDepartments(callback);
```

  
  
  Result:
```js
 {
     "errcode": 0,
     "errmsg": "ok",
     "department": [
           {
             "id": 1,
             "name": "广州研发中心",
             "parentid": 0
           },
           {
             "id": 2
             "name": "邮箱产品部",
             "parentid": 1
           }
     ]
 }
```

## exports.getIp

  创建标签
  
  详细请看：<http://qydev.weixin.qq.com/wiki/index.php?title=%E5%9B%9E%E8%B0%83%E6%A8%A1%E5%BC%8F#.E8.8E.B7.E5.8F.96.E5.BE.AE.E4.BF.A1.E6.9C.8D.E5.8A.A1.E5.99.A8.E7.9A.84ip.E6.AE.B5>
  Examples:
```js
 await api.getIp();
```

  
  Result:
```js
 {
   "ip_list":["127.0.0.1","127.0.0.1"]
 }
```

## exports.registerTicketHandle(getTicketToken:AsyncFunction, saveTicketToken:AsyncFunction)

  多台服务器负载均衡时，ticketToken需要外部存储共享。
  需要调用此registerTicketHandle来设置获取和保存的自定义方法。
  
  Examples:
```js
 await api.registerTicketHandle(async function () {
   // 传入一个获取全局 ticket 的方法
   var txt = await fs.readFile('ticket.txt', 'utf8');
   return JSON.parse(txt);
 }, async function (ticket) {
   // 请将 ticket 存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
   // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
   await fs.writeFile('ticket.txt', JSON.stringify(ticket));
 });
```

## exports.getTicket

  获取js sdk所需的有效js ticket
  
  Result:
  - `errcode`, 0为成功
  - `errmsg`, 成功为'ok'，错误则为详细错误信息
  - `ticket`, js sdk有效票据，如：bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA
  - `expires_in`, 有效期7200秒，开发者必须在自己的服务全局缓存jsapi_ticket

## exports.getJsConfig

  获取微信JS SDK Config的所需参数
  
  Examples:
```js
 var param = {
  debug: false,
  jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
  url: 'http://www.xxx.com'
 };
 await api.getJsConfig(param);
```

  
  - `result`, 调用正常时得到的js sdk config所需参数

## exports.getLatestTicket

  获取最新的js api ticket
  
  Examples:
```js
 await api.getLatestTicket();
```

  
  - `err`, 获取js api ticket出现异常时的异常对象
  - `ticket`, 获取的ticket

## exports.addMaterial

  上传永久素材，分别有图片（image）、语音（voice）、视频（video）和普通文件（file）
  详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E4%B8%8A%E4%BC%A0%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
  Examples:
```js
 await api.addMaterial('filepath', type);
```

  
  Result:
```js
 {
     "errcode":0,
     "errmsg":"ok",
     "media_id": "2-G6nrLmr5EFSDC3MMfasdfb_-zK1dDdzmd0p7"
 }
```

  
  Shortcut:
  
  - `exports.addImage(filepath);`
  - `exports.addVoice(filepath);`
  - `exports.addVideo(filepath);`
  - `exports.addFile(filepath);`

## exports.addMPNews

  上传永久图文素材
  详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E4%B8%8A%E4%BC%A0%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
  Examples:
```js
 await api.addMPNews(mpnews);
```

  
  Result:
```js
 {
     "errcode": "0",
     "errmsg": "ok",
     "media_id": "2-G6nrLmr5EC3MMfasdfb_-zK1dDdzmd0p7"
 }
```

## exports.updateMPNews

  更新永久图文素材
  详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E4%BF%AE%E6%94%B9%E6%B0%B8%E4%B9%85%E5%9B%BE%E6%96%87%E7%B4%A0%E6%9D%90>
  Examples:
```js
 await api.updateMPNews( media_id, mpnews);
```

  
  Result:
  {"errcode": "0","errmsg": "ok"}

## exports.getMaterial

  获取永久素材
  详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
  Examples:
```js
 await api.getMaterial('media_id');
```

## exports.delMaterial

  删除永久素材
  详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E5%88%A0%E9%99%A4%E6%B0%B8%E4%B9%85%E7%B4%A0%E6%9D%90>
  Examples:
```js
 await api.delMaterial('media_id');
```

  
  Result:
```js
 {"errcode": "0","errmsg": "deleted"}
```

## exports.countMaterial

  获取素材总数
  详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E7%B4%A0%E6%9D%90%E6%80%BB%E6%95%B0>
  Examples:
```js
 await api.countMaterial();
```

  
  Result:
```js
 {
     "errcode": "0",
     "errmsg": "ok", 
     "total_count": 37,
     "image_count": 12, 
     "voice_count": 10, 
     "video_count": 3,  
     "file_count": 3, 
     "mpnews_count": 6
 }
```

## exports.batchgetMaterial

  获取素材列表
  详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=%E8%8E%B7%E5%8F%96%E7%B4%A0%E6%9D%90%E5%88%97%E8%A1%A8>
  type 可为图片（image）、语音（voice）、视频（video）、普通文件（file）、图文消息（mpnews）
  
  Examples:
```js
 await api.batchgetMaterial(type, offset, count);
```

  
  
  Result:
```js
 {
     "errcode": "0",
     "errmsg": "ok", 
     "total_count": 37,
     "image_count": 12, 
     "voice_count": 10, 
     "video_count": 3,  
     "file_count": 3, 
     "mpnews_count": 6
 }
```

## exports.uploadMedia

  上传多媒体文件，分别有图片（image）、语音（voice）、视频（video）和普通文件（file）
  详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=上传媒体文件>
    
  Examples:
```js
 await api.uploadMedia('filepath', type);
```

  
  Result:
```js
 {"type":"image","media_id":"0000001","created_at":123456789}
```

  
  Shortcut:
  
  - `exports.uploadImage(filepath);`
  - `exports.uploadVoice(filepath);`
  - `exports.uploadVideo(filepath);`
  - `exports.uploadFile(filepath);`

## exports.getMedia

  根据媒体ID获取媒体内容
  详情请见：<http://qydev.weixin.qq.com/wiki/index.php?title=获取媒体文件>
    
  Examples:
```js
 await api.getMedia('media_id');
```

## exports.createMenu

  创建自定义菜单
  详细请看：<http://qydev.weixin.qq.com/wiki/index.php?title=创建应用菜单>
  
  Menu:
```js
 {
     "button":[
         {
             "type":"click",
             "name":"今日歌曲",
             "key":"V1001_TODAY_MUSIC"
         },  
         { 
             "name":"菜单",
             "sub_button":[
               {
                 "type":"view",
                 "name":"搜索",
                 "url":"http://www.soso.com/"
               },
               {
                 "type":"click",
                 "name":"赞一下我们",
                 "key":"V1001_GOOD"
               }]
             }]
         }
     ]
 }
```

  
  Examples:
```js
 var result = await api.createMenu(menu);
```

  
  Result:
```js
 {"errcode":0,"errmsg":"ok"}
```

## exports.getMenu

  获取菜单
  详细请看：<http://qydev.weixin.qq.com/wiki/index.php?title=获取菜单列表>
  
  Examples:
```js
 await api.getMenu();
```

  
  Result:
```js
 {
     "menu": {
       "button":[
         {"type":"click","name":"今日歌曲","key":"V1001_TODAY_MUSIC","sub_button":[]},
         {"type":"click","name":"歌手简介","key":"V1001_TODAY_SINGER","sub_button":[]},
         {"name":"菜单","sub_button":[
           {"type":"view","name":"搜索","url":"http://www.soso.com/","sub_button":[]},
           {"type":"view","name":"视频","url":"http://v.qq.com/","sub_button":[]},
              {"type":"click","name":"赞一下我们","key":"V1001_GOOD","sub_button":[]}]
         }
       ]
     }
 }
```

## exports.removeMenu

  删除自定义菜单
  详细请看：<http://mp.weixin.qq.com/wiki/index.php?title=自定义菜单删除接口>
    
  Examples:
```js
 var result = await api.removeMenu();
```

  
  Result:
```js
 {"errcode":0,"errmsg":"ok"}
```

## exports.send

  发送消息分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）
  详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=发送接口说明
  
  Examples:
```js
 await api.send(to, message);
```

  
  To:
```js
 {
     "touser": "UserID1|UserID2|UserID3",
     "toparty": " PartyID1 | PartyID2 ",
     "totag": " TagID1 | TagID2 "
 }
```

  
  Message:
```js
 文本消息：
 {
  "msgtype": "text",
  "text": {
    "content": "Holiday Request For Pony(http://xxxxx)"
  },
  "safe":"0"
 }
```

  
```js
 图片消息：
 {
  "msgtype": "image",
  "image": {
    "media_id": "MEDIA_ID"
  },
  "safe":"0"
 }
```

  
```js
 语音消息：
 
 {
  "msgtype": "voice",
  "voice": {
    "media_id": "MEDIA_ID"
  },
  "safe":"0"
 }
```

  
```js
 视频消息：
 {
  "msgtype": "video",
  "video": {
    "media_id": "MEDIA_ID"
    "title": "Title",
    "description": "Description"
  },
  "safe":"0"
 }
```

  
```js
 文件消息：
 {
  "msgtype": "file",
  "file": {
    "media_id": "MEDIA_ID"
  },
  "safe":"0"
 }
```

  
```js
 图文消息：
 {
  "msgtype": "news",
  "news": {
    "articles":[
      {
        "title": "Title",
        "description": "Description",
        "url": "URL",
        "picurl": "PIC_URL",
      },
      {
        "title": "Title",
        "description": "Description",
        "url": "URL",
        "picurl": "PIC_URL",
      }
    ]
  },
  "safe":"0"
 }
```

  
```js
 MP消息：
 {
  "msgtype": "mpnews",
  "mpnews": {
    "articles":[
      {
        "thumb_media_id": "id",
        "author": "Author",
        "content_source_url": "URL",
        "content": "Content"
        "digest": "Digest description",
        "show_cover_pic": "0"
      },
      {
        "thumb_media_id": "id",
        "author": "Author",
        "content_source_url": "URL",
        "content": "Content"
        "digest": "Digest description",
        "show_cover_pic": "0"
      }
    ],
    "media_id": "id"
  },
  "safe":"0"
 }
```

  
  
  Result:
```js
 {
  "errcode": 0,
  "errmsg": "ok",
  "invaliduser": "UserID1",
  "invalidparty":"PartyID1",
  "invalidtag":"TagID1"
 }
```

## exports.getShakeInfo

  获取设备及用户信息
  
  Examples:
```js
 await api.getShakeInfo("ticket");
```

  
  Result:
```js
 {
     "errcode": 0,
     "errmsg": "ok"
 }
```

## exports.createTag

  创建标签
  
  详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=管理标签
  Examples:
```js
 await api.createTag(name);
 await api.createTag(name, tagid);
 await api.createTag(name, { tagid: theId });
```

  
  Result:
```js
 {
     "errcode": 0,
     "errmsg": "created",
     "tagid": "1"
 }
```

## exports.updateTagName

  更新标签名字
  
  Examples:
```js
 await api.updateTagName(id, name);
```

  
  Result:
```js
 {
   "errcode": 0,
   "errmsg": "updated"
 }
```

## exports.deleteTag

  删除标签
  
  Examples:
```js
 await api.deleteTag(id);
```

  
  Result:
```js
 {
     "errcode": 0,
     "errmsg": "deleted"
 }
```

## exports.listTags

  获取标签列表
  
  Examples:
```js
 await api.listTags();
```

  
  Result:
```js
 {
     "errcode": 0,
     "errmsg": "deleted"
 }
```

## exports.getTagUsers

  获取标签成员
  
  Examples:
```js
 await api.getTagUsers(id);
```

  
  Result:
```js
 {
   "errcode": 0,
   "errmsg": "ok",
   "userlist": [
     {
         "userid": "zhangsan",
         "name": "李四"
     }
   ]
 }
```

## exports.addTagUsers

  增加标签成员
  
  Examples:
```js
 var userIdList = ['id1', 'id2'];
 await api.addTagUsers(id, userIdList);
```

  
  Result:
```js
 a)正确时返回
 {
   "errcode": 0,
   "errmsg": "deleted"
 }
 b)若部分userid非法，则返回
 {
   "errcode": 0,
   "errmsg": "invalid userlist failed"
   "invalidlist"："usr1|usr2|usr"
 }
 
 c)当包含的userid全部非法时返回
 
 {
   "errcode": 40031,
   "errmsg": "all list invalid"
 }
```

## exports.deleteTagUsers

  删除标签成员
  
  Examples:
```js
 var userIdList = ['id1', 'id2'];
 await api.deleteTagUsers(id, userIdList);
```

  
  Result:
```js
 a)正确时返回
 {
   "errcode": 0,
   "errmsg": "deleted"
 }
 b)若部分userid非法，则返回
 {
   "errcode": 0,
   "errmsg": "invalid userlist failed"
   "invalidlist"："usr1|usr2|usr"
 }
 c)当包含的userid全部非法时返回
 {
   "errcode": 40031,
   "errmsg": "all list invalid"
 }
```

## exports.createUser

  创建成员
  详细请看：http://qydev.weixin.qq.com/wiki/index.php?title=管理成员
  
  Examples:
```js
 await api.createUser(user);
```

  
  User:
```js
 {
   "userid": "zhangsan",
   "name": "张三",
   "department": [1, 2],
   "position": "产品经理",
   "mobile": "15913215421",
   "gender": 1,
   "tel": "62394",
   "email": "zhangsan@gzdev.com",
   "weixinid": "zhangsan4dev"
 }
```

  
  
  Result:
```js
 {
   "errcode": 0,
   "errmsg": "created"
 }
```

## exports.updateUser

  更新成员
  
  Examples:
```js
 await api.updateUser(user);
```

  
  User:
```js
 {
   "userid": "zhangsan",
   "name": "李四",
   "department": [1],
   "position": "后台工程师",
   "mobile": "15913215421",
   "gender": 1,
   "tel": "62394",
   "email": "zhangsan@gzdev.com",
   "weixinid": "lisifordev",
   "enable": 1
 }
```

  
  Result:
```js
 {
  "errcode": 0,
  "errmsg": "updated"
 }
```

## exports.deleteUser

  删除成员
  
  Examples:
```js
 await api.deleteUser(id);
```

  
  Result:
```js
 {
  "errcode": 0,
  "errmsg": "deleted"
 }
```

## exports.deleteUser

  批量删除成员
  
  Examples:
```js
 await api.deleteUsers(["zhangsan", "lisi"]);
```

  
  Result:
```js
 {
  "errcode": 0,
  "errmsg": "deleted"
 }
```

## exports.getUser

  获取成员
  
  Examples:
```js
 await api.getUser(id);
```

  
  Result:
```js
 {
   "errcode": 0,
   "errmsg": "ok",
   "userid": "zhangsan",
   "name": "李四",
   "department": [1, 2],
   "position": "后台工程师",
   "mobile": "15913215421",
   "gender": 1,
   "tel": "62394",
   "email": "zhangsan@gzdev.com",
   "weixinid": "lisifordev",
   "avatar": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA3WJ6DSZUfiakYe37PKnQhBIeOQBO4czqrnZDS79FH5Wm5m4X69TBicnHFlhiafvDwklOpZeXYQQ2icg/0",
   "status": 1
 }
```

## exports.getDepartmentUsers

  获取部门成员
  
  Examples:
```js
 await api.getDepartmentUsers(departmentId, fetchChild, status);
```

  
  Result:
```js
 {
   "errcode": 0,
   "errmsg": "ok",
   "userlist": [
     {
       "userid": "zhangsan",
       "name": "李四"
     }
   ]
 }
```

## exports.getDepartmentUsersDetail

  获取部门成员(详情)
  
  Examples:
```js
 await api.getDepartmentUsersDetail(departmentId, fetchChild, status);
```

  
  Result:
```js
 {
  "errcode": 0,
  "errmsg": "ok",
  "userlist": [
    {
      "userid": "zhangsan",
      "name": "李四",
      "department": [1, 2],
      "position": "后台工程师",
      "mobile": "15913215421",
      "email": "zhangsan@gzdev.com",
      "weixinid": "lisifordev",
      "avatar": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLA3WJ6DSZUfiakYe37PKnQhBIeOQBO4czqrnZDS79FH5Wm5m4X69TBicnHFlhiafvDwklOpZeXYQQ2icg/0",
      "status": 1,
      "extattr": {"attrs":[{"name":"爱好","value":"旅游"},{"name":"卡号","value":"1234567234"}]}
    }
  ]
 }
```

## exports.inviteUser

  邀请成员关注
  
  详情：http://qydev.weixin.qq.com/wiki/index.php?title=%E7%AE%A1%E7%90%86%E6%88%90%E5%91%98#.E9.82.80.E8.AF.B7.E6.88.90.E5.91.98.E5.85.B3.E6.B3.A8
  
  Examples:
```js
 await api.inviteUser(id, invite_tips);
```

  
  Callback:
  - `err`, 调用失败时得到的异常
  - `result`, 调用正常时得到的对象
  
  Result:
```js
 {
  "errcode": 0,
  "errmsg": "ok",
  "type":1
 }
```

## exports.getUserIdByCode

  根据Code获取用户ID
  
  详情：http://qydev.weixin.qq.com/wiki/index.php?title=根据code获取成员信息
  
  Examples:
```js
 await api.getUserIdByCode(code);
```

  
  Result:
```js
 {
   "UserId": "USERID"
 }
```

## exports.getAuthorizeURL(redirect:String, state:String, scope:String)

  获取授权页面的URL地址
