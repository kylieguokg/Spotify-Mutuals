import { client } from "./WithAxios";

export const getFollowedArtists = async (lastArtistId: any, limit: number ) => {
    
    var baseUrl = `/me/following?type=artist&limit=${limit}`;

    lastArtistId && (baseUrl += `&after=${lastArtistId}`);

    let response = await client.get(baseUrl, {
        headers : {
        'Content-Type' : 'application/json'
        }
    });

    return response;
};