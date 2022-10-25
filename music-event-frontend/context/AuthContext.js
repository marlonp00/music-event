import { createContext, useState } from "react";
import { API_URL } from "../config";  

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
      /*
      const req = await fetch(`${API_URL}/api/auth/local`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
      },
        body: {"identifier": identifier, "password" : password}

      }).then();
      const data = await req.json();
      return console.log(data); */
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
