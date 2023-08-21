import React from 'react';

import { ArtistEntryProps } from "./interfaces";

interface Props {
    entry: ArtistEntryProps;
    key: number;
}

const ArtistEntry: React.FC<Props> = ({ entry, key }: Props) => {
    return (
        <div key={key} className="flex flex-row flex-grow w-full py-5 border-b-2 last:border-b-0 md:border-b-8">
            <img src={entry.images[0].url}
                className="w-[125px] md:w-[200px] xl:w-[250px] transition-all duration-500"></img>
            <div className="flex items-center justify-center w-full">
                <a href={entry.external_urls.spotify}
                    className="">
                    <h2 className="text-primary hover:text-white duration-300
                        font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                        {entry.name}
                    </h2>
                </a>
            </div>
        </div>
    )
}

export default ArtistEntry;