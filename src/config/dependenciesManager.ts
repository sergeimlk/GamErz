import AuthenticationController from "../controllers/Authentication.Controller";
import AuthenticationService from "../services/Authentication.Service";
import UserRepository from "../DAOs/User.Repository";
import MainRouter from "../Router";


const init = (): Map<string, any> => {
  const deps = new Map<string, any>();
  
  const userRepository = new UserRepository();
  deps.set("userRepository", userRepository);
  
  const authenticationService = new AuthenticationService(userRepository);
  deps.set("authenticationService", authenticationService);
  
  const authenticationController = new AuthenticationController(authenticationService);
  deps.set("authenticationController", authenticationController);

  const mainRouter = new MainRouter(authenticationController);
  deps.set("mainRouter", mainRouter)
  
  return deps;
}

export default init();
