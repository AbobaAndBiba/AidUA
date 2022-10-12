import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {rootReducer} from "./reducers";
import {useDispatch} from "react-redux";

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();