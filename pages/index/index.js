//index.js
//获取应用实例
const app = getApp()
import login from '../../utils/publics/login.js'
import api from '../../utils/publics/myRequests.js'
import auth from '../../utils/publics/authorization.js'
import tool from '../../utils/publics/tool.js'
import mta from '../../utils/mta_analysis.js'
Page({
  data: {
    IMGURL: app.globalData.imageUrl,
    motto: 'Hello World',
    showAuth: false,
    showPhone: false,
    showMember: false,
    showAddress: false,
    phoneModal: {
      isShow: false,
      type: 1,
      title: "手机号授权",
      test: "为了更好的体验，程序将自动获取您的手机号。",
      cancelText: "取消",
      confirmText: "授权",
      color_confirm: '#0BB20C'
    },
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bgUrl: '',
    global: '',
    active: 0,
    showRule: false,
    num: 1000,
    scoreList: [{ name: app.globalData.imageUrl + '/images/main/score_0' + '.png' }],
    gifts: ['恭喜：xxx用户获得安踏儿童', '恭喜：xxx用户获得安踏儿童', '恭喜：xxx用户获得安踏儿童', '恭喜：xxx用户获得安踏儿童'],
    hasGift: true,
    info: {
      name: '',
      tel: '',
      area: '',
      nameCheck: '',
      telCheck: '',
      areaCheck: ''
    },
    sexList: ['男', '女'],
    sex: [{
      sex: 0,
      name: '男'
    }, {
      sex: 1,
      name: '女'
    }],
    registerInfo: {
      sex: '',
      birth: '',
      name: '',
      birthVal: []
    },
    prizeList: [],
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    circular : true,
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    basketLoading  : false, //篮球跳转点击限制
    antaLoading : false, // 安踏小程序点击限制
    sequenceList: { url: `${getApp().globalData.imageUrl}/images/shandian/dianliu_`, num: 26, speed: 100, loop: true },
  },
  changeActive() {
    let _this = this;
    _this.setData({
      active: 1
    })
  },
  onshow() {

  },
  onLoad: function(options) {
    let _this = this;
    mta.Page.init()//腾讯统计
    login.login().then(res => {
      var _this = this;
      // //默认请求数据
      if (wx.getStorageSync('unionid')) {
        _this.getWheel();
        _this.getPrize();
        _this.getScore();
      }
    })
    this.sequenceInit("sequenceList")//序列帧初始化
    this.sequenceStart("sequenceList").then(() => { console.log("序列帧播放完成") })//序列动画开始
    // 加载图片数据
    _this.setData({
      isGetPhoneNumber: true,
      bgUrl: app.globalData.imageUrl + '/images/main/shark_bg' + '.png',
      area_1: app.globalData.imageUrl + '/images/main/area_1' + '.png',
      area_2: app.globalData.imageUrl + '/images/main/area_2' + '.png',
      area_3: app.globalData.imageUrl + '/images/main/area_3' + '.png',
      score: app.globalData.imageUrl + '/images/main/my_score' + '.png',
      logo: app.globalData.imageUrl + '/images/main/main_logo' + '.png',
      info_bg: app.globalData.imageUrl + '/images/main/info_bg' + '.png',
      line: app.globalData.imageUrl + '/images/main/line' + '.png',
      main_gift: app.globalData.imageUrl + '/images/main/main_gift' + '.png',
      modal_zh: app.globalData.imageUrl + '/images/anta_dialog' + '.png',
      modal_close: app.globalData.imageUrl + '/images/anta_close' + '.png',
      z: app.globalData.imageUrl + '/images/main/score_0' + '.png',
      register: app.globalData.imageUrl + '/images/register_get' + '.png',
      gift_bg: app.globalData.imageUrl + '/images/gift_bg' + '.png',
      get_bg: app.globalData.imageUrl + '/images/get_bg' + '.png',
      draw: app.globalData.imageUrl + '/images/draw' + '.png',
      draw_get: app.globalData.imageUrl + '/images/get' + '.png',
      modal_close: app.globalData.imageUrl + '/images/anta_close' + '.png',
      modal_zh: app.globalData.imageUrl + '/images/anta_dialog' + '.png',
      start_bg: app.globalData.imageUrl + '/images/start_bg' + '.png',
      start_top: app.globalData.imageUrl + '/images/start_top' + '.png',
      start_find: app.globalData.imageUrl + '/images/start_find' + '.png',
      good: app.globalData.imageUrl + '/images/timg' + '.png',
      address_bg: app.globalData.imageUrl + '/images/address_bg' + '.png',
      btn_bg: app.globalData.imageUrl + '/images/btn_bg' + '.png',
      address_input: app.globalData.imageUrl + '/images/address_input' + '.png',
      address_area: app.globalData.imageUrl + '/images/address_area' + '.png',
      warn_notice: app.globalData.imageUrl + '/images/warn_notice' + '.png',
      btn_finish: app.globalData.imageUrl + '/images/btn_finish' + '.png',
      member_bg: app.globalData.imageUrl + '/images/member_bg' + '.png',
      register_border: app.globalData.imageUrl + '/images/register_border' + '.png',
      btn_register: app.globalData.imageUrl + '/images/btn_register' + '.png',
      register_title: app.globalData.imageUrl + '/images/register_title' + '.png',
      register_bg: app.globalData.imageUrl + '/images/register_bg' + '.png',
      login_bg: app.globalData.imageUrl + '/images/login_bg' + '.png',
      no_login: app.globalData.imageUrl + '/images/no_login' + '.png',
      btn_login: app.globalData.imageUrl + '/images/btn_login' + '.png',
      btn_cancel: app.globalData.imageUrl + '/images/btn_cancel' + '.png',
      get_phone: app.globalData.imageUrl + '/images/get_phone' + '.png',
      main_title: app.globalData.imageUrl + '/images/main_title' + '.png',
      area_start1: app.globalData.imageUrl + '/images/1' + '.png',
      area_start2: app.globalData.imageUrl + '/images/2' + '.png',
      // login_bg: app.globalData.imageUrl + '/images/login_bg' + '.png',
      showWQ: false
    });
    let shandian = [];
    let s_img = '';
    for(var i =0;i<30;i++){
      if(i<10){
        s_img  = app.globalData.imageUrl + 'images/shandian/dianliu0000' + i + '.png'
      }else {
        s_img = app.globalData.imageUrl + 'images/shandian/dianliu000' + i + '.png'
      }
      shandian.push(s_img)
    }
    this.setData({ shandian: shandian})
    // let shandian = for
    // 检验授权,加载数据
    // this.checkMember();
    _this.getJump();
    _this.getWheel();
  },
  // 获取奖品
  getPrize() {
    let _this = this;
    api.myPrize({
      from: 1,
      mobile: wx.getStorageSync('mobile'),
      page: 1,
      limit: 10,
      unionid: wx.getStorageSync('unionid')
    }).then((res) => {
      let list = res.data.data.list ? res.data.data.list : []
      _this.setData({
        prizeList: list
      })
    })
  },
  // 前往彩蛋
  toShark() {
    // if (this.checkMember()) {
      
    // }
    wx.navigateTo({
      url: '/pages/shark/shark',
    })
  },
  //打开、关闭自定义Modal弹框
  showHideModal() {
    let _showModal = this.data.showModal
    _showModal.isShow = !_showModal.isShow
    this.setData({
      showModal: _showModal
    })
  },
  //点击自定义Modal弹框上的确定按钮
  operation(e) {
    tool.loading("")
    if (e.detail.confirm) {

      //授权
      this.triggerEvent("operation", options)
      // let options = { confirm: true }
      // if (e.currentTarget.dataset.type == 0) {
      //   options.confirm = false

      // } else if (this.data.showModalOption.type == 0) this.triggerEvent("operation", options)
    } else {
      // tool.loading("");
      // this.showHideModal()
      // setTimeout(() => {
      tool.loading_h()
      this.showHideModal()
      // }, 600)
    }
  },
  // 趣顽商城
  changeQw(e) {
    let _this = this;
    let num = e.currentTarget.dataset.num;
    let show;
    show = num == 1 ? true : false;
    _this.setData({
      showQw: show,
      showActive : 1
    })
  },
  // 手机号弹窗
  changePhone(e) {
    let _this = this;
    let num = e.currentTarget.dataset.num;
    let show;
    show = num == 1 ? true : false;
    _this.setData({
      showPhone: show
    })
  },
  // 授权用户信息弹窗
  changeAuth(e) {
    let _this = this;
    let num = e.currentTarget.dataset.num;
    let show;
    show = num == 1 ? true : false;
    _this.setData({
      showAuth: show
    })
  },
  // 安踏会员注册弹窗
  changeMember(e) {
    let _this = this;
    let num = e.currentTarget.dataset.num;
    let show;
    show = num == 1 ? true : false;
    _this.setData({
      showMember: show
    })
  },
  // 我的奖品弹窗
  changeGift(e) {
    let _this = this;
    let num = e.currentTarget.dataset.num;
    let show;
    show = num == 1 ? true : false;
    if(!show){
      _this.setData({
        showGift: false
      });
      return;
    }
    if(!_this.checkMember()){
      return;
    }

    if (show){
      _this.setData({
        showGift: show
      });
      let no_data = '';
      no_data = _this.data.prizeList.length == 0 ? false : true;
      _this.setData({
        hasGift: no_data
      })
    }else {
      _this.setData({
        showGift: false
      });
    }
  },
  // 留资弹窗
  changeAddress(e) {
    let _this = this;
    let num = e.currentTarget.dataset.num;
    let show;
    show = num == 1 ? true : false;
    let prize_log_id = e.currentTarget.dataset.id;
    let info = {
      name: '',
      tel: '',
      area: '',
      nameCheck: '',
      telCheck: '',
      areaCheck: ''
    }
    _this.setData({ showAddress: show, info: info, prize_log_id: prize_log_id })
  },
  // 获取留资姓名
  getName: function(e) {
    var that = this;
    let _info = that.data.info;
    _info.name = e.detail.value;
    that.setData({
      info: _info
    });
  },
  // 获取留资手机号
  getTel: function(e) {
    var that = this;
    let _info = that.data.info;
    _info.tel = e.detail.value;
    that.setData({
      info: _info
    });
  },
  // 前往安踏
  toAnta() {
    let _this = this;
    if (_this.data.antaLoading) {
      return;
    }
    _this.setData({ antaLoading: true });
    wx.navigateToMiniProgram({
      appId: 'wx9872d5d7c8be7ce6',
      path: '/pages/usercenter/dashboard/index',
      envVersion: 'release',
      success(res) {
        // 打开成功
        setTimeout(()=>{
          _this.setData({ antaLoading: false });
        },1000)
      },
      fail(res) {
        setTimeout(() => {
          _this.setData({ antaLoading: false });
        }, 1000)
      }
    })
  },
  getJump(){
    let _this = this;
    api.jumpSwitch({}).then((res)=>{
      // let code = (res.data.code == 1) ? 1 : 0;
      _this.setData({ code: res.data.code })
    })
  },
  // 前往篮球
  toBasket() {
    let _this = this;
    _this.setData({ showActive: 2 })
    if(_this.data.basketLoading){
      return;
    }
    _this.getJump();
    _this.setData({ basketLoading : true });
    if (_this.data.code == 0 || _this.data.code == 1){
      let version = _this.data.code == 1 ? 'release' : 'trial';
      console.log(version)
      wx.navigateToMiniProgram({
        appId: 'wx7e72bb148564a1b2',
        path: 'pages/index/index',
        envVersion: version,
        success(res) {
          // 打开成功
          setTimeout(() => {
            _this.setData({ basketLoading: false })
          }, 1000)

        },
        fail(res) {
          setTimeout(() => {
            _this.setData({ basketLoading: false })
          }, 1000)
        }
      })
    }else {
      _this.setData({ showQw : true});
      setTimeout(() => {
        _this.setData({ basketLoading: false })
      }, 1000)
    }

  },
  // 获取留资详细地址
  getArea: function(e) {
    var that = this;
    let _info = that.data.info;
    _info.area = e.detail.value;
    that.setData({
      info: _info
    });
  },
  // 留资提交
  submitAddress() {
    let _this = this;
    let name = 'info.nameCheck',
      tel = 'info.telCheck',
      area = 'info.areaCheck'
    let pass = true;
    if (_this.data.info.name == '') {
      _this.setData({
        [name]: '请输入姓名！'
      })
      pass = false;
    } else {
      _this.setData({
        [name]: ''
      })
    }
    if (_this.data.info.tel == '') {
      _this.setData({
        [tel]: '请输入电话！'
      });
      pass = false;
    } else {
      if (!(/^1[3456789]\d{9}$/.test(_this.data.info.tel))) {
        _this.setData({
          [tel]: '手机号码格式错误！'
        });
        pass = false;
      } else {
        _this.setData({
          [tel]: ''
        });
      }
    }

    if (_this.data.info.area == '') {
      _this.setData({
        [area]: '请输入地址！'
      });
      pass = false;
    } else {
      _this.setData({
        [area]: ''
      });
    }
    // let data = {
    //   mobile: wx.getStorageSync('mobile'),
    //   prize_log_id: _this.data.prize_log_id,
    //   name: _this.data.info.name,
    //   address: _this.data.info.area,
    //   phone: _this.data.info.tel,
    //   unionid: wx.getStorageSync('unionid')
    // }
    // console.log(data);
    // return;
    if (pass) {
      tool.loading();
      api.receivePrize({
        mobile: wx.getStorageSync('mobile'),
        prize_log_id: _this.data.prize_log_id,
        name: _this.data.info.name,
        address: _this.data.info.area,
        phone: _this.data.info.tel,
        unionid: wx.getStorageSync('unionid')
      }).then((res) => {
        if (res.data.code == '1') {
          setTimeout(() => {
            tool.loading_h();
            setTimeout(() => {
              _this.getPrize();
              tool.alert("提交成功！");
              _this.setData({
                showAddress: false
              });
              
            }, 500)
          }, 2000)

        } else {
          setTimeout(() => {
            tool.loading_h();
            setTimeout(() => {
              _this.getPrize();
              tool.alert(res.data.msg);
              _this.setData({
                showAddress: false
              });
            }, 500)
          }, 2000)
        }
      })
    }
  },
  // 获取中奖播报
  getWheel() {
    let _this = this;
    api.winWheel({
      from: 1,
      mobile: wx.getStorageSync('mobile'),
      unionid: wx.getStorageSync('unionid')
    }).then((res) => {
      if (res.data.code == 1) {
        let oldList;
        let list = res.data.data.list ? res.data.data.list : [];
        _this.setData({
          winList: list,
        })
      }
    })
  },
  // 前往安踏注册
  changeRegister(e) {

    wx.navigateTo({
      url: '/pages/register/register'
    })
  },
  // 获取注册安踏会员姓名
  // getMemberName(e) {
  //   var that = this;
  //   let name = 'registerInfo.name';
  //   that.setData({
  //     [name]: e.detail.value
  //   });
  // },
  // changeSex(e) {
  //   let sex = 'registerInfo.sex'
  //   this.setData({
  //     [sex]: e.detail.value
  //   })
  // },
  // bindDateChange(e) {
  //   let _this = this;
  //   let birth = 'registerInfo.birth'
  //   _this.setData({
  //     [birth]: e.detail.value
  //   })
  // },
  /**检验授权流程  1:用户授权 2：手机授权 3：安踏会员注册 */
  checkMember() {
    let _this = this;
    if (!wx.getStorageSync('userInfo')) {
      _this.setData({
        showAuth: true
      });
      return false;
    }
    if (!wx.getStorageSync('phoneInfo')) {
      if (!_this.data.showAuth) {
        _this.setData({
          showPhone: true
        })
      }
      return false;
    }
    if (!wx.getStorageSync('user_info')) {
      this.setData({
        showMember: true
      })
      return false;
    } 
    if (wx.getStorageSync('user_info').is_anta == 0) {
      this.setData({
        showMember: true
      })
      return false;
    } 
    _this.getWheel();
    _this.getPrize();
    _this.getScore();
    return true;

  },
  // 分享调用
  shareView(){
    if (wx.getStorageSync('mobile')){
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
        page_id: 1,
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
  onShareAppMessage: function(ops) {
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
      success: function(res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  //授权用户
  getUserInfo(e) {
    let _this = this;
    console.log('encryptedData--')
    console.log(e.detail)
    login.authorize(e).then(res => {
      if (res) {
        tool.alert("授权成功")
        setTimeout(() => {
          _this.setData({
            showAuth: false
          })
          let params = {
            app_id: wx.getAccountInfoSync().miniProgram.appId,
            session_key: encodeURIComponent(wx.getStorageSync('session_key')),
            iv: encodeURIComponent(e.detail.iv),
            e_data: encodeURIComponent(e.detail.encryptedData)
          }
          console.log('用户params--')
          console.log(params)
          api.getUserInfo({
            app_id: wx.getAccountInfoSync().miniProgram.appId,
            session_key: encodeURIComponent(wx.getStorageSync('session_key')),
            iv: encodeURIComponent(e.detail.iv),
            e_data: encodeURIComponent(e.detail.encryptedData)
          }).then((res) => {
            let unionid = res.data.data.unionid ? res.data.data.unionid : '';
            console.log('授权调用接口--')
            console.log(res.data.data)
            wx.setStorageSync('unionid', unionid);
            _this.setData({
              showPhone: true
            })
          });
        }, 500)
      } else {
        tool.alert("授权失败")
      }
    }).catch(err => {

    })

  },
  // 授权手机号码
  getPhoneNumber(e) {
    let _this = this;
    tool.loading();
    if (e.detail.iv) {
      wx.setStorageSync('phoneInfo', e.detail);
      _this.setData({
        showPhone: false
      })
      let params = {
        app_id: wx.getAccountInfoSync().miniProgram.appId,
        session_key: encodeURIComponent(wx.getStorageSync('session_key')),
        iv: encodeURIComponent(e.detail.iv),
        e_data: encodeURIComponent(e.detail.encryptedData),
        unionid: wx.getStorageSync('unionid')
      }
      console.log('手机params--')
      console.log(params)
      api.getPhoneNumber({
        app_id: wx.getAccountInfoSync().miniProgram.appId,
        session_key: encodeURIComponent(wx.getStorageSync('session_key')),
        iv: encodeURIComponent(e.detail.iv),
        e_data: encodeURIComponent(e.detail.encryptedData),
        unionid: wx.getStorageSync('unionid')
      }).then((res) => {
        console.log('授权手机调用接口--')
        console.log(res.data.data)
        tool.loading_h();
        setTimeout(()=>{
          tool.alert("授权成功！") 
        },500)
        wx.setStorageSync('user_info',res.data.data)
        wx.setStorageSync('mobile', res.data.data.mobile);
        _this.checkMember();
      });

    }else {
      setTimeout(() => {
        tool.loading_h();
        tool.alert("授权失败！");
        _this.setData({ showPhone : false})
      }, 500)
    }
  },
  //获取积分
  getScore() {
    let _this = this;
    api.myScore({
      mobile: wx.getStorageSync('mobile'),
      unionid: wx.getStorageSync('unionid')
    }).then((res) => {
      console.log(res.data.data.score)
      let number = res.data.data.score ? res.data.data.score : 0;
      number = number.toString();
      let scoreList = [];
      if (number == 0) {
        let a = new Object({
          name: app.globalData.imageUrl + '/images/main/score_0.png'
        })
        scoreList.push(a)
      } else {
        console.log(number.length)
        for (var i = 0; i < number.length; i++) {
          let a = new Object({
            name: app.globalData.imageUrl + '/images/main/score_' + number[i] + '.png'
          })
          scoreList.push(a)
        }
      }
      _this.setData({
        scoreList: scoreList,
        my_score: number
      })
    })
  },
  //序列帧初始化
  sequenceInit(sequence) {
    let _sequence = []
    let _url = this.data[sequence].url
    let _num = this.data[sequence].num
    for (let i = 0; i < _num; i++) {
      if (i < 10) {
        _sequence.push({ url: `${_url}0000${i}.png`, speed: this.data[sequence].speed, loop: this.data[sequence].loop })
      } else {
        _sequence.push({ url: `${_url}000${i}.png`, speed: this.data[sequence].speed, loop: this.data[sequence].loop })
      }
      // _sequence.push({ url: `${_url}${i + 1}.png`, speed: this.data[sequence].speed, loop: this.data[sequence].loop })
    }
    this.setData({ [sequence]: _sequence })
  },
  //序列动画开始
  sequenceStart(sequence) {
    let _num = 1
    return new Promise(resolve => {
      let autoSequence = setInterval(() => {
        let _curSequenceIndex = this.data[`${sequence}Index`] || 0
        _curSequenceIndex++
        if (_curSequenceIndex <= 25) {
          this.setData({ [`${sequence}Index`]: _curSequenceIndex })
        } else {
          if ((typeof (this.data[sequence][0].loop) == 'boolean' && this.data[sequence][0].loop) || (typeof (this.data[sequence][0].loop) == 'number' && _num < this.data[sequence][0].loop)) {
            _num++
            this.setData({ [`${sequence}Index`]: 0 })
          } else {
            this.setData({ [`${sequence}Index`]: -1 })
            clearInterval(autoSequence)
            resolve()
          }
        }
      }, this.data[sequence][0].speed)
    })
  }
})