import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Crypto } from "../CryptoContext";
import { SingleCoin } from '../config/api';
import parse from 'html-react-parser';
import CoinInfo from '../components/CoinPage/CoinInfo';
import { Container, Spinner } from 'react-bootstrap';

const CoinPage = () => {

  const { id } = useParams();
  const [ coin, setCoin ] = useState();
  const { currency, symbol } = useContext(Crypto);

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line
  },[])

  return (
    <div className="container d-flex flex-col text-center align-items-center p-0 m-0 text-light mt-4 coinPageDiv" style={{minWidth:"100vw", minHeight:"100%"}}>
      {
        !coin ?
          <Container className='d-flex justify-content-center m-auto'><Spinner animation="border" className='my-4 coinInfoSpinner' variant="warning" size="lg" style={{height:"200px",width:"200px"}}/></Container>
        : 
        <div className='sidebar align-items-center p-3' style={{width: "30vw",borderRight: "2px solid grey",minHeight:"80vh"}}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          style={{height:"200px",marginBottom:"20px"}}
          className="sidebarImg"
        />
        <h3 className="display-5 sidebarCoinName" style={{fontWeight:"500"}}>{coin?.name}</h3>
        <p style={{textAlign:"left",color:"#EEBC1D"}} className="sidebarCoinDesc">{parse(`${coin?.description.en.split(". ")[0]}`)}.</p>
        <div className='sidebarCoinInfo'>
          <span style={{ display: "flex" }}>
            <h5 className='sidebarCoinRank'>Rank : </h5>
            &nbsp; &nbsp;
            <h5 className='sidebarCoinRank'>{coin?.market_cap_rank}</h5>
          </span>
          <span style={{ display: "flex" }}>
            <h5 className='sidebarCoinPrice'>Current Price :</h5>
            &nbsp; &nbsp;
            <h5 className='sidebarCoinPrice'>{symbol}{" "}{coin?.market_data.current_price[currency.toLowerCase()]}</h5>
          </span>
          <span style={{ display: "flex" }}>
            <h5 className='sidebarCoinMarketCap'>Market Cap :</h5>
            &nbsp; &nbsp;
            <h5 className='sidebarCoinMarketCap'>{symbol}{" "}{coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)}M</h5>
          </span>
        </div>
      </div>
      }
      <hr className='coinInfoHr' style={{display:"none"}}/>
      <CoinInfo/>
    </div>
  )
}

export default CoinPage;