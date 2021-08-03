const { logger } = require("../config/config");
const db = require("../models");
const connect = require("../db/connect");

(async () => {
  // first we need to connect to the mongodb database
  await connect();

  // delete all the documents to avoid duplicate email errors
  await db.User.deleteMany({});

  try {
    // create the document
    const user = await db.User.create({
      firstName: "alex",
      lastName: "mark",
      age: 20,
      email: "humitsak@wamgo.com",
      password: "266-1089-eula-stephens",
      activities: "Programming",
    });

    logger.debug(user);
  } catch (error) {
    // catch any errors that appear
    logger.error(error.errors);
  }
})();
