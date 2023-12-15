import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SettingsProvider from "./Contexts/SettingsContext";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
// import { SocketProvider } from "./Contexts/SocketContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div className="App">
    <React.StrictMode>
      <ReduxProvider store={store}>
        <SettingsProvider>
          <BrowserRouter>
            {/* <SocketProvider> */}
            <App />
            {/* </SocketProvider> */}
          </BrowserRouter>
        </SettingsProvider>
      </ReduxProvider>
    </React.StrictMode>
  </div>
);
