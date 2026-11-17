import '@aws-amplify/ui-react/styles.css';
import React from 'react'
import { AppProps } from './types/types';
import { BrowserRouter, Route, Routes } from 'react-router';
import { AppLayout } from './layout/AppLayout';
import { ParkingDashboard } from './screens/ParkingDashboard';

export function App({ user, signOut}: AppProps) {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout user={user} signOut={signOut}/>}>
            <Route path='/' element={<ParkingDashboard />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  )
}
