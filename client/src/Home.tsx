import SlideIn from "./components/motions/SlideIn";
import VerticalBar from "./components/motions/VerticalBar";
import Appear from "./components/motions/Appear";

import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate("callback");
  }

  return (
    <div className="flex h-fit w-screen flex-col">

      {/* Title Section */}
      <div className="flex flex-col h-[100vh] justify-center items-center text-center">

        <Appear className="">
          <h1 className="text-7xl lg:text-9xl text-primary font-bold my-5 duration-500">
            Wrapify
          </h1>
          <h2 className="text-2xl lg:text-5xl text-primary font-bold my-5 duration-500">
            wrapped, wherever, whenever
          </h2>
          <h3 className="text-md text-primary text-center font-bold mb-5 duration-500">
            an independent student project
          </h3>
        </Appear>
        <button className="text-xl w-fit h-fit px-5 py-3 lg:px-10 lg:py-5 bg-primary border-4"
          onClick={() => {
            console.log("a");
            handleUserLogin();
          }}>
          Login
        </button>
      </div>

      {/* Description Section */}
      <div className="h-fit min-h-[100vh] w-full flex flex-col justify-evenly">

        {/* Description Entry */}
        <div className="w-full h-fit flex items-center overflow-hidden">
          <VerticalBar className="w-[10px] h-full bg-primary ml-10 md:ml-20 lg:ml-40 duration-500" />
          {/* Text Block */}
          <SlideIn className="flex flex-col justify-center h-fit w-[100%] my-5">
            <div className="h-fit text-primary mx-10 max-w-[800px] md:w-[50%] duration-500">
              <h1 className="text-4xl lg:text-6xl font-extrabold mb-5 duration-500">
                Why Wrapify?
              </h1>
              <p className="font-bold lg:text-2xl duration-500">
                Spotify releases its Spotify Wrapped at the end of each year - that's a large gap in
                time between each iteration. The goal of this is to provide a simplified insight into
                your current listening.
              </p>
            </div>
          </SlideIn>
        </div>

        {/* Description Entry */}
        <div className="w-full min-w-[300px] h-fit flex items-center overflow-hidden">
          <VerticalBar className="w-[10px] h-full bg-primary ml-10 md:ml-20 lg:ml-40 duration-500" />
          {/* Text Block */}
          <SlideIn className="flex flex-col justify-center h-fit w-[100%] my-5">
            <div className="h-fit text-primary mx-10 max-w-[800px] md:w-[50%] duration-500">
              <h1 className="text-4xl lg:text-6xl font-extrabold mb-5 duration-500">
                Behind the Scenes
              </h1>
              <p className="font-bold lg:text-2xl duration-500">
                The frontend of this website is designed using React (Typescript), Tailwind, and Framer Motion.
                The end user (you!) is able to authenticate through Spotify API's
                Auth0 flow, and the backend server retrieves that information from Spotify
                to provide you with insights about your music!
              </p>
            </div>
          </SlideIn>
        </div>
      </div>
    </div>
  )
}

export default Home;