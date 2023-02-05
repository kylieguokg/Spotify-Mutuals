import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import MutualSearch from "./MutualSearch";
import { AuthContext } from "../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";

const Home = () => {


    const { login, user, getAccessToken } = useContext(AuthContext);

    const [ params ] = useSearchParams();

    useEffect(() => {

        const code = params.get('code') || null;
        const state = params.get('state') || null;

        const abortController = new AbortController();
    
        if (code && state){
            getAccessToken(code, state, abortController);
        }
        return () => abortController.abort();

    }, []);

    return (
        <div>
            <h1><Link to="/"> Home </Link> </h1>
            { user.access_token ? 
                (<MutualSearch/>)
            : (<button onClick={login} > Login to Spotify </button>)  }   
            
        </div>
    )
};

export default Home;