import { createSlice } from "@reduxjs/toolkit";
import * as signUpFormReducers from "./contact.reducer"

const signUpFormSlice = createSlice({
    name: "signUpForm",
    initialState: { vaildPassword: true, isValid: false },
    reducers: {
        ...signUpFormReducers
    }
});

export const { actions: signUpFormActions, reducer: signUpFormReducer } = signUpFormSlice