import { createContext, useReducer } from 'react'
import AuthReducer from './AuthReducer';
const INITIAL_STATE = {
    user: {
        _id: "641c16cde284af0e7e62f9ca",
        username: "Nane",
        email: "nane@gmail.com",
        profilePicture: "person/1.jpeg",
        coverProfile: "post/1.jpeg",
        isAdmin: false,
        desc: "This is done",
        city: "Birgunj",
        from: "Nepal",
        followers: [],
        followings: [],
        relationship: 2
    },
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}>
            {children}
        </AuthContext.Provider>
    )
}