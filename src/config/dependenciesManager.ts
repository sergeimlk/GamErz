import AuthenticationController from "../controllers/Authentication.Controller";
import AuthenticationService from "../services/Authentication.Service";
import UserRepository from "../DAOs/User.Repository";
import MainRouter from "../Router";
import RoleController from "../controllers/Role.Controller";
import RoleRepository from "../DAOs/Role.Repository";
import RoleService from "../services/Role.Service";

const init = (): Map<string, any> => {
  const deps = new Map<string, any>();

  const userRepository = new UserRepository();
  deps.set("userRepository", userRepository);

  const authenticationService = new AuthenticationService(userRepository);
  deps.set("authenticationService", authenticationService);

  const authenticationController = new AuthenticationController(
    authenticationService
  );
  deps.set("authenticationController", authenticationController);

  const roleRepository = new RoleRepository();
  deps.set("roleRepository", roleRepository);

  const roleService = new RoleService(roleRepository);
  deps.set("roleService", roleService);

  const roleController = new RoleController(roleService);
  deps.set("roleController", roleController);

  const mainRouter = new MainRouter(roleController, authenticationController);
  deps.set("mainRouter", mainRouter);

  return deps;
};

export default init();
