import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { NotificationContextProvider } from "./NotificationContext";
import { QueryClient, QueryClientProvider } from "react-query";
import UserContext, { UserContextProvider } from "./UserContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users"

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <UserContextProvider>
      <NotificationContextProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </QueryClientProvider>
      </NotificationContextProvider>
    </UserContextProvider>
  </Router>
);
