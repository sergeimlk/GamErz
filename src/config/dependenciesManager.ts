import AuthenticationController from "../App/Controller/Authentication.Controller";
import AuthenticationService from "../App/Service/Authentication.Service";
import UserRepository from "../App/DAO/User.Repository";
import MainRouter from "../App/Router";
import RoleController from "../App/Controller/Role.Controller";
import RoleRepository from "../App/DAO/Role.Repository";
import RoleService from "../App/Service/Role.Service";
import SessionRepository from "../App/DAO/Session.Repository";
import UserService from "../App/Service/User.Service";

const userRepository = new UserRepository();

const sessionRepository = new SessionRepository();

const userService = new UserService(userRepository);

const authenticationService = new AuthenticationService(
  userService,
  sessionRepository
);

const authenticationController = new AuthenticationController(
  authenticationService,
  userService
);

const roleRepository = new RoleRepository();

const roleService = new RoleService(roleRepository);

const roleController = new RoleController(roleService);

const mainRouter = new MainRouter(
  roleController,
  authenticationController
);

export default mainRouter;
