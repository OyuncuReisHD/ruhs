const createUser = ((data) => {
  const userData = {};

  userData.id = data.id;
  userData.username = data.username;
  userData.discriminator = data.discriminator;
  userData.tag = data.username + "#" + data.discriminator;

  return userData;
});

module.exports = createUser;
