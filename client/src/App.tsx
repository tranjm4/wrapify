import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Callback from "./Callback";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/callback" element={<Callback />} />

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
      <Outlet />
    </div>
  )
}

export default App
