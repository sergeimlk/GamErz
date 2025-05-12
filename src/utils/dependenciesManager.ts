import AuthenticationController from "../App/Controller/Authentication.Controller";
import AuthenticationService from "../App/Service/Authentication.Service";
import UserRepository from "../App/DAO/User.Repository";
import MainRouter from "../App/Router";
import RoleController from "../App/Controller/Role.Controller";
import RoleRepository from "../App/DAO/Role.Repository";
import RoleService from "../App/Service/Role.Service";
import SessionRepository from "../App/DAO/Session.Repository";
import UserService from "../App/Service/User.Service";
import MessageRepository from "../App/DAO/Message.Repository";
import SaloonRepository from "../App/DAO/SaloonRepository";
import SaloonService from "../App/Service/Saloon.Service";
import SaloonController from "../App/Controller/Saloon.Controller";
import MessageService from "../App/Service/Message.Service";

const userRepository = new UserRepository();
const sessionRepository = new SessionRepository();
const userService = new UserService(userRepository);
const authenticationService = new AuthenticationService(
  sessionRepository
);
const authenticationController = new AuthenticationController(
  authenticationService,
  userService
);
const roleRepository = new RoleRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);
const messageRepository = new MessageRepository();
const saloonRepository = new SaloonRepository();
const saloonService = new SaloonService(saloonRepository);
const messageService = new MessageService(messageRepository);
const saloonController = new SaloonController(saloonService, userService, messageService);
const mainRouter = new MainRouter(
  roleController,
  authenticationController,
  saloonController
);

export default mainRouter;
