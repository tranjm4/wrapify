const LOCALURL = "https://wrapify.jmhtran.dev";
const SERVERURL = "https://wrapify-server-bff9ee0094f2.herokuapp.com";

async function redirectToAuthCodeFlow() {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    // Build query parameters to redirect to backend API
    const params = new URLSearchParams();
    params.append("response_type", "code");
    params.append("redirect_uri", `${LOCALURL}/callback`);
    params.append("scope", "user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
    params.append("verifier", verifier);

    document.location = `${SERVERURL}/auth/spotify?${params.toString()}`;
}

// Code verifier for Spotify API
function generateCodeVerifier(length: number) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// Code challenge for Spotify API
async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

// Retrieves Spotify access token
async function getAccessToken(code: string) {
    const verifier = localStorage.getItem("verifier");
    // GET request made to backend API to get access token
    const { access_token } = await fetch(`${SERVERURL}/callback?code=${code}&verifier=${verifier}`)
        .then(response => {
            return response.json();
        })

    return access_token;
}

async function getUserData(accessToken: string) {
    console.log("access token:", accessToken);
    // GET request made to backend API to get user data
    const data = await fetch(`${SERVERURL}/getData?access_token=${accessToken}`);
    return data;
}

export { redirectToAuthCodeFlow, getAccessToken, getUserData };