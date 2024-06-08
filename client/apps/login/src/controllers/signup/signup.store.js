import { configureStore } from "@reduxjs/toolkit";
import { signUpFormReducer } from "./signup.slice";

export const signUpFormStore = configureStore({
    reducer: {
        signUpForm: signUpFormReducer
    }
})