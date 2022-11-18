import express, {
    Express,
    Request,
    Response
} from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import userRouter from './src/api/routes/userRoutes';
import {getKeycloak,getStore} from './config/keycloak-config'
import session from 'express-session';


// get keycloak
const keycloak = getKeycloak();

const app: Express = express();
console.log(keycloak);
const memoryStore = getStore();

app.use(session({
    secret: "Mysecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));
  

app.use(keycloak.middleware());

app.use(cors());
app.use(express.json());
app.use((bodyparser.urlencoded({ extended: true })));

//  ,keycloak.protect('user')
app.get('/',keycloak.enforcer('user:profile'),(req : Request,res : Response) =>{
    res.json({data : "hello"})
})

app.use('/user', userRouter)

app.listen(8000, ()=>{
    console.log("Server Running ")
})

