import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import HomeDashboard from "./Components/Dashboard/Home/Home";
import Landing from "./Components/Documentation/Landing/Landing";

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
    path: "/docs",
    element: <Landing />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
