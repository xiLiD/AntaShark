//index.js
//获取应用实例
const app = getApp()
import login from '../../utils/publics/login.js'
import api from '../../utils/publics/myRequests.js'
import auth from '../../utils/publics/authorization.js'
import tool from '../../utils/publics/tool.js'
import util from '../../utils/util.js'
let globalList = [];
for (var i = 0; i < 50; i++) {
  let url = ''
  if(i<10){
    url = app.globalData.imageUrl + '/images/get_prize/choujiang_0000' + i + '.png'
  }else {
    url = app.globalData.imageUrl + '/images/get_prize/choujiang_000' + i + '.png'
  }
  globalList.push(url)
}
Page({
  data: {
    IMGURL: app.globalData.imageUrl,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bgUrl: '',
    global: '',
    active: 0,
    showRule: false,
    hasGift: false,
    getPrize : false,
    showAddress: false,
    findPrize : false,  
    globalList: globalList,
    startPrize : false,
    show_shark : false,
    prizeInfo : {},
    isSharking : false,
    antaLoading: false,
    showNumber : '',
    sequenceList: { url: `${getApp().globalData.imageUrl}/images/shandian/dianliu_`, num: 26, speed: 100, loop: true },
    showAuth: false,
    showPhone: false,
    showMember: false,
    showAddress: false,
    my_score: 0
    
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  changeActive() {
    let _this = this;
    _this.setData({
      active: 1
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
  // 前往安踏注册
  changeRegister(e) {
    wx.navigateTo({
      url: '/pages/register/register'
    })
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
        setTimeout(() => {
          tool.alert("授权成功！")
        }, 500)
        wx.setStorageSync('user_info', res.data.data)
        wx.setStorageSync('mobile', res.data.data.mobile);
        _this.checkMember();
      });

    } else {
      setTimeout(() => {
        tool.loading_h();
        tool.alert("授权失败！");
        _this.setData({ showPhone: false })
      }, 500)
    }
  },
  onLoad: function () {
    let _this = this;
    _this.setData({
      bgUrl: app.globalData.imageUrl + '/images/bg_global' + '.png',
      global: app.globalData.imageUrl + '/images/global' + '.png',
      rule: app.globalData.imageUrl + '/images/global_rule' + '.png',
      seat: app.globalData.imageUrl + '/images/global_bottom' + '.png',
      shark: app.globalData.imageUrl + '/images/get_yao' + '.png',
      mygift: app.globalData.imageUrl + '/images/global_gift' + '.png',
      myscore: app.globalData.imageUrl + '/images/score_title' + '.png',
      snow: app.globalData.imageUrl + '/images/snow' + '.png',
      showGift: false,
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
      register: app.globalData.imageUrl + '/images/register_get' + '.png',
      main_title: app.globalData.imageUrl + '/images/main_title' + '.png',
      rule_bg: app.globalData.imageUrl + '/images/rule_bg' + '.png',
      gift_bg: app.globalData.imageUrl + '/images/gift_bg' + '.png',
      get_bg: app.globalData.imageUrl + '/images/get_bg' + '.png',
      draw: app.globalData.imageUrl + '/images/draw' + '.png',
      draw_get: app.globalData.imageUrl + '/images/get' + '.png',
      modal_close: app.globalData.imageUrl + '/images/anta_close' + '.png',
      modal_zh: app.globalData.imageUrl + '/images/anta_dialog' + '.png',
      start_bg: app.globalData.imageUrl + '/images/start_bg' + '.png',
      start_top: app.globalData.imageUrl + '/images/start_top' + '.png',
      start_find: app.globalData.imageUrl + '/images/start_find' + '.png',
      thanks: app.globalData.imageUrl + '/images/thanks' + '.png',
      good: app.globalData.imageUrl + '/images/timg' + '.png',
      address_bg: app.globalData.imageUrl + '/images/address_bg' + '.png',
      address_input: app.globalData.imageUrl + '/images/address_input' + '.png',
      address_area: app.globalData.imageUrl + '/images/address_area' + '.png',
      warn_notice: app.globalData.imageUrl + '/images/warn_notice' + '.png',
      btn_finish: app.globalData.imageUrl + '/images/btn_finish' + '.png',
      s_title: app.globalData.imageUrl + '/images/s_title' + '.png',
      loading : true
    });  
    login.login().then(res => {
      // //默认请求数据
      if(wx.getStorageSync('unionid')){
        _this.getPrize();
        _this.getScore();
      }
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(() => {
        _this.setData({
          show_shark: true
        });
        wx.hideLoading();
        // tool.loading_h()
        let time = 2000;
        let inter = setInterval(()=>{
          let num = _this.data.showNumber;
          num ++;
          time += 1000;
          if(num > 3) {
            clearInterval(inter);
          }
          console.log(_this.data.showNumber)
          _this.setData({showNumber : num});
          console.log(time)
        },time)
      }, 1000)
    })
    this.sequenceInit("sequenceList")//序列帧初始化
    this.sequenceStart("sequenceList").then(() => { console.log("序列帧播放完成") })//序列动画开始
    // util.shake_one_shake2(true, 100, 2000, false, res => {
    //   if (res.status == 1) {
    //     // tool.alert("摇一摇成功")
    //     // console.log(_this.data.showNumber,4)
    //     console.log("摇一摇返回-->", res)
    //     if (_this.data.showNumber == 4){
    //       // if(!wx.getStorageSync('user_info').is_anta){
    //       //   return;
    //       // }
    //       if (!_this.checkMember()) {
    //         return;
    //       }
    //       _this.sharkGift();
    //     }        
    //   }
    // })
  },
  timers: function (count) {
    var that = this;
    var j = 1;
    that.data.timer = setInterval(function () {
      count++;
      j = j % 49;
      j++;
      that.setData({
        showNum: j
      })
      if (that.data.showNum >= 49) {
        clearInterval(that.data.timer);
      }
    }, 70);
  },
  // 前往安踏
  toAnta() {
    wx.navigateToMiniProgram({
      appId: 'wx9872d5d7c8be7ce6',
      path: '/pages/usercenter/dashboard/index',
      envVersion: 'release',
      success(res) {
        // 打开成功
      },
      fail(res) {
      }
    })
  },
  // 我的奖品弹窗
  changeGift(e) {
    let _this = this;
    let num = e.currentTarget.dataset.num;
    let show;
    show = num == 1 ? true : false;
    if(!show){
      _this.setData({ showGift: false});
      return;
    }
    if(!_this.checkMember()){
      return;
    }
    if (_this.data.showNumber != 4){
      return;
    }
    if (e.currentTarget.dataset.istrue){
      _this.setData({
        findPrize: false
      });
    }
    _this.setData({
      showGift: show
    });
    let no_data = '';
    no_data = _this.data.prizeList.length == 0 ? false : true;
    _this.setData({
      hasGift: no_data
    })
  },
  // 规则弹窗
  changeRule(e){
    let _this = this;
    let num = e.currentTarget.dataset.num;
    let show;
    show = num == 1 ? true : false;
    _this.setData({ showRule: show })
  },
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
    _this.getPrize();
    _this.getScore();
    return true;

  },
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
  sharkGift(){
    let _this = this;
    if (_this.data.isSharking) {
      return;
    }
    _this.setData({ isSharking: true });
    api.eggDraw({ from: 1, mobile: wx.getStorageSync('mobile'), unionid: wx.getStorageSync('unionid') }).then((res) => {
      // console.log(res.data.data.list)
      if (res.data.code == 1) {
        _this.setData({
          startPrize: true
        })
        _this.setData({ showNum: 0 });
        let time = _this.timers(1);
        _this.audioCtx = wx.createAudioContext('myAudio');
        setTimeout(()=>{
          _this.audioCtx.play();
        },300)
        _this.audioCtx.pause();
        if (res.data.data.prize_type) {
          _this.setData({
            prizeInfo: res.data.data,
            getPrize: true,
            findPrize: true,
            startPrize: false
          })
          if (res.data.data.prize_type == 2 || res.data.data.prize_type == 3) {
            _this.getPrize();
          }
        } else {
          _this.setData({
            getPrize: false,
            findPrize: true,
            startPrize: false
          })
        }
        _this.getPrize();
        setTimeout(() => {
          _this.setData({ isSharking: false })
        }, 2000)
        setTimeout(() => {
          _this.audioCtx.pause();
          if (res.data.data.prize_type) {
            _this.setData({
              prizeInfo: res.data.data,
              getPrize: true,
              findPrize: true,
              startPrize: false
            })
            if (res.data.data.prize_type == 2 || res.data.data.prize_type == 3){
              _this.getPrize();
            }
          } else {
            _this.setData({
              getPrize: false,
              findPrize: true,
              startPrize: false
            })
          }
          _this.getPrize();
          setTimeout(() => {
            _this.setData({ isSharking: false })
          }, 2000)
        }, 3500);
      } else {
        tool.alert(res.data.msg)
        setTimeout(() => {
          _this.setData({ isSharking: false })
        }, 2000)
      }
    })
    _this.getScore();
  },
  // 开奖
  changeFind(e){
    let _this = this;
    let num = e.currentTarget.dataset.num;
    if(num == 0){
      _this.setData({ findPrize: false})
      return;
    }
    if (this.data.showNumber != 4){
      return;
    }
    let show;
    if(_this.data.isSharking){
      return;
    }
    if (!_this.checkMember()) {
      return;
    }
    show = num == 1 ? true : false;
    if(num == 1){
      _this.setData({isSharking : true})  
      _this.audioCtx = wx.createAudioContext('myAudio');
      _this.audioCtx.play();
      api.eggDraw({ from: 1, mobile: wx.getStorageSync('mobile'), unionid: wx.getStorageSync('unionid') }).then((res) => {
        // console.log(res.data.data.list)
        if(res.data.code == 1){
          _this.setData({
            startPrize: true
          })
          setTimeout(() => {
            _this.setData({ findPrize: show });
            _this.audioCtx.pause();
            if (res.data.data.prize_type) {
              _this.setData({
                prizeInfo: res.data.data,
                getPrize: true,
                findPrize: true,
                startPrize: false
              })
            } else {
              _this.setData({
                getPrize: false,
                findPrize: true,
                startPrize: false
              })
            }
            setTimeout(() => {
              _this.setData({ isSharking: false })
            }, 2000)
          }, 3500);
        }else {
          tool.alert(res.data.msg)
          setTimeout(()=>{
            _this.setData({ isSharking: false })   
          },2000)
        }
        _this.setData({ showNum: 0 });
        let time = _this.timers(1);
      })
      _this.getScore();
    }else {
      _this.setData({
        findPrize: false
      })
    }
  },
  // 获取奖品
  getPrize(){
    let _this = this;
    api.myPrize({ 
    from:1,
    mobile: wx.getStorageSync('mobile'), 
    page:1,
    limit :10,
    unionid: wx.getStorageSync('unionid')
    }).then((res)=>{
      console.log(res.data.data.list)
      let list = res.data.data.list ? res.data.data.list  : []
      _this.setData({ prizeList: list})
    })
  },
  // 中奖弹窗 弹出我的奖品
  startFind(){
    let _this = this;
    _this.getPrize();
    _this.setData({ findPrize: false, showGift: true, showGift : true });
    let no_data = _this.data.prizeList.length == 0 ? false : true;
    _this.setData({ hasGift: no_data })
  },
  // 留资姓名
  getName: function (e) {
    var that = this;
    let _info = that.data.info;
    _info.name = e.detail.value;
    that.setData({
      info: _info
    });
  },
  // 留资手机
  getTel(e) {
    var that = this;
    let _info = that.data.info;
    _info.tel = e.detail.value;
    that.setData({
      info: _info
    });
  },
  // 留资地址
  getArea: function (e) {
    console.log(e.detail.value);
    var that = this;
    let _info = that.data.info;
    // if (e.detail.value == '') {
    //   _info.areaCheck = ''
    // }
    _info.area = e.detail.value;
    that.setData({
      info: _info
    });
  },
  // 初始化留资弹窗信息
  changeAddress(e) {
    let _this = this;
    let num = e.currentTarget.dataset.num;
    let prize_log_id = e.currentTarget.dataset.id;
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
    _this.setData({ showAddress: show, info: info, prize_log_id: prize_log_id})
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
        page_id: 3,
        unionid: wx.getStorageSync('unionid')
      }).then((res) => {
        console.log(res)
      }).catch((err) => {

      })
    }
  },
  // 音频加载
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
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
  // 留资
  submitAddress() {
    let _this = this;
    let name = 'info.nameCheck',
      tel = 'info.telCheck',
      area = 'info.areaCheck'
    let pass = true;
    if (_this.data.info.name == '') {
      _this.setData({ [name]: '请输入姓名！' })
      pass = false;
    } else {
      _this.setData({ [name]: '' })
    }
    if (_this.data.info.tel == '') {
      _this.setData({ [tel]: '请输入电话！' });
      pass = false;
    } else {
      if (!(/^1[3456789]\d{9}$/.test(_this.data.info.tel))) {
        _this.setData({ [tel]: '手机号码格式错误！' });
        pass = false;
      } else {
        _this.setData({ [tel]: '' });
      }
    }

    if (_this.data.info.area == '') {
      _this.setData({ [area]: '请输入地址！' });
      pass = false;
    } else {
      _this.setData({ [area]: '' });
    }
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
        console.log(res)
        if (res.data.code == '1') {
          
          setTimeout(()=>{
            tool.loading_h();    
            setTimeout(() => {
              _this.getPrize();
              tool.alert("提交成功！");
              _this.setData({
                showAddress: false
              });
              
            }, 500)
          },2000)

        }else {
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

    console.log(_this.data.info)
  },
  //获取积分
  getScore(){
    let _this = this;
    api.myScore({ mobile: wx.getStorageSync('mobile'), unionid: wx.getStorageSync('unionid')}).then((res)=>{
      console.log(res)
      let my_score = res.data.data.score ? res.data.data.score : 0;
      _this.setData({ my_score: my_score})
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