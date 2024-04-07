import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { legacy_createStore as createStore } from "redux";
import allReducers from "./components/reducers";
import { Provider } from "react-redux";
// import { Spin } from "antd"
// import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import useAxiosLoader from "./components/utils/AxiosLoader";
const persistConfig = {
  key: "root",
  storage,

};

const persistedReducer = persistReducer(persistConfig, allReducers);
const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));
// const AppContainer = () => {
//   const { loading } = useAxiosLoader();

//   return (
//     <>
//       <Spin
//         tip="Loading..."
//         style={{ top: "18%", fontSize: "40px", color: "#1BA397" }}
//         fullscreen={"true"}
//         size="large"
//         spinning={loading}
//         delay={100}
//       >
//         <div className="relative">
//           <App />
//         </div>
//       </Spin>
//     </>
//   );
// };
root.render(
  // <React.StrictMode>
  // <React.StrictMode>
  <Router>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
      </PersistGate>
    </Provider>
  </Router>,
  // </React.StrictMode>,
  // document.getElementById("root")
  // </React.StrictMode>
);
reportWebVitals();
