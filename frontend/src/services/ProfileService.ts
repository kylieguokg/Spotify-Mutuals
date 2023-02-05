export const getUserProfile = async (code: string, state: string, abortController: AbortController) => {

    let response = await client.post('/api/token', {
            code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code', 
            state
    }, {
        headers : {
        'Authorization' : 'Basic ' + ((Buffer.from(clientId + ':' + clientSecret)).toString('base64')),
        'Content-Type' : 'application/x-www-form-urlencoded'
        },
        signal : abortController.signal
    }
    ).catch((err) => {
        return err;
    });

    return response;
};