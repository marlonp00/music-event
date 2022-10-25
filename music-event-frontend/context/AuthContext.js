import { createContext, useState } from "react";
import { NEXT_URL } from "../config";  

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

    // Register User
    const registerUser = async (user) => {
      console.log(user);
    }

    // Login User
    const loginUser = async ({email:identifier, password}) => {
      console.log({identifier, password});

      
      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
       body: JSON.stringify({identifier, password})
      })
      const data = await res.json();

      console.log("This:", data)
      
     if(res.ok) {
      setUser(data.user);
     }  else {
      setError(data.message);
     // setError(null);
     }   
    }
      // logout User
  const logoutUser = async () => {
    console.log("logout user");

  }
  // Check if user is logged in
  const checkUserLoggedIn = () => {
    console.log("Check");
  }

  return  (
    <AuthContext.Provider value={{user, error, registerUser, loginUser, logoutUser}}>
      {children}
    </AuthContext.Provider>
  ) 
}

export default AuthContext