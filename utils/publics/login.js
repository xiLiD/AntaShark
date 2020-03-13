import auth from '../publics/authorization.js'
import api from './myRequests.js'
import tool from '../publics/tool.js'

//登录
const login = () => {
  return new Promise((resolve, reject) => {
    let _userInfo = wx.getStorageSync("userInfo") || {};
    let _phoneInfo = wx.getStorageSync("phoneInfo");
    // let token = wx.getStorageSync('token')
    if (_userInfo.token) {
      resolve(_userInfo)
      return
    }
    let openCode = '';
    tool.loading("")
    auth.login().then(res => {
      return res
    }).then(res => {
      if (wx.setStorageSync('code')){
        wx.setStorageSync('code',res.code)
      }
      
      return api.getOpenid({ code: res.code, app_id: wx.getAccountInfoSync().miniProgram.appId })
    }).then(res => {
      if (res.data.code == '1') {
        Object.assign(_userInfo, res.data.data.data)
        wx.setStorageSync('openId', res.data.data.oauth_info.openid)
        wx.setStorageSync("session_key", res.data.data.oauth_info.session_key)
        wx.setStorageSync("user_info", res.data.data.user_info); 
        // if (wx.getStorageSync("user_info"){

        // }
        tool.loading_h()
        resolve(wx.getStorageSync("userInfo"))
      } else {
        reject(res)
      }
    })
  })
}

//授权
const authorize = (e) => {
  return new Promise((resolve, reject) => {
    tool.loading("授权中")
    const userInfo = e.detail.userInfo
    if (userInfo) {
      Object.assign(userInfo, wx.getStorageSync("userInfo") || {})
      wx.setStorageSync("userInfo", userInfo)
      tool.loading_h()
      console.log(wx.getStorageSync('userInfo'))
      //这里做上传头像昵称给后台操作
      // api.uploadUserInfo({
      //   openid: wx.getStorageSync("userInfo").openid,
      //   nickname: userInfo.nickName,
      //   headimg: userInfo.avatarUrl
      // }).then(res => {
      //   tool.loading_h()
        resolve(true)
      // }).catch(err => {
      //   reject(err)
      // })
    } else {
      tool.loading_h()
      resolve(false)
    }
  })
}

module.exports = { login, authorize }