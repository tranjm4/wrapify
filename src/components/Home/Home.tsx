import React from "react";

import SlideIn from "../motions/SlideIn";
import VerticalBar from "../motions/VerticalBar";
import Appear from "../motions/Appear";
import handleUserLogin from "../../Api";

const Home = () => {
  return (
    <div className="flex h-fit w-screen flex-col">

      {/* Title Section */}
      <div className="flex flex-col h-[100vh] justify-center items-center text-center">
        <Appear className="">
          <h1 className="text-9xl text-primary font-bold my-5">
            Wrapify
          </h1>
          <h2 className="text-5xl text-primary font-bold my-5">
            wrapped, wherever, whenever
          </h2>
          <h3 className="text-md text-primary text-center font-bold mb-5">
            an independent student project
          </h3>
          <button className="text-xl w-fit h-fit px-10 py-5 bg-primary border-4"
                  onClick={() => handleUserLogin()}>
            Login
          </button>
        </Appear>
      </div>

      {/* Description Section */}
      <div className="h-[100vh] w-full flex flex-col justify-evenly">

        {/* Description Entry */}
        <div className="w-full h-fit flex items-center overflow-hidden">
          {/* Vertical Bar */}
          <VerticalBar className="w-[20px] h-full bg-primary ml-20" />
          {/* Text Block */}
          <SlideIn className="flex flex-col justify-center h-fit w-[60%] mx-20">
            <div className="h-fit mr-40 duration-200">
              <h1 className="text-6xl py-5 text-primary font-bold">
                Why Wrapify?
              </h1>
              <p className="text-primary font-bold text-lg">
                Spotify releases its Spotify Wrapped at the end of each year - that's a large gap in
                time between each iteration. The goal of this is to
              </p>
            </div>
          </SlideIn>
        </div>


        {/* Description Entry */}
        <div className="w-full h-fit flex items-center overflow-hidden mt-5">
          {/* Vertical Bar */}
          <VerticalBar className="w-[20px] h-full bg-primary ml-20" />
          {/* Text Block */}
          <SlideIn className="flex flex-col justify-center h-fit w-[60%] mx-20">
            <div className="h-fit mr-40 duration-200">
              <h1 className="text-6xl py-5 text-primary font-bold">
                Behind the Scenes
              </h1>
              <p className="text-primary font-bold text-lg">
                The frontend of this website is designed using React (Typescript), Tailwind, and Framer Motion.
                The end user (you!) is able to authenticate through the Spotify API's
                Auth0 flow, and the backend retrieves that information from Spotify
                to provide you with insights about your music.
              </p>
            </div>
          </SlideIn>
        </div>
      </div>
    </div>
  )
}

export default Home;