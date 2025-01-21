import router from 'express';
import { sign_up_user, sign_in_user } from "./controller.js";
import { sigInMiddleware, sigUpMiddleware } from "./middleware.js";


let route = router.Router();


route.post('/signup', sigUpMiddleware, sign_up_user);
route.post('/signin', sigInMiddleware, sign_in_user);


export default route;  
 



