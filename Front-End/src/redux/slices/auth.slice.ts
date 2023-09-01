import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: null,
        refreshToken: null
        // Các thông tin người dùng khác có thể được lưu trữ ở đây
    },
    reducers: {
        login(state, action) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout(state) {
            state.accessToken = null;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;