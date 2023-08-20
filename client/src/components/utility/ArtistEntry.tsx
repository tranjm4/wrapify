import React from 'react';

import { Artist, ExternalURL, ImageObject, ArtistEntryProps } from "./interfaces";

interface Props {
    entry: ArtistEntryProps;
    key: number;
}

const ArtistEntry: React.FC<Props> = ({ entry, key }: Props) => {
    return (
        <div key={key} className="flex flex-row flex-grow w-full">
            <img src={entry.images[0].url}></img>
            <a href={entry.external_urls.spotify}>
                <h2>{entry.name}</h2>
            </a>
        </div>
    )
}

export default ArtistEntry;