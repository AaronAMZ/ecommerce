import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/auth/login";

const emptyState = {
    id: "",
    token: "",
    fullName: "",
    email: "",
    isLogged: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState: JSON.parse(localStorage.getItem("sessionData")) ?? emptyState,
    reducers: {
        updateUserData(state, action) {
            const newUserData = action.payload;

            state.id = newUserData.id;
            state.fullName = newUserData.fullName;
            state.email = newUserData.email;
            
            const plainStateCopy = {...state}
            localStorage.setItem("sessionData", JSON.stringify(plainStateCopy));
        },

        updateToken(state, action) {
            const newToken = action.payload;

            state.token = newToken;

            const plainStateCopy = {...state}
            localStorage.setItem("sessionData", JSON.stringify(plainStateCopy));
        },

        startSession(state) {
            state.isLogged = true;

            const plainStateCopy = {...state}
            localStorage.setItem("sessionData", JSON.stringify(plainStateCopy));
        },

        reset() {
            // 1. Copiar el estado
            // 2. Modificar la copia del estado
            // 3. Retornar la nueva versión del estado
            localStorage.removeItem("sessionData");
            return emptyState;
        },
    },
});

// Para poder llevar a cabo actualizaciones se necesitan despachar acciones.
export const { updateUserData, updateToken, startSession, reset} = authSlice.actions;

export const startSessionThunk = 
({ email, password}) => 
async (dispatch) => {
    const sessionData = await login({ email, password });

    const userData = {
        id: sessionData.user.id, 
        fullName: `${sessionData.user.firstName} ${sessionData.user.lastName}`
    };
    console.log(sessionData)

    dispatch(updateUserData(userData));
    dispatch(updateToken(sessionData.token));
    dispatch(startSession());
}

export default authSlice.reducer;