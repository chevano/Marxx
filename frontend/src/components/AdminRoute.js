import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

export default function AdminRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;

  // Once the user is signed-in and is also an admin,
  // they can visit the enclose page
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}
