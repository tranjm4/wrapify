import React from 'react';

import { Entry } from './interfaces';
import TrackEntry from './TrackEntry';
import ArtistEntry from './ArtistEntry';
import StaggerContainer from '../motions/StaggerContainer';

interface Props {
    entries: Entry[];
    entryType: string;
}

const Tab: React.FC<Props> = ({ entries, entryType }: Props) => {
    if (entryType == "artist") {
        return (
            <div className="flex flex-col h-fit mb-20">
                {entries.map((entry, index) => (
                    <ArtistEntry entry={entry} key={index} />
                ))}
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-col h-fit mb-20">
                {entries.map((entry, index) => (
                    <TrackEntry entry={entry} key={index} />
                ))}
            </div>
        )
    }
}

export default Tab