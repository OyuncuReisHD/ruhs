const newUser = ((userData) => {
  const user = {};

  if (typeof userData === "object") {
    user.id = userData.id;
    user.username = userData.username;
    user.discriminator = userData.discriminator;
    user.tag = userData.username + "#" + userData.discriminator;

    user.getAvatar = ((data) => {
      if (userData.avatar && userData.avatar.startsWith("a_")) {
        return `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar.slice(2)}${data && data.dynamic === true ? ".gif" : ".webp"}${data && data.size ? "?size=" + data.size : ""}`;
      } else if (userData.avatar) {
        return `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}${data && data.dynamic === true ? ".png" : ".webp"}${data && data.size ? "?size=" + data.size : ""}`;
      } else {
        return `https://cdn.discordapp.com/embeds/avatar/${userData.discriminator % 5}${data && data.dynamic === true ? ".png" : ".webp"}`;
      }
    });

    user.createdAt = new Date((Number(userData.id) / 4194304) + 1420070400000)

    return user;
  } else {
    return null;
  }
});

module.exports = newUser;
