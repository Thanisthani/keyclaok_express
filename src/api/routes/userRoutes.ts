import express,
{ Router } from 'express';
import {
    registerUser,
    loginUser,
    getUser
} from '../controllers/userController';
import { initKeycloak } from '../../../config/keycloak-config';

const userRouter: Router = express.Router();

// initalize keycloak
const keycloak = initKeycloak();
console.log("keycloak initaied")


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get', keycloak.protect(), getUser);


export default userRouter;

