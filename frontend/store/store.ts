import { createStore, applyMiddleware } from "redux";
import {configureStore, ConfigureStoreOptions} from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../store/reducers/rootReducer";

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

// creating store
const config: ConfigureStoreOptions = {
    reducer: rootReducer,
    middleware: middleware,
}
export const store = configureStore(config)

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);