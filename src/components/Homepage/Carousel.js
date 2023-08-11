import axios from "axios";
import { Link } from "react-router-dom";
import { Crypto } from "../../CryptoContext";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import React ,{ useEffect, useState, useContext } from "react";
import { Container, Spinner } from "react-bootstrap";


export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {

    const [ trending, setTrending ] = useState([]);
    const { currency, symbol } = useContext(Crypto);

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };

    let carousel = {
      height: "100%",
      display: "flex",
      alignItems: "center",
      width:"75vw",
      margin:"auto",
    }

    let carouselItem = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
      textDecoration: "none"
    }

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);



  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coins/${coin.id}`} style={carouselItem}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
          className="carouselImg"
        />
        <span className="coinName">
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
            className="profit"
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }} className="currentPrice">
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div className="carouselDiv" style={{minHeight:"20vh",margin:"auto",display: "flex"}}>
      {
        trending.length < 1  ? <Container className='d-flex justify-content-center m-auto'><Spinner animation="border" className='coinInfoSpinner my-4' variant="warning" size="lg" style={{height:"200px",width:"200px"}}/></Container> 
        :
        <div style={carousel} className="carousel">
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
          />
      </div>
      }
    </div>
  );
};

export default Carousel;




