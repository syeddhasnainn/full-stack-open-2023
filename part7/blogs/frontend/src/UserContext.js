import { createContext, useReducer,useContext} from "react";

const initialState = {
    loggedInUser: null,
    username:'', 
    password: ''

}

const userReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, loggedInUser: action.payload };
        case 'LOGOUT':
            return { ...state, loggedInUser: null };
        case 'SET_USERNAME':
            return {...state, username: action.payload}
        case 'SET_PASSWORD':
            return {...state, password:action.payload}
        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
    const [user, dispatch] = useReducer(userReducer, initialState)
    return(
        <UserContext.Provider value={[user, dispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    return context
}

export default UserContext