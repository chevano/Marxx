import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

// Note props.children is a special prop that represents the content passed between
// the opening and closing tags of a component.

export default function ProtectedRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;

  // Once the user is signed-in, they can visit the enclose page
  return userInfo ? children : <Navigate to="/signin" />;
}
