import { configureStore } from "@reduxjs/toolkit";
import {productReducer} from "./product.slice";

export const productStore = configureStore({
    reducer: {
        product: productReducer
    }
})