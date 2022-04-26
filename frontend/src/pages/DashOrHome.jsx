import React from 'react'
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import { useAtom } from 'jotai';
import state from '../state';


function DashOrHome({component}) {
    
  const [token] = useAtom(state.token)
  return token? <Dashboard component={component}/> : <HomePage /> 
}

export default DashOrHome