

import { combineReducers } from "@reduxjs/toolkit";
import { orderReducer } from "./orderReducer";

const rootReducer = combineReducers({
    order: orderReducer,
})


export default rootReducer;