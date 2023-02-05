import React, { createContext, useEffect, useState } from 'react';
import { goToSpotifyAuthorisation } from '../services/AuthorisationService';
import { getAccessToken, getRefreshAccessToken, AccessToken } from "../services/AuthorisationService";

export const AuthContext = createContext({
    authenticated: false,
    login: () => {},
    logout: () => {},
    getAccessToken: (code: string, state: string, abortController: AbortController) => {},
    user: {} as AccessToken, 
});

export const AuthProvider = ({ children }: any) => {

    const [ accessToken, setAccessToken ] = useState<AccessToken>(JSON.parse(window.localStorage.getItem('accessToken') || "{}"));

    const getToken = (code: string, state: string, abortController: AbortController) => {

        const storedState = window.localStorage.getItem('state') || null;

        if (code && state && state == storedState){

            const fetchToken = async () => {
                const response = await getAccessToken(code, state, abortController);

                if (response.data){
                    setAccessToken(response.data);
                    window.localStorage.setItem('accessToken', JSON.stringify(response.data));
                    console.log(response.data);
                }
            };

            fetchToken();
        }
    };

    return (
        <AuthContext.Provider
            value = {{
                authenticated: false,
                login: goToSpotifyAuthorisation,
                logout: goToSpotifyAuthorisation,
                user: accessToken,
                getAccessToken: getToken
            }}
        >
        {children}
        </AuthContext.Provider>

    );
};
