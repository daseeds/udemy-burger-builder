import * as actions from "./actionsTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actions.AUTH_START,
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actions.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    };
};

export const authFailed = (error) => {
    return {
        type: actions.AUTH_FAILED,
        error: error,
    };
};

export const logout = () => {
    return {
        type: actions.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZE5x1dxbH64Hqdl1DYX0hGQgYFD4AnC4";
        if (!isSignup) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZE5x1dxbH64Hqdl1DYX0hGQgYFD4AnC4";
        }
        axios
            .post(url, authData)
            .then((response) => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(
                    authSuccess(response.data.idToken, response.data.localId)
                );
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch((err) => {
                console.log(err);
                dispatch(authFailed(err));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actions.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
            
        }
    }
}