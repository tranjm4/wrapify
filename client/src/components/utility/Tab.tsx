import React from 'react';

import { Artist, Track, ArtistEntryProps, TrackEntryProps, Entry } from './interfaces';
import TrackEntry from './TrackEntry';
import ArtistEntry from './ArtistEntry';

interface Props {
    entries: Entry[];
    entryType: string;
}

const Tab: React.FC<Props> = ({ entries, entryType }: Props) => {
    if (entryType == "artist") {
        return (
            <div className="flex flex-col">
                {entries.map((entry, index) => (
                    // @ts-ignore
                    <ArtistEntry entry={entry} key={index} />
                    // <>
                    //     {entry}
                    // </>
                ))}
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-col">
                {entries.map((entry, index) => (
                    // @ts-ignore
                    <TrackEntry entry={entry} key={index} />
                    // <>
                    //     {entry}
                    // </>
                ))}
            </div>
        )
    }
}

export default Tab