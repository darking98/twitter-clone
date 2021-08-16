import React, { useContext, useEffect } from 'react'
import Aside from './Aside'
import {useHistory } from 'react-router-dom'
import TweetsContainer from './Tweets/TweetsContainer'
import { UserContext } from '../../context/Context'
import TweetDetail from './Tweets/TweetDetailContainer'
const Home = () => {
    const {user} = useContext(UserContext)
    const history = useHistory();
    useEffect(() => {
        if(!user){
            history.push('/login')
        }
    },[user])
    return (
        <div className="home">
            <Aside/>
            <TweetsContainer/>
            <Aside/>
        </div>
    )
}

export default Home
