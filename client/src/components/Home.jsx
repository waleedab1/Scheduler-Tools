import React from 'react'
import { Link } from 'react-router-dom';

import { AiOutlineDownload } from 'react-icons/ai';
import { IoCreateOutline } from 'react-icons/io5';

import './styles/Home.css';

const Home = () => {
  return (
    <div className='home-page-wrapper'>
      <div className='home-page-side1'>
        <Link to="/export-schedule" className='home-page-link'>
          <div className='home-page-icon1'>
            <AiOutlineDownload size='300px' />
            <h1 className='home-page-text1'>Export</h1>
          </div>
        </Link>
      </div>
      <div className='home-page-side2'>
        <Link to="/create-schedule" className='home-page-link'>
          <div className='home-page-icon2'>
            <IoCreateOutline size='300px' />
            <h1 className='home-page-text2'>Create</h1>
          </div>
        </Link >
      </div>
    </div>
  )
}

export default Home
