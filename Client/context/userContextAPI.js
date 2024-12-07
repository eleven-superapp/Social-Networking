// context/UserContext.js
import axios from 'axios';
import React, {createContext, useState} from 'react';
import {IP} from '../constants/constants';

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};
