// context/UserContext.js
import axios from 'axios';
import React, { createContext, useState } from 'react';

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    
    axios.defaults.withCredentials=true;
    axios.defaults.baseURL='http://192.168.0.111:3000'
    const [user, setUser] = useState(null);
  
    return (
        <UserContext.Provider value={{ user, setUser }}>
        {children}
        </UserContext.Provider>
    );

};