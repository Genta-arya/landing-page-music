import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ReactGA from "react-ga4";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import KontakLayout from "./components/KontakLayout";
import NotFound from "./components/NotFound";
import AuthPage from "./Admin/Auth/Page";

import { Provider } from "react-redux";
import { store } from "./Redux/store";
import PageDashboard from "./Admin/Dashboard/Page";

ReactGA.initialize("G-1MLVJHR41Z");
ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
  },
 

  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/dashboard",
    element: <PageDashboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    ,
  </React.StrictMode>
);

reportWebVitals();
