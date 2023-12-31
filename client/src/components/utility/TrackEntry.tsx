import React from 'react';

import { TrackEntryProps } from './interfaces';
import { motion } from "framer-motion";

interface Props {
  entry: TrackEntryProps;
  key: number;
}

const TrackEntry: React.FC<Props> = ({ entry, key }: Props) => {
  return (
    <motion.div
      variants={{
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
      key={key}
      className="flex flex-grow flex-row w-full py-5 border-b-2 last:border-b-0 md:border-b-8"
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", damping: 10, stiffness: 75 }}
    >
      <img src={entry.album.images[0].url}
        className="w-[125px] md:w-[200px] xl:w-[250px] transition-all duration-500"></img>
      <div className="flex flex-grow flex-col w-full justify-center text-right pl-2">
        <>
          <h2 className="text-lg font-extrabold md:text-3xl lg:text-4xl xl:text-5xl duration-300">
            {entry.name}
          </h2>
          <div className="w-full text-md lg:text-xl xl:text-2xl font-bold text-white duration-300">
            <h2>
              {entry.artists[0].name}
            </h2>
            <h3 className="text-primary">
              {entry.album.name}
            </h3>
          </div>
        </>
      </div>
    </motion.div>
  )
}

export default TrackEntry;