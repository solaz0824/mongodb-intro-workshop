const db = require("../models");
const { seedBooks, seedUsers } = require("../db/seed");
const connect = require("../db/connect");
const { logger } = require("../config/config");

async function books() {
  // first connect to the DB
  await connect();
  // then insert some users
  await seedUsers();
  // then insert some books
  // first insert the users because the books will query for a user id
  await seedBooks();

  //   const books = await db.Book.find({}).limit(2);
  //   const books = await db.Book.findOne({ title: "The Twilight Wanderer" })
  //     .limit(2)
  //     .populate("author");
  const books = await db.Book.findOne({ title: "The Twilight Wanderer" })
    .limit(2)
    .populate({
      path: "author",
      select: {
        firstName: 1,
        lastName: 1,
        email: 1,
      },
    });
  logger.debug(books);
}

books();
