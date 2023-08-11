import React from 'react';

const Banner = () => {
  return (
    <div className="banner text-light d-flex flex-column justify-content-center" style={{minHeight:"250px"}}>
      <div className='w-75 m-auto bannerDiv'>
        <h1 style={{fontSize:"50px",marginBottom:"20px"}} className="heading">CryptoSwitch</h1>
        <p className='subHeading'>Get All The Info Regarding Your Favourite Crypto Currency</p>
      </div>
    </div>
  )
}

export default Banner