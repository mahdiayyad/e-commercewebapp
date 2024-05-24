import React from 'react'
import { useAuth } from '../hooks/AuthProvider'

export const Dashboard = () => {
    const auth = useAuth();
    
  return (
    <div className="container" style={{ paddingLeft: "200px" }}>
        Welcome To Dashboard, {auth?.user?.firstName + ' ' + auth?.user?.lastName}
    </div>
  )
}
