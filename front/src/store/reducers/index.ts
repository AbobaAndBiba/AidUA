import {combineReducers} from "redux";
import {mapPointReducer} from "./mapPointReducer";


export const rootReducer = combineReducers({
  points: mapPointReducer
})

export type RootState = ReturnType<typeof rootReducer>