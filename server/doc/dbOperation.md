# **数据库操作**

## 注册

- methond:post
- url:"/signup/add"
- 输入：用户名、邮箱、密码
- 输出：success
- 相关函数：
  用户名匹配 data:用户名、type：0-->ture/false

  邮箱匹配 data:邮箱、type：1-->true/false

### 用户名/邮箱匹配

- method:post
- url:"/signup/judge",
- 输入： data:用户名/邮箱、type：0/1
- 输出：是否已被占用：true/false

## 登录

- method:post
- url:"/login"
- 输入：data:用户名/邮箱、password:密码
- 输出：id:用户 ID、profile:用户头像、name:用户名

## 好友列表

- 输入：用户 ID
- 输出：好友 ID、好友头像、好友备注名，好友 or 群
- 相关函数：最后消息 用户 ID、好友 ID-->内容、时间、属性

## 好友未读消息数

- 输入：用户 ID、好友 ID
- 输出：消息数

## 群列表

- 输入：用户 ID
- 输出：群 ID、群名、群头像、好友 or 群
- 相关函数：
  群最后消息 群 ID--> 发送者、内容、时间、属性

群修改消息数：群 ID、用户 ID --> success

## 群消息数

- 输入：群 ID、用户 ID
- 输出：消息数

## 好友请求

- 输入：用户 ID
- 输出：请求数
  相关函数：最后一条请求的时间：用户 ID-->时间

## 好友请求表

- 输入：用户 ID
- 输出：好友 ID、好友头像、名字

## 好友请求消息

- 输入：请求好友 ID
- 输出：内容、时间
- 相关函数：

同意：用户 ID、好友 ID-->success
拒绝：用户 ID、好友 ID-->success

## 搜索用户

- method:get
- url:"/search/user"
- 输入：keyword:搜索词
- 输出：username:用户名、id:用户 ID、email:用户邮箱、profile:用户头像
- 相关函数：

是否为好友：用户 ID-->true/false

### 是否为好友：

- method：get
- url:"/search/isfriend"
- 输入：当前用户 id：uid、好友 id：fid
- 输出：是否为好友：true/false

## 搜索群

- 输入：搜索词
- 输出：群 ID、群名、群头像
- 相关函数：

是否在群内：用户 ID、群 ID --> true/false

## 用户详情页面

- 输入：用户 ID、用户关系
- 输出：用户名、昵称、邮箱、简介。。。

## 好友请求页面

- 输入：用户 ID、被请求 ID，请求词
- 输出：success

## 修改资料

- 输入：用户 ID、修改内容、修改项
- 输出：sucess

## 修改密码

- 输入：用户 ID、原密码、新密码
- 输出：success

## 修改昵称

- 输入：用户 ID、好友 ID、昵称
- 输出：success

## 聊天页面

- 输入：用户 ID、好友 ID、页码
- 输出：内容、属性、时间、用户头像、用户 ID
- 相关函数：

好友发送消息：用户 ID、好友 ID、内容、属性、用户头像-->success
好友接收消息：用户 ID、好友 ID、内容、属性、用户头像

群发送消息：群 ID、页码-->内容、发送者 ID、时间、类型、头像-->success

群接收消息：群 ID、页码-->内容、发送者 ID、时间、类型、头像

## 建群页面

- 输入：用户 ID、群名、群头像、群成员 ID(数组)
- 输出：success

## 群详情页面

- 输入：群 ID
- 输出：群详情

## 群成员

- 输入：群 ID
- 输出：用户 ID、用户名、头像

## 修改群资料

- 输入：群 ID、修改项、修改内容
- 输出：success

## 添加群成员

- 输入：群 ID，成员 ID(数组)
- 输出：success

## 删除群成员

- 输入：群 ID、用户 ID
- 输出：success
- 相关函数：
  是否在群内：群 ID、用户 ID-->true/false

## 删除群

- 输入：群 ID
- 输出：success
