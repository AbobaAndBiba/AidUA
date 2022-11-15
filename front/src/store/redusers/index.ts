import {combineReducers} from "redux";
import {newsReducer} from "./newsReducer";
import {pointsReducer} from "./pointsReducer";


export const rootReducer = combineReducers({
  news: newsReducer,
  points: pointsReducer
})

export type RootState = ReturnType<typeof rootReducer>