import { GenarateUserToken } from '../utils/index';
import qs from 'qs';
import axios from 'axios';
import config from '../../config/index'


// Register

export const signUp = async (userInputs: any) => {
    const { username, password } = userInputs;
    const TOKEN_DATA = await GenarateUserToken();

    try {
        
        const response = await axios({
            method: 'post',
            url: `${config.authServerUrl}admin/realms/${config.realm}/users`,
            data: {
                "enabled": true,
                "username": username,
                "credentials": [{
                    "type": "password",
                    "value": password,
                    "temporary": false
                }]
            },
            headers: {
                Authorization: `Bearer ${TOKEN_DATA.access_token}`,
                'Content-Type': 'application/json',
            }
        })

        return response;

    }
    catch (error) {
        return error;
    }
}

// login

export const logIn = async (userInputs: any) => {
console.log("user login service")
    const { username, password } = userInputs;

    try {
        const response = await axios({
            method: 'post',
            url: `${config.authServerUrl}realms/${config.realm}/protocol/openid-connect/token`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8', },
            data: qs.stringify({
                grant_type: 'password',
                client_id: config.clientId,
                client_secret:config.secret,
                username: username,
                password: password
            })
        })
    console.log("loginfuction")
        return response;
    }
    catch (error) {
        return error;
    }
    
}
