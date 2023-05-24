const connection = require('../config/connection');
const { User, Comment } = require('../models');
const { getRandomName, getRandomComments } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Comment.deleteMany({});
  await User.deleteMany({});

  const users = [];
  const comment = getRandomComments(10);

  for (let i = 0; i < 20; i++) {
    const fullName = getRandomName();
    const first = fullName.split(' ')[0];
    const last = fullName.split(' ')[1];

    users.push({
      first,
      last,
      age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
    });
  }

  await User.collection.insertMany(users);
  await Comment.collection.insertMany(comment);

  // loop through the saved comments, for each comment we need to generate a comment response and insert the comment responses
  console.table(users);
  console.table(comments);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
