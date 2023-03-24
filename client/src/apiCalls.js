import axios from 'axios'
export const loginCall = async (userCredentials, dispatch) => {

    dispatch({ type: "LOGIN_START" })
    try {
        const res = await axios.post("auth/login", userCredentials)
        if (res.data.code === 0) {
            dispatch({ type: "LOGIN_FAILURE", payload: alert("Invalid Credentials") })
        }
        else {
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.msg })
        }
    } catch (error) {
        dispatch({ type: "LOGIN_FAILURE", payload: error })
    }
}