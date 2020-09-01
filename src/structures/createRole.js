const createRole = ((roleData) => {
  const role = {};

  role.id = roleData.id;
  role.name = roleData.name;
  role.color = roleData.color;
  role.hoist = roleData.hoist;
  role.position = roleData.position;
  role.permissions = roleData.permissions;
  role.managed = roleData.managed;
  role.mentionable = roleData.mentionable;

  return role;
});

module.exports = createRole;