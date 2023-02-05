import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getFollowedArtists } from "../services/ArtistService";
import Artist from "../components/Artist";

const style = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    margin: '20px'
};

const MutualSearch = () => {

    const [ lastArtistId, setLastArtistId ] = useState(null);
    const [ artists, setArtists ] = useState([]);
    const limit = 50;

    useEffect(() => {

        const fetchArtists = async () => {
            const response = await getFollowedArtists(lastArtistId, limit );

            if (response.data){
                console.log(response.data);
                setArtists(response.data.artists.items);
                setLastArtistId(response.data.artists.cursors.after);
            }
        };

        fetchArtists();

    }, []);

    return (
        <>
            <div>  Mutual Search </div>
            {artists.length > 0 && 
            (<div style = {style}>
                {artists.map((artist: Artist) => (
                <Artist artist = {artist} key={artist.id} />))}
            </div>)}
          
        </>
    );
};


export default MutualSearch;