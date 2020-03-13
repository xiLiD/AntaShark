//alert提示
const alert = (str, icon = "none", duration = 1500, callback) => {
  wx.showToast({
    title: str,
    icon: icon,
    duration: duration,
    success: () => {
      if (!callback) return
      setTimeout(() => { callback() }, duration)
    }
  })
}
//loading提示框
const loading = (str = '加载中', mask = false) => {
  wx.showLoading({
    title: str,
    mask: mask
  })
}
//关闭loading提示框
const loading_h = () => {
  wx.hideLoading()
}
//确认/取消弹框
const confirm = (title = "确认", content = "您确认进行此操作？", confirms = "确认,#333", cancels = "取消,#333") => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: title,
      content: content,
      showCancel: cancels ? true : false,
      cancelText: cancels ? cancels.split(",")[0] : '取消',
      cancelColor: cancels ? cancels.split(",")[1] : '#333',
      confirmText: confirms.split(",")[0],
      confirmColor: confirms.split(",")[1],
      success: (res) => {
        if (res.confirm) {
          resolve(true)
        } else {
          resolve(false)
        }
      }
    })
  })
}
//获取dom节点
const getDom = ele => {
  const query = wx.createSelectorQuery()
  query.select(ele).boundingClientRect()
  query.selectViewport().scrollOffset()
  query.exec(function (res) {
    return res
    res[0].top       // #the-id节点的上边界坐标
    res[1].scrollTop // 显示区域的竖直滚动位置
  })
}
//获取图片信息
const getImageInfo = (imgUrl, callback) => {
  wx.getImageInfo({
    src: imgUrl,
    success(res) {
      if (callback) { callback(res) }
    }
  })
}
//播放视频
const videoPlay = (ele, isFullScreen = true) => {
  let videoContext = wx.createVideoContext(ele)
  console.log(videoContext)
  videoContext.play()
  // if (isFullScreen) {
  //   videoContext.requestFullScreen({ direction: 0 })
  // }
}
//获取手机系统信息
const getSystem = () => {
  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success(res) {
        resolve(res)
      }
    })
  })
  
}
//可返回跳转
const jump_nav = (url) => {
  wx.navigateTo({
    url: url
  })
}
//不可返回跳转
const jump_red = (url) => {
  console.log(url)
  wx.redirectTo({
    url: url
  })
}
//预览图片
const previewImage = (urls, current) => {
  wx.previewImage({
    urls: urls,
    current: current
  })
}
//canvas绘图
const canvasImg = (options, callback) => {
  const ctx = wx.createCanvasContext(options.canvasId)
  ctx.setFillStyle(options.background || '#fff')
  ctx.fillRect(0, 0, 750, 100000)
  if (options.imgList.length > 0) {
    for (let i = 0; i < options.imgList.length; i++) {
      let _curimg = options.imgList[i]
      ctx.drawImage(_curimg.url, _curimg.imgX, _curimg.imgY, _curimg.imgW, _curimg.imgH)
    }
    //ctx.draw()
  }
  if (options.textList.length > 0) {
    for (let i = 0; i < options.textList.length; i++) {
      let _curText = options.textList[i]
      ctx.setFontSize(_curText.fontSize)
      ctx.setFillStyle(_curText.color)
      if (_curText.align == 'center') {
        ctx.setTextAlign('center')
      } else {
        ctx.setTextAlign('left')
      }
      ctx.setTextBaseline('top')
      ctx.fillText(_curText.string, _curText.textX, _curText.textY)
      if (_curText.bold) {
        ctx.fillText(_curText.string, _curText.textX, _curText.textY - 0.5)
        ctx.fillText(_curText.string, _curText.textX - 0.5, _curText.textY)
      }
      ctx.fillText(_curText.string, _curText.textX, _curText.textY)
      if (_curText.bold) {
        ctx.fillText(_curText.string, _curText.textX, _curText.textY + 0.5)
        ctx.fillText(_curText.string, _curText.textX + 0.5, _curText.textY)
      }
    }
    //ctx.draw(true)
  }
  if (options.lineList.length > 0) {
    for (let i = 0; i < options.lineList.length; i++) {
      ctx.moveTo(options.lineList[i].xy1.split(",")[0], options.lineList[i].xy1.split(",")[1])
      ctx.lineTo(options.lineList[i].xy2.split(",")[0], options.lineList[i].xy2.split(",")[1])
      ctx.strokeStyle = options.lineList[i].color
      ctx.stroke()
    }
  }
  ctx.draw(true, () => {
    if (callback) {
      console.log(options.canvasId)
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        // width: 50,
        // height: 50,
        // destWidth: 100,
        // destHeight: 100,
        canvasId: options.canvasId,
        success(res) {
          callback(res.tempFilePath)
        }
      })
    }
  })
}
module.exports = {
  alert: alert,
  confirm: confirm,
  loading: loading,
  loading_h: loading_h,
  getDom: getDom,
  getImageInfo: getImageInfo,
  videoPlay: videoPlay,
  getSystem: getSystem,
  jump_nav: jump_nav,
  jump_red: jump_red,
  previewImage: previewImage,
  canvasImg: canvasImg
}