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

const Callback: React.FC = () => {
    const [accessToken, setAccessToken] = useState('');
    const [data, setData] = useState<APIData>();
    // const temp = {
    //     trackData: {
    //         short_term: {},
    //         medium_term: {},
    //         long_term: {},
    //     },
    //     artistData: {
    //         short_term: {},
    //         medium_term: {},
    //         long_term: {},
    //     }
    // }

    useEffect(() => {
        // setData(temp);
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        if (!code) {
            redirectToAuthCodeFlow();
        } else {
            async function getToken(code: string) {
                getAccessToken(code)
                    .then(token => {
                        console.log(token);
                        setAccessToken(token);
                    })
            }

            getToken(code)
                .then(() => {
                    return accessToken;
                })
        }
    }, []);

    useEffect(() => {
        async function getData(accessToken: string) {
            const data = await getUserData(accessToken)
                .then(response => {
                    return response.json();
                });
            setData(data);
        }
        if (accessToken) {
            getData(accessToken);
        }
    }, [accessToken])

    useEffect(() => {
        if (data) {
            console.log("data:", data);
        }
    }, [data])

    const [activeType, setActiveType] = useState(0);
    const [activeTimeRange, setActiveTimeRange] = useState(0);
    if (!data) {
    // if ("") { 
        return (
            <div className="flex flex-row h-full w-full items-center justify-center">
                <h1 className="text-5xl font-extrabold text-primary">Loading...</h1>
            </div>
        )
    }
    else {
        // @ts-ignore
        return (
            <div className="flex flex-col h-full w-full min-h-fit min-w-fit items-center my-10">
                {/* Title */}
                <h1 className="text-5xl font-extrabold text-primary">Wrapify</h1>

                {/* Artist/Track Switch Buttons */}
                <div className="flex flex-row mt-10 mb-3">
                    <Button handleClick={() => setActiveType(0)}>Songs</Button>
                    <Button handleClick={() => setActiveType(1)}>Artists</Button>
                </div>

                {/* Time Range Buttons */}
                <div className="flex flex-row mb-10">
                    <Button handleClick={() => setActiveTimeRange(0)}>4 Weeks</Button>
                    <Button handleClick={() => setActiveTimeRange(1)}>6 Months</Button>
                    <Button handleClick={() => setActiveTimeRange(2)}>All Time</Button>
                </div>

                <div className="bg-primary w-[90%] h-full">
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