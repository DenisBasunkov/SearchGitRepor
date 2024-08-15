import { configureStore } from '@reduxjs/toolkit'
import GitReposReduser from "./GitRepoSlice"

const store = configureStore({
    reducer: {
        repos: GitReposReduser
    },
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch