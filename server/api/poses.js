const router = require('express').Router()
const { models: { Pose }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const poses = await Pose.findAll({
    })
    res.json(poses)
  } catch (err) {
    next(err)
  }
})

module.exports = router
