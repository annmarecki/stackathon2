'use strict'
const {db } = require('../server/db')
const { models: {User, Pose},} = require("../server/db")

const poses = [
  {
   name: "Downward Dog",
   description: "Start off on all fours and make sure your knees are slightly behind your hips. Your hands should be shoulder-width apart and spread your fingers out wide. Press your hands into the mat and gently tuck your toes under and take a deep inhale, then keeping your hands pressed into the mat exhale deeply, lifting your knees off the floor and straightening your legs as much as you can to make a V with your body",
   image: "https://www.yogajournal.com/wp-content/uploads/2021/02/CCD00187-scaled.jpg?crop=535:301&width=1070&enable=upscale",
 },
 {
   name: "Warrior One",
   description: "Begin standing with legs together, step your right foot forward about four feet. With your feet parallel and toes pointing to the top of the mat, bend your knee into a lunge. Keep your left leg straight behind you and turn your left heel in at approximately 45 degrees. Raise your arms straight above your head, keeping your shoulders pressed down.",
   image: "https://www.yogajournal.com/wp-content/uploads/2017/04/Warrior-I-Primary.jpg?crop=535:301&width=1070&enable=upscale",
 },
 {
   name: "Warrior Two",
   description: "Stand in a wide position with your feet straight out in front of you and wider that your shoulders. Then turn one foot out 90 degrees, and bend your knee into a lunge. Be sure to keep your knee above your ankle and pointing over your toes. Extend your arms straight out from your sides. Relax your shoulders away from your ears. Turn your head to the the side of the turned foot and look over your fingers.",
   image: "https://www.yogajournal.com/wp-content/uploads/2007/08/warrrior-ii-primary.jpg?crop=535:301&width=1070&enable=upscale",
 },
 {
   name: "Warrior Three",
   description: "Begin in lunge with your front knee bent, your back leg straight and your back heel lifted. Your hips and chest should be squared to front of the mat. Raise your arms above your head. Move your hands to your heart, with palms pressed against each other in a prayer position. Lean forward until your back leg extends straight back, even with your hips. Keep your foot flexed and your gaze downward. Make sure your standing leg is strong and straight, but not locked at knee. Reach your arms forward so your body forms a “T” shape.",
   image: "https://www.yogajournal.com/wp-content/uploads/2007/08/warrior-iii-primary.jpg?crop=535:301&width=1070&enable=upscale",
 },
 {
   name: "Tree Pose",
   description: "Start by standing straight with a long, tall back and your feet aligned and touching. Your arms should be straight along either side of your body.Take a few breaths and find a place or object in the room to focus your attention. Slowly shift your weight to your left leg and begin to raise your right foot off the floor. Align the sole of your right foot with the inside of your left thigh. The toes should be pointing down and your pelvis should be completely straight. Raise Your arms up.",
   image: "https://www.yogajournal.com/wp-content/uploads/2021/02/tree-pose-primary.jpg?crop=535:301&width=1070&enable=upscale",
 },
 {
   name: "Mountain Pose",
   description: "Stand tall and press into all four corners of your feet, keeping them parallel and hip-width apart. Feel the strength of your thighs immediately engaging your lower belly. Lengthen your arms alongside the body, your shoulders drawn back towards your spine and your palms turned forward.",
   image: "https://www.yogajournal.com/wp-content/uploads/2007/08/Man-Doing-Mountain-Pose.jpg?crop=535:301&width=1070&enable=upscale",
 },
]

async function seed() {
  await db.sync({ force: true })
  await Pose.bulkCreate(poses)
  console.log('db synced!')

  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])



  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}


async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
