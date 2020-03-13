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
      title: "用户授权",
      test: "为了更好的体验，教练爱答题将自动获取您的用户权限。",
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
      this.data.token = wx.getStorageSync('token')
      // tool.loading_h()
      // this.showHideModal()
      // // gets.login().then((value) => {
      console.log(wx.getStorageSync('token'))
      // console.log(wx.getStorageSync('token'))
      if (wx.getStorageSync('token')) {
        tool.loading_h()
        this.showHideModal()
      } else {
        tool.loading_h()
        console.log("【服务器异常，请稍后再试】")
        // this.myLogin()
      }
      // }
    },
    //点击自定义Modal弹框上的确定按钮
    operation(e) {
      tool.loading("")
      if (e.detail.confirm) {
        this.showHideModal()

      } else {

      }
    },
    //打开、关闭自定义Modal弹框
    showHideModal() {
      let _showModal = this.data.showModal
      _showModal.isShow = !_showModal.isShow
      this.setData({ showModal: _showModal })
    },
  }
})

