import {combineReducers, legacy_createStore} from "redux";
import {taskReducer} from "./taskReducer";
import {todolistReducer} from "./todolistReducer";

const rootReducer = combineReducers({tasks:taskReducer,todolists:todolistReducer});
export type AppRootState = ReturnType<typeof rootReducer>;
export const store = legacy_createStore(rootReducer);