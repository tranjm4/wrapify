const clientID = "clientID=553f8daaa5914080b24e3b2ccb6272ab";
const code = undefined;

async function redirectTOAuthCodeFlow(clientID: string) {

}

async function getAccessToken(clientID: string, code: string) {

}

async function fetchProfile(token: string): Promise<any> {

}

function populateUI(profile: any) {

}

const handleUserLogin = async () => {
    if (!code) {
        redirectTOAuthCodeFlow(clientID);
    }
    else {
        const accessToken: any = await getAccessToken(clientID, code);
        const profile = await fetchProfile(accessToken);
        populateUI(profile);
    }
}

export default handleUserLogin;