import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./Components/Home/Home";
import HomeDashboard from "./Components/Dashboard/Home/Home";
import Landing from "./Components/Documentation/Landing/Landing";
import Plans from "./Components/Subscription/Plans/Plans";
import Signup from "./Components/Signup/Signup";
import VerifyEmail from "./Components/Signup/VerifyEmail";
import Login from "./Components/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Home />,
  },
  {
    path: "/dashboard",
    element: <HomeDashboard />,
  },
  {
    path: "/dashboard/",
    element: <HomeDashboard />,
  },
  {
    path: "/docs",
    element: <Landing />,
  },
  {
    path: "/plans",
    element: <Plans />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/checkEmail",
    element: <VerifyEmail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard/keeper",
    element: <HomeDashboard />,
  },
  {
    path: "/dashboard/billing",
    element: <HomeDashboard />,
  },
]);

function App() {
  return (
    <div className="App">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
