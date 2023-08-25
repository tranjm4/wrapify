import React, { useEffect, useState } from 'react'
import { redirectToAuthCodeFlow, getAccessToken, getUserData } from './Api';

import Button from './components/utility/Button';
import Tab from './components/utility/Tab';

interface APIData {
    trackData: TimeRanges;
    artistData: TimeRanges;
}

interface TimeRanges {
    short_term: object;
    medium_term: object;
    long_term: object;
}

interface StoredTokenData {
    token: string;
    timestamp: number;
}

interface StoredUserData {
    data: APIData,
    timestamp: number;
}

function isExpired(lastUpdateTime: number) {
    const updateInterval = 3600000; // 1 hour
    const currentTime = Date.now();

    return currentTime - lastUpdateTime > updateInterval;
}

function storeTokenWithTimestamp(token: string) {
    const timestamp = Date.now();
    const storedDataWithTimestamp = {
        token: token,
        timestamp: timestamp,
    };
    localStorage.setItem("lastToken", JSON.stringify(storedDataWithTimestamp));
}

function getTokenWithTimestamp() {
    const storedData: string | null = localStorage.getItem("lastToken");
    if (storedData) {
        const lastToken: StoredTokenData = JSON.parse(storedData);
        const token = lastToken.token;
        const lastTime = lastToken.timestamp;
        if (isExpired(lastTime)) {
            return null;
        }
        else {
            return token;
        }
    }
    else {
        return null;
    }
}

function getUserDataWithTimestamp() {
    const storedData: string | null = localStorage.getItem("userData");
    if (storedData) {
        const userData: StoredUserData = JSON.parse(storedData);
        if (isExpired(userData.timestamp)) {
            return null;
        }
        else {
            return userData.data;
        }
    }
}

function storeUserDataWithTimestamp(data: APIData) {
    const timestamp = Date.now();
    const storedDataWithTimestamp: StoredUserData = {
        data: data,
        timestamp: timestamp,
    };
    localStorage.setItem("userData", JSON.stringify(storedDataWithTimestamp));
}

const Callback: React.FC = () => {
    const [accessToken, setAccessToken] = useState('');
    const [data, setData] = useState<APIData>();

    // useEffect for first load of component
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        // If the code was not provided, redirect the user to the code flow (login)
        if (!code) {
            redirectToAuthCodeFlow();
        } else {
            // Communicates with backend API to get access token from Spotify API
            const getToken = async (code: string) => {
                getAccessToken(code)
                    .then(token => {
                        // Store access token & timestamp for page reload purposes
                        storeTokenWithTimestamp(token);
                        setAccessToken(token);
                    })
            }

            // Attempts to get a token from localStorage
            //  If the token exists / is recent, set the token to the stored token
            //  Otherwise, get a new token
            const getStoredToken = async () => {
                const storedToken = getTokenWithTimestamp();
                if (!storedToken) {
                    getToken(code);
                }
                else {
                    setAccessToken(storedToken);
                }
            };

            // Attempt to get stored user data from localStorage
            //  If the data exists / is recent, set the data to the stored data
            //  Otherwise, get a new token (which gets new data)
            const userData: APIData | null | undefined = getUserDataWithTimestamp();
            if (userData) {
                setData(userData);
            }
            else {
                getStoredToken();
            }
        }
    }, []);

    // Activates once an access token is provided by the Spotify API
    useEffect(() => {
        async function getData(accessToken: string) {
            // Gets user data from backend API => Spotify API
            console.log(accessToken);
            const data = await getUserData(accessToken)
                .then(response => {
                    return response.json();
                });

            // Stores data & timestamp into localStorage 
            storeUserDataWithTimestamp(data);
            setData(data);
        }

        if (accessToken) {
            getData(accessToken);
        }
    }, [accessToken])

    const [activeType, setActiveType] = useState(0);
    const [activeTimeRange, setActiveTimeRange] = useState(0);
    if (!data) {
        return (
            <div className="flex flex-row h-full w-full items-center justify-center">
                <h1 className="text-5xl font-extrabold text-primary">Loading...</h1>
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-col h-full w-full min-h-fit min-w-fit items-center my-10">
                {/* Title */}
                <h1 className="text-5xl font-extrabold text-primary">Wrapify</h1>

                {/* Artist/Track Switch Buttons */}
                <div className="flex flex-row mt-10 mb-3">
                    <Button index={0} currentIndex={activeType} handleClick={() => setActiveType(0)}>Songs</Button>
                    <Button index={1} currentIndex={activeType} handleClick={() => setActiveType(1)}>Artists</Button>
                </div>

                {/* Time Range Buttons */}
                <div className="flex flex-row mb-10">
                    <Button index={0} currentIndex={activeTimeRange} handleClick={() => setActiveTimeRange(0)}>4 Weeks</Button>
                    <Button index={1} currentIndex={activeTimeRange} handleClick={() => setActiveTimeRange(1)}>6 Months</Button>
                    <Button index={2} currentIndex={activeTimeRange} handleClick={() => setActiveTimeRange(2)}>All Time</Button>
                </div>

                <div className="w-[80%] h-fit text-primary font-bold
                    md:w-[60%] md:max-w-[800px] md:min-w-[600px]">
                    {/* @ts-ignore */}
                    {activeType === 0 && activeTimeRange === 0 && <Tab entries={data["trackData"]["short_term"].items} entryType={"track"} />}
                    {/* @ts-ignore */}
                    {activeType === 0 && activeTimeRange === 1 && <Tab entries={data["trackData"]["medium_term"].items} entryType={"track"} />}
                    {/* @ts-ignore */}
                    {activeType === 0 && activeTimeRange === 2 && <Tab entries={data["trackData"]["long_term"].items} entryType={"track"} />}
                    {/* @ts-ignore */}
                    {activeType === 1 && activeTimeRange === 0 && <Tab entries={data["artistData"]["short_term"].items} entryType={"artist"} />}
                    {/* @ts-ignore */}
                    {activeType === 1 && activeTimeRange === 1 && <Tab entries={data["artistData"]["medium_term"].items} entryType={"artist"} />}
                    {/* @ts-ignore */}
                    {activeType === 1 && activeTimeRange === 2 && <Tab entries={data["artistData"]["long_term"].items} entryType={"artist"} />}
                </div>

            </div>
        )
    }
}



export default Callback;