// pages/register/register.js
const app = getApp();
import api from '../../utils/publics/myRequests.js'
import tool from '../../utils/publics/tool.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexList: ['男', '女'],
    sex: [{
      sex: 'f',
      name: '男'
    }, {
      sex: 'm',
      name: '女'
    }],
    registerInfo: {
      sex: '',
      birth: '',
      name: '',
      birthVal: [],
      nameCheck : '',
      sexCheck : '',
      birthCheck : ''
    },
    showRegister : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.setData({
      register_border: app.globalData.imageUrl + '/images/register_border' + '.png',
      btn_register: app.globalData.imageUrl + '/images/btn_register' + '.png',
      register_title: app.globalData.imageUrl + '/images/register_title' + '.png',
      register_bg: app.globalData.imageUrl + '/images/register_bg' + '.png',
      warn_notice: app.globalData.imageUrl + '/images/warn_notice' + '.png'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 分享调用
  shareView() {
    if (wx.getStorageSync('mobile')) {
      console.log('params');
      let params = {
        app_id: wx.getAccountInfoSync().miniProgram.appId,
        mobile: wx.getStorageSync('mobile'),
        page_id: 1,
        unionid: wx.getStorageSync('unionid')
      }
      console.log(params)
      api.viewShare({
        app_id: wx.getAccountInfoSync().miniProgram.appId,
        mobile: wx.getStorageSync('mobile'),
        page_id: 2,
        unionid: wx.getStorageSync('unionid')
      }).then((res) => {
        console.log(res)
      }).catch((err) => {

      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    let _this = this;
    // if (ops.from === 'button') {
    //   // 来自页面内转发按钮
    //   _this.shareView();
    // }else {

    // }
    _this.shareView();
    return {
      title: '积分顽令营',
      path: 'pages/index/index',
      imageUrl: 'https://game.flyh5.cn/resources/game/wechat/dxl/anta/images/share_view.png',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  // 注册会员
  registerMember(){
    let _this = this;
    let pass = true;
    let nameCheck = 'registerInfo.nameCheck';
    let sexCheck = 'registerInfo.sexCheck';
    let birthCheck = 'registerInfo.birthCheck'
    let nameTitle = '',
        sexTitle = '',
        birthTitle = '';
    nameTitle = _this.data.registerInfo.name == "" ? "姓名不能为空" : '';
    sexTitle = _this.data.registerInfo.sex == "" ? "性别不能为空" : '';
    birthTitle = _this.data.registerInfo.birth == "" ? "生日不能为空" : '';
    _this.setData({
      [nameCheck]: nameTitle,
      [sexCheck]: sexTitle,
      [birthCheck]: birthTitle
    })
    pass = (_this.data.registerInfo.name != "" && _this.data.registerInfo.sex != "" && _this.data.registerInfo.bitrh != "") ? true : false;
    if(pass){
      console.log('注册params')
      let params = {
        mobile: wx.getStorageSync('mobile'),
        app_id: wx.getAccountInfoSync().miniProgram.appId,
        name: _this.data.registerInfo.name,
        birthday: _this.data.registerInfo.birth,
        sex: _this.data.registerInfo.sex == 0 ? 'f' : 'm'
      }
      console.log(params)
      tool.loading();
      api.registerMember({
        mobile: wx.getStorageSync('mobile'),
        app_id: wx.getAccountInfoSync().miniProgram.appId,
        name: _this.data.registerInfo.name,
        birthday: _this.data.registerInfo.birth,
        sex: _this.data.registerInfo.sex == 0 ? 'f' : 'm'
      }).then((res)=>{
        console.log(res)
        if(res.data.code == 1){
          
          let user = wx.getStorageSync('user_info');
          user.is_anta = res.data.data.is_anta;
          wx.setStorageSync('user_info', user);
          setTimeout((item)=>{
            tool.loading_h();
            setTimeout(()=>{
              tool.alert("注册成功!");
              wx.redirectTo({
                url: '/pages/index/index',
              })
            },500)   
          },1000)
        }else {
          setTimeout((item) => {
            tool.loading_h();
            setTimeout(() => {
              tool.alert(res.data.msg);
            }, 500)
          }, 1000)
        }
      })
    }
  },
  changeRegister(e) {
    let _this = this;
    let num = e.currentTarget.dataset.num;
    let show;
    show = num == 1 ? true : false;
    let info = {
      name: '',
      tel: '',
      area: '',
      nameCheck: '',
      telCheck: '',
      areaCheck: ''
    }
    _this.setData({ showRegister: show, info: info })
  },
  // 获取注册信息性别
  changeSex(e) {
    let sex = 'registerInfo.sex',
        sexCheck = 'registerInfo.sexCheck';
    console.log(e.detail.value)
    this.setData({
      [sex]: e.detail.value
    })
    if (e.detail.value != '') {
      this.setData({ [sexCheck]: '' })
    }
  },
  // 获取注册信息姓名
  getMemberName(e){
    let name = 'registerInfo.name',
        nameCheck = 'registerInfo.nameCheck';
    this.setData({ [name] : e.detail.value})
    if (e.detail.value != ''){
      this.setData({ [nameCheck]: '' })
    }
  },
  // 获取注册信息生日
  bindDateChange(e) {
    let birth = 'registerInfo.birth',
        birthCheck = 'registerInfo.birthCheck';
    this.setData({
      [birth]: e.detail.value
    })
    if (e.detail.value != '') {
      this.setData({ [birthCheck]: '' })
    }
  },
})