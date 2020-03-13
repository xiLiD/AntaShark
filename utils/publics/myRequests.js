import $ from './request.js'
const SERVICE = "https://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_anta/public/index.php"
// const SERVICE = "https://dev.flyh5.cn/co-working/Api/wx"
const myRequest = (data, url, type = 'post') => {
  let _url = `${SERVICE}${url}`
  
  return new Promise((resolve, reject) => {
    $[`${type}P`](_url, data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

//获取openid
const getOpenid = (data, url = '/api/oauth/get_session_key') => { return myRequest(data, url) }
//手机号解密
const getPhoneNumber = (data, url = '/api/oauth/de_phone') => { return myRequest(data, url) }
//获取授权信息
const getUserInfo = (data, url = '/api/oauth/de_unionid') => { return myRequest(data, url) }
//注册会员
const registerMember = (data, url = '/api/oauth/reg_anta') => { return myRequest(data, url) }
//分享
const pageShare = (data, url = '/api/share/share') => { return myRequest(data, url) }
//查看积分
const myScore = (data, url = '/api/user/my_score') => { return myRequest(data, url) }
//我的奖品列表
const myPrize = (data, url = '/api/prize/my_prize') => { return myRequest(data, url) }
//领取奖品
const receivePrize = (data, url = '/api/prize/receive_prize') => { return myRequest(data, url) }
//中奖播报
const winWheel = (data, url = '/api/prize/win_wheel') => { return myRequest(data, url) }
//扭蛋
const eggDraw = (data, url = '/api/egg/draw') => { return myRequest(data, url) }
//分享
const viewShare = (data, url = '/api/share/share') => { return myRequest(data, url) }
// 篮球跳转
const jumpSwitch = (data, url = '/api/egg/jump_switch') => { return myRequest(data, url) }
module.exports = {
  myRequest,
  getOpenid,
  getPhoneNumber,
  getUserInfo,
  registerMember,
  pageShare,
  myScore,
  myPrize,
  receivePrize,
  eggDraw,
  winWheel,
  viewShare,
  jumpSwitch
}