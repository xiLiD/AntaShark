var app = getApp()
const audioState = date => {
  var _backgroundAudioManager = app.globalData.backgroundAudioManager
  if (_backgroundAudioManager.paused) {
    return true
  } else {
    return false
  }
}

module.exports = {
  audioState: audioState
}
