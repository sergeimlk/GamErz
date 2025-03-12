import RoleModel from "./IRole";

const setRole = () => {
  const roles = [
    {
      role: "Guest",
    },
    {
      role: "Player",
    },
    {
      role: "Admin",
    },
    {
      role: "SuperAdmin",
    },
  ];

  try {
    roles.forEach(async (role) => {
      const roleModel = new RoleModel(role);
      await roleModel.save();
    });
  } catch (error) {
    throw new Error(`[DB][Error] Failed to save data in database. \n${error}`);
  }
};
export default setRole;
