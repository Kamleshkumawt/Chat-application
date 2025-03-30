import React,{useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/User.context'
import { useNavigate } from 'react-router-dom'


const UserAuth = ({children}) => {
    const {user} = useContext(UserContext)
    const [loading, setLoading] = useState(true) //true
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    
    // console.log('User:', user)
    useEffect(() => {
        if(user) {
            // navigate('/login')
            setLoading(false) //false
        }
    }, [user])


    useEffect(() => {

        if(!token && !user) {
            // window.location.href = '/login'
            navigate('/login')
        }

    }, [token, user,navigate])


    if(loading) {
        return <div>Loading...</div>
    }


  return (
    <> {children}</>
  )
}

export default UserAuth
