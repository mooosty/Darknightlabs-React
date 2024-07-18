import React, { useContext } from 'react'
import Nav from '../components/nav/Nav'
import './Homepage.css'
import MainContainer from '../components/containers/MainContainer'



export default function Homepage() {

  return (
    <div className='homepage-bg'>
      <div className='nav-container'>
        <Nav />
      </div>
        <MainContainer />
    </div>
  )
};