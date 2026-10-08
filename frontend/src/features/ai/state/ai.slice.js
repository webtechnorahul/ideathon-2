import { createSlice } from "@reduxjs/toolkit";

const aiSlice = createSlice({
    name: "ai",
    initialState: {
        roadmaps: [],
        loading: true,
        error: null
    },

    reducers: {
        setRoadmaps: (state, action) => {
            state.roadmaps = action.payload;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const {setRoadmaps, setLoading, setError} = aiSlice.actions;
export default aiSlice.reducer;