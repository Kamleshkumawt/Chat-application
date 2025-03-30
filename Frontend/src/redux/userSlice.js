import {createSlice} from '@reduxjs/toolkit';


const useSlice = createSlice({
    name: 'user',
    initialState: {
        authUser: null,
        selectedUser: null,
        selectedUserGroup: null,
        searchQuery: "",
        onlineUsers: null,
        loading: false,
        error: null,
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            state.user = null;
        },
        setSelectedUser:(state, action) => {
            state.selectedUser = action.payload;
        },
        setSearchQuery:(state, action) => {
            state.searchQuery = action.payload;
        },
        setOnlineUsers:(state, action) => {
            state.onlineUsers = action.payload;
        },
        setSelectedUserGroup:(state, action) => {
            state.selectedUserGroup = action.payload;
        },
    },
});

export const {setUser, setAuthUser, setLoading, setError, setSelectedUser,setSearchQuery,setOnlineUsers, setSelectedUserGroup } = useSlice.actions;

export default useSlice.reducer;