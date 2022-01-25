const Sequelize = require("sequelize");
const db = require("../db");

const Pose = db.define("pose", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT,
    }
  });



module.exports = Pose;
