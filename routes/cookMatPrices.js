const express = require('express')
const driedFishJson = require('../Ingredients/DriedFish.json')
const genericCookingJson = require('../Ingredients/GenericCooking.json')
const helpers = require('../utils/helpers')
const async = require('async')

const router = express.Router()

router.get('/', (req, res, next) => {
  const driedFishIds = driedFishJson.map((fish) => fish.id)
  const genericCookingIds = genericCookingJson.map((item) => item.id)

  const parallelApiCalls = helpers.parallelSetup([
    ...driedFishIds,
    ...genericCookingIds,
  ])

  async.parallel(parallelApiCalls, (err, results) => {
    if (err) {
      console.log(err)
    }

    let data = helpers.formatData(results)

    res.send(data)
  })
})

module.exports = router
