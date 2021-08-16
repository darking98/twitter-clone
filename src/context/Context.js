import React, {useState} from 'react'
import {signInWithGoogle, auth, collection} from '../firebase/firebase'
 

export const UserContext = React.createContext();


const UserProvider = ({children}) => {

    const[user,setUser] = useState(() => auth.currentUser)

    const unsuscribe = auth.onAuthStateChanged(user => {
        if(user){
          setUser(user)
        }else{
          setUser(null)
        }
    })

    const handleSignIn = () => {
        signInWithGoogle()
    }

    return (
        <UserContext.Provider value={{handleSignIn,unsuscribe, user, collection}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
