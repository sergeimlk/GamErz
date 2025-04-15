import RoleModel, { RoleDTO } from "../Model/Role.Model";
import { AbstractCrudRepository } from "./AbstractCrud.Repository";

class RoleRepository extends AbstractCrudRepository<RoleDTO> {
  constructor() {
    super(RoleModel);
  }

  async setRoles(roles: Array<string>): Promise<void> {
    try {
      for (const role of roles) {
        const roleModel = new RoleModel({ role });
        await roleModel.save();
      }
    } catch (error) {
      throw new Error(
        `[DB][Error] Failed to save data in database. \n${error}`
      );
    }
  }

  async deleteAll(): Promise<void> {
    try {
      await RoleModel.deleteMany({});
    } catch (error) {
      throw new Error(
        `[DB][Error] Failed to delete data from database. \n${error}`
      );
    }
  }
}

export default RoleRepository;
