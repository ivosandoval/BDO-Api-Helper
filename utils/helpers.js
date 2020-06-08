const apiConfig = require('./apiConifg')

const parallelSetup = (idArr) => {
  const parallelCalls = idArr.map((id) => {
    return (callback) =>
      apiConfig.bdoApiCall('ItemInfo', { mainKey: id }, callback)
  })

  return parallelCalls
}

const formatData = (data) => {
  let dataHolder = []

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].detailList.length; j++) {
      const dataObj = data[i].detailList[j]

      const formatedData = {
        name: dataObj.name,
        price: dataObj.pricePerOne,
        count: dataObj.count,
      }

      dataHolder.push(formatedData)
    }
  }

  return dataHolder
}

module.exports = {
  parallelSetup,
  formatData,
}
