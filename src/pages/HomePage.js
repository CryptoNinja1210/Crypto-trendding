import React from 'react';
import Banner from '../components/Homepage/Banner';
import Carousel from '../components/Homepage/Carousel';
import CoinsTable from '../components/Homepage/CoinsTable';

const HomePage = () => {
  return (
    <div>
      <Banner/>
      <Carousel/>
      <hr style={{color:"white"}}/>
      <CoinsTable/>
    </div>
  )
}

export default HomePage