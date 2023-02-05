import { useContext, useEffect } from 'react'
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { AccessToken } from './AuthorisationService';

export const client = axios.create({
    baseURL: "https://api.spotify.com/v1"
});

const WithAxios = ({ children }: { children : any}) => {

    const { getRefreshAccessToken, user } = useContext(AuthContext);

    useEffect(() => {

        // request interceptor for adding token
        client.interceptors.request.use((config) => {
            // add token to request headers
            user.access_token && (config.headers['Authorization'] = 'Bearer ' +  user.access_token);
            // console.log(user.access_token);
            return config;
        });
        
        // response interceptor for adding token
        client.interceptors.response.use((config) => {
            console.log(config);
            return config;
        }, async (error) => {
            console.log(error);
            if (error.response.data.error.message === "The access token expired"){
                const refreshToken = await getRefreshAccessToken();
                console.log(refreshToken);
                error.config.headers.common['Authorization '] = 'Bearer ' +  refreshToken;
                return client(error.config);

            }
            return Promise.reject(error);
        });
          
    }, [user, getRefreshAccessToken])

    return children;
};

export default WithAxios;