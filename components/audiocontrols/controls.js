// pages/audiocontrols/controls.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isPause: {
      type: Boolean,
      value: false
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    isPause: false
  },
  attached() {
    this.controls(1)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    controls(isSwitch){
      let _backgroundAudioManager = wx.getBackgroundAudioManager()
      if (_backgroundAudioManager.paused) {
        if (isSwitch === 1) {
          this.properties.isPause = true
          this.setData({ isPause: true })
        } else {
          _backgroundAudioManager.play()
          this.setData({ isPause: false })
          this.properties.isPause = false
        }
      } else {
        if (isSwitch === 1) { 
          this.setData({ isPause: false })
          this.properties.isPause = false
        } else {
          _backgroundAudioManager.pause()
          this.setData({ isPause: true })
          this.properties.isPause = true
        }
      }
    }
  }
})
