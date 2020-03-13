// components/getPhoneNumber/getPhoneNumber.js
const gets = require('../../utils/publics/authorization.js')
const api = require('../../utils/api/myRequests.js')
const tool = require('../../utils/publics/tool')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal: {
      isShow: false,
      type: 1,
      title: "手机号授权",
      test: "为了更好的体验，智趣启辰将自动获取您的手机号。",
      cancelText: "取消",
      confirmText: "授权",
      color_confirm: '#0BB20C'
    },
    parent_id: '',
    channel_id: '',
    requestNum: 0
  },
  ready() {
    if (!wx.getStorageSync('userInfo').phone) {
      this.myLogin()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //登录
    myLogin() {
      // gets.isCheckSession(res => {
      //   console.log("是否过期", res)
      // })
      tool.loading("")
      gets.login().then((value) => {
        return api.getOpenid({
          code: value.code,
          parent_id: this.data.parent_id,
          channel_id: this.data.channel_id
        })
      }).then((value) => {
        const data = value.data.data;
        if (value.data.code == 1) {
          this.data.session_key = data.data.session_key
          console.log("【拿到session_key】", this.data.session_key)
          tool.loading_h()
          this.showHideModal()
        } else {
          tool.loading_h()
          console.log("【服务器异常，请稍后再试】")
          this.myLogin()
        }
      })
    },
    //点击自定义Modal弹框上的确定按钮
    operation(e) {
      tool.loading("")
      if (e.detail.confirm) {
        this.showHideModal()
        this.data.encryptedData = e.detail.encryptedData
        console.log("【拿到encryptedData】", e.detail.encryptedData)
        this.data.iv = e.detail.iv
        this.decryptPhone()
      } else {
        tool.loading("")
        this.showHideModal()
        setTimeout(() => {
          tool.loading_h()
          this.showHideModal()
        }, 600)
      }
    },
    //解密手机号
    decryptPhone() {
      console.log("session_key", this.data.session_key)
      console.log("encrypted_data", this.data.encryptedData)
      console.log("iv", this.data.iv)
      let _data = {
        user_id: wx.getStorageSync("_login").user_id,
        session_key: this.data.session_key,
        encrypted_data: this.data.encryptedData,
        iv: this.data.iv
      }
      api.getPhoneNumber(_data).then(res => {
        console.log("getPhoneNumber", res)
        if (res.data.code == 1) {
          let _userInfo = wx.getStorageSync("userInfo")
          _userInfo.phone = res.data.data.mobile
          wx.setStorageSync("userInfo", _userInfo)
          tool.loading_h()
          this.triggerEvent("getPhoneNumber", { phone: wx.getStorageSync("userInfo").phone })
        } else {
          if (this.data.requestNum >= 5) return
          this.data.requestNum++
          //this.myLogin()
          tool.loading_h()
          console.log("【手机号解密失败】")
        }
      })
    },
    //打开、关闭自定义Modal弹框
    showHideModal() {
      let _showModal = this.data.showModal
      _showModal.isShow = !_showModal.isShow
      this.setData({ showModal: _showModal })
    },
  }
})

