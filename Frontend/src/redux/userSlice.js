import {createSlice} from '@reduxjs/toolkit';


const useSlice = createSlice({
    name: 'user',
    initialState: {
        AllUsers: null,
        authUser: null,
        selectedUser: null,
        selectedUserGroup: null,
        searchQuery: "",
        searchChatQuery :"",
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
        setAllUsers:(state, action) => {
            state.AllUsers = action.payload;
        },
        setSearchChatQuery:(state, action) => {
            state.searchChatQuery = action.payload;
        },
    },
});

export const {setUser, setAuthUser, setLoading, setError, setAllUsers, setSelectedUser,setSearchQuery,setOnlineUsers, setSelectedUserGroup,setSearchChatQuery } = useSlice.actions;

export default useSlice.reducer;