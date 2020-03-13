import $ from './request.js'
const SERVICE = "https://game.flyh5.cn/game/wx7c3ed56f7f792d84/yyt_anta/public/index.php"
//   SERVICE = "https://dev.flyh5.cn/collect-word/wx"

const myRequest = (data, url, type = 'post') => {
  let _url = `${SERVICE}${url}`

  return new Promise((resolve, reject) => {
    $[`${type}P`](_url, data).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

const startTopic = (data, url = '/recording/startTopic') => { return myRequest(data, url) }

const clickPrize = (data, url = '/prize/clickPrize') => { return myRequest(data, url) }

const viewResults = (data, url = '/recording/viewResults') => { return myRequest(data, url) }

const viewSave = (data, url = '/batch/viewSave') => { return myRequest(data, url) }

const viewShare = (data, url = '/batch/viewShare') => { return myRequest(data, url) }

const nextTopic = (data, url = '/recording/nextTopic') => { return myRequest(data, url) }

const saveAddress = (data, url = '/address/saveAddress') => { return myRequest(data, url) }

const selectStatus = (data, url = '/lottery/selectStatus') => { return myRequest(data, url) }

const numSubscribers = (data, url = '/channel/numSubscribers') => { return myRequest(data, url) }

const numClick = (data, url = '/channel/numClick') => { return myRequest(data, url) }

const isTrue = (data, url = '/setting/isTrue') => { return myRequest(data, url) }

//生成太阳码
const channelImg = (data, url = '/channel/channelImg') => { return myRequest(data, url) }


module.exports = {
  myRequest,
  startTopic,
  clickPrize,
  viewResults,
  viewSave,
  viewShare,
  nextTopic,
  saveAddress,
  selectStatus,
  numSubscribers,
  numClick,
  isTrue,
  channelImg
}