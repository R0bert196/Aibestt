import React from 'react'
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import { useAtom } from 'jotai';
import state from '../state';


function DashOrHome({setLogout}) {
    
   const [token] = useAtom(state.token)
   console.log(state.token)
  return token? <Dashboard setLogout={setLogout}/> : <HomePage /> 
}

export default DashOrHome