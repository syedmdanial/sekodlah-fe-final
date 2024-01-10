import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./store/store";
import MainRoutes from "./routes/MainRoutes";
import "react-toastify/dist/ReactToastify.css";

import "./styles/index.scss";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer autoClose={2000} />
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <MainRoutes />
      </PersistGate>
    </Provider>
  </>
);
