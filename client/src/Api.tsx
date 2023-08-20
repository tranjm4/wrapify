async function redirectToAuthCodeFlow() {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("scope", "user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
    params.append("verifier", verifier);

    document.location = `http://localhost:8000/auth/spotify?${params.toString()}`;
}

function generateCodeVerifier(length: number) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

async function getAccessToken(code: string) {
    const verifier = localStorage.getItem("verifier");
    const { access_token } = await fetch(`http://localhost:8000/callback?code=${code}&verifier=${verifier}`)
        .then(response => {
            return response.json();
        })

    return access_token;
}

async function getUserData(accessToken: string) {
    console.log("access token:", accessToken);
    const data = await fetch(`http://localhost:8000/getData?access_token=${accessToken}`);
    return data;
}

// async function getAccessToken(clientID: string, code: string) {
//     const verifier = localStorage.getItem("verifier");

//     const params = new URLSearchParams();
//     params.append("client_id", clientID);
//     params.append("grant_type", "authorization_code");
//     params.append("code", code);
//     params.append("redirect_uri", "https://localhost:5173/callback");
//     params.append("code_verifier", verifier!);
    
//     const result = await fetch(`/callback?${params.toString()}`)

//     // const { access_token } = await result.json();
//     // return access_token;
// }

// async function fetchProfile(token: string): Promise<any> {
//     const result = await fetch("https://api.spotify.com/v1/me", {
//         method: "GET", headers: { Authorization: `Bearer ${token}` }
//     });

//     return await result.json();
// }

// function populateUI(profile: any) {

// }

export { redirectToAuthCodeFlow, getAccessToken, getUserData };