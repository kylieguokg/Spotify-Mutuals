import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getFollowedArtists } from "../services/ArtistService";
import CSS from 'csstype';

type Artist = {
    name: string;
    id: string;
    images: any[];
    genres: string[];
    popularity: any;
    followers: {
        total: number;
    };
};

const style: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    // justifyContent: 'center',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#1DB954',
    gap: '20px'
};

const imageStyle = {
    width: '100px',
    height: '100px'
};

const Artist = ({ artist } : {artist: Artist }) => {

    return (
        <div style={style}>  
            <div>  {artist.name} </div>
            <div> Genres: {artist.genres} </div>
            <div> Popularity: {artist.popularity} </div>
            <div> Followers: {artist.followers.total} </div>
            <img src = {artist.images[0].url} alt = {"artist image"} style={imageStyle}/>
        </div>
    );
};


export default Artist;