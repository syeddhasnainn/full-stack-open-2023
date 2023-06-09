import {createContext, useContext, useReducer} from "react";

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, loggedInUser: action.payload };
        case 'LOGOUT':
            return { ...state, loggedInUser: null };
        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user, dispatch] = useReducer(userReducer, null)
    return(
        <UserContext.Provider value={[user, dispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserContext