const createUser = ((userData) => {
  const user = {};

  user.id = userData.id;
  user.username = userData.username;
  user.discriminator = userData.discriminator;
  user.tag = userData.username + "#" + userData.discriminator;
  user.getAvatar = (() => {
    if(userData.avatar && userData.avatar.startsWith("a_")) {
      return "https://cdn.discordapp.com/avatars/" + userData.id + "/" + userData.avatar.slice(2) + ".gif";
    } else if(userData.avatar) {
      return "https://cdn.discordapp.com/avatars/" + userData.id + "/" + userData.avatar + ".png";
    } else {
      return "https://cdn.discordapp.com/embeds/avatar/" + (userData.discriminator % 5) + ".png";
    }
  });

  return user;
});

module.exports = createUser;
