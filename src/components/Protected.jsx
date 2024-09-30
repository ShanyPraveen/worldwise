/* eslint-disable react/prop-types */

import { useEffect } from 'react'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function Protected({children}) {
  const {isAuthenticated} = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAuthenticated) navigate('/login')
  }, [isAuthenticated]);

  return isAuthenticated ? children : null
}
