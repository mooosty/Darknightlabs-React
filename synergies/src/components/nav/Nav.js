import React from 'react'
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  return (
    <div className='nav-container'>
        {/* Test link to ensure router and links are working properly */}
        {/* <Link to="/about">About</Link> */}
        <div className='link-container'>
        <Link to="/">Home Page</Link>
        </div>
    </div>
  )
}
