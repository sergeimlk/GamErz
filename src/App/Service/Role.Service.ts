import { RoleDTO } from "../Model/Role.Model";
import RoleRepository from "../DAO/Role.Repository";

class RoleService {
  private readonly ROLES = ["Guest", "Player", "Admin"];

  roleRepository: RoleRepository;

  constructor(roleRepository: RoleRepository) {
    this.roleRepository = roleRepository;

    this.areRolesSaved().then((bool) => {
      if (!bool) {
        this.roleRepository.setRoles(this.ROLES);
      }
    });
  }

  private async areRolesSaved(): Promise<boolean> {
    const existingRoles = await this.roleRepository.findAll();
    const targetRoles = new Set<string>(this.ROLES);

    for (const obj of existingRoles) {
      if (!targetRoles.has(obj.role)) {
        break;
      }
      targetRoles.delete(obj.role);
    }
    return targetRoles.size === 0;
  }

  async findAll(): Promise<Array<RoleDTO>> {
    return await this.roleRepository.findAll();
  }
}

export default RoleService;
