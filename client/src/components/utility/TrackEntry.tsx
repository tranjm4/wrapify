import React from 'react';

import { Artist, Track, Album, ExternalURL, ImageObject, TrackEntryProps } from './interfaces';

interface Props {
    entry: TrackEntryProps;
    key: number;
}

const TrackEntry: React.FC<Props> = ({ entry, key }: Props) => {
  return (
    <div key={key} className="flex flex-grow flex-row w-full">
        <img src={entry.album.images[0].url}></img>
        <div className="flex flex-col">
            <h2>{entry.name}</h2>
            <h3>{entry.album.name}</h3>
        </div>
        <h2>{entry.artists[0].name}</h2>
    </div>
  )
}

export default TrackEntry;