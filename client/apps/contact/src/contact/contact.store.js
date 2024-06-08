import { configureStore } from "@reduxjs/toolkit";
import { signUpFormReducer } from "./contact.slice";

export const signUpFormStore = configureStore({
    reducer: {
        signUpForm: signUpFormReducer
    }
})