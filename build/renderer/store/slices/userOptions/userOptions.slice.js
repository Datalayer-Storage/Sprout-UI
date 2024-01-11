import { createSlice } from '@reduxjs/toolkit';
import initialState from './userOptions.initialstate';
export const userOptionsSlice = createSlice({
    name: 'userOptions',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            if (state.selectedTheme === 'light') {
                state.selectedTheme = 'dark';
            }
            else {
                state.selectedTheme = 'light';
            }
        }
    },
});
export const { toggleTheme, } = userOptionsSlice.actions;
export default userOptionsSlice.reducer;
