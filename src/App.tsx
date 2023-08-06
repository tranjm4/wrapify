import { useState } from "react";
import { Route, createBrowserRouter, createRoutesFromElements, Link, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Wrapped from "./components/Wrapped";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/wrapped" element={<Wrapped />} />

      </Route>

    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

const Root = () => {
  return (
    <div className="flex flex-col items-center h-screen w-screen selection:bg-primary selection:text-black">
      <div className="w-full h-fit mx-5 flex justify-center fixed z-10 top-0 bg-background shadow-lg">
        <Link to="/" className="px-5 py-8 h-full w-full text-center text-primary text-2xl font-bold 
                              hover:text-black duration-300 hover:bg-primary">
          Home
        </Link>
        <Link to="/wrapped" className="px-5 py-8 h-full w-full text-center text-primary text-2xl font-bold 
                                     hover:text-black duration-300 hover:bg-primary">
          Wrapped
        </Link>
      </div>
      <div className="h-fit w-full">
        <Outlet />
      </div>
    </div>
  )
}

export default App
