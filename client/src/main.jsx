import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import App from './App'
import './index.css'
import {configureStore} from "@reduxjs/toolkit";
import globalReducer from "./state";

export const store = configureStore({
    reducer: {
        global: globalReducer
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
)
