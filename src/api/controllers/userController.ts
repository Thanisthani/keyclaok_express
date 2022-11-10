import {
    Request,
    Response,
    NextFunction
} from "express";
import {
    signUp,
    logIn
} from '../../services/userService';



// register user
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;
            const { data }: any = await signUp({ username, password });

            return res.json(data);

        }
        catch (error) {
            next(error);
        }
    }

    // login user
export const loginUser = async (req : Request,res : Response,next : NextFunction) =>{
    try {
            console.log("login controller")
            const { username, password } = req.body;
            const { data }: any = await logIn({ username, password });
            
            return res.json(data);
            
        } catch (error) {
            next(error)
        }
}
    
// protect route for keycloak
export const getUser = (req: Request, res: Response, next: NextFunction) => {
    return res.json({ name: "john", email: 'john@gmail.com' });

}
