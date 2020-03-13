const backMusic = (myApp, mp3Url) => {
  myApp.globalData.backgroundAudioManager = wx.getBackgroundAudioManager()
  let _backgroundAudioManager = myApp.globalData.backgroundAudioManager
  _backgroundAudioManager.title = '背景音乐1'
  _backgroundAudioManager.epname = '背景音乐2'
  _backgroundAudioManager.singer = '背景音乐3'
  _backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
  _backgroundAudioManager.src = mp3Url
  _backgroundAudioManager.onEnded(() => { backMusic(myApp, mp3Url) })
}
const audioState = myApp => {
  let _backgroundAudioManager = myApp.globalData.backgroundAudioManager
  if (!_backgroundAudioManager || _backgroundAudioManager.paused) {
    return true
  } else {
    return false
  }
}
module.exports = {
  backMusic,
  audioState
}