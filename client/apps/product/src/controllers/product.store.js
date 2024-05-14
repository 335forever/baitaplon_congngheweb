import { configureStore } from "@reduxjs/toolkit";
import {productReducer} from "./poduct.slice";

export const productStore = configureStore({
    reducer: {
        product: productReducer
    }
})