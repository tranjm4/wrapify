import React from 'react';

import { ArtistEntryProps } from "./interfaces";
import { motion } from "framer-motion";

interface Props {
    entry: ArtistEntryProps;
    key: number;
}

const ArtistEntry: React.FC<Props> = ({ entry, key }: Props) => {
    return (
        <motion.div
            variants={{
                hidden: { y: 50, opacity: 0 },
                visible: { y: 0, opacity: 1 }
            }}
            className="flex flex-row flex-grow w-full py-5 border-b-2 last:border-b-0 md:border-b-8"
            key={key}
            initial="hidden"
            animate="visible"
            transition={{ type: "spring", damping: 10, stiffness: 75 }}
        >
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
        </motion.div>
    )
}

export default ArtistEntry;