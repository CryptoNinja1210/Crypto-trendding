import React, { useContext, useEffect, useState  } from 'react';
import { Table, Form, Button, Spinner, Container } from 'react-bootstrap';
import axios from 'axios';
import { Crypto } from '../../CryptoContext';
import { CoinList } from '../../config/api';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Carousel';

const CoinsTable = () => {

    const { currency, symbol } = useContext(Crypto);
    const [ coins, setCoins ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ search, setSearch ] = useState("");
    const [ currentPage, setCurrentPage ] = useState(1);
    const navigate = useNavigate(); 

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currency]);

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
    };

    const nextPage = () => {
        if(currentPage > 9){
            setCurrentPage(1);
        }
        else{
            setCurrentPage(currentPage+1);
        }
    }

    const prevPage = () => {
        if(currentPage === 1){
            setCurrentPage(10);
        }
        else{
            setCurrentPage(currentPage-1);
        }
    }

    return (
    <div style={{ textAlign : "center" , backgroundColor:"#212529"}}>
        <h2 className='py-2 text-light searchBarHeading'>Cryptocurrency Prizes by Market Cap</h2>
        <hr className='headingHr' style={{color:"white",margin:"10px auto",height:"5px",maxWidth:"75vw"}}/>
        <Form.Control type="text" className='w-75 m-auto searchBar' placeholder="Search For A Crypto Currency..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <div className='tableContainer'>
            {   
                loading ? <Container className='d-flex justify-content-center mt-4'><Spinner animation="border" className='m-auto tableSpinner' variant="warning" size="lg" style={{height:"200px",width:"200px"}} /></Container> 
                    :
                <div>
                    <Table className='w-75 m-auto mt-2 table'>
                        <thead style={{backgroundColor:"#ffd200",color:"black",border:"none"}}>
                            <tr>
                                <th className='tableHead'>Coin</th>
                                <th className='tableHead'>Price</th>
                                <th className='tableHead'>24hr Change</th>
                                <th className='tableHead'>Market Cap</th>
                            </tr>
                        </thead>
                        <tbody className='text-light'>
                            {   
                                handleSearch().slice(( currentPage - 1 ) * 10, ( currentPage - 1 ) * 10 + 10 ).map((row) => {
                                    const profit = row.price_change_percentage_24h > 0;
                                    return(
                                        <tr key={row.name} onClick={ () => navigate(`/coins/${row.id}`)} style={{cursor:"pointer"}} >
                                            <td className="tableCoin" style={{display:"flex",gap: 20,textAlign:"left"}} >
                                                <img className="tableCoinImg" src={row?.image} alt={row.name} height="50" style={{ marginBottom: 10}}/>
                                                <div className='coinDiv' style={{ display: "flex", flexDirection: "column" }}>
                                                    <span className='tableCoinSymbol' style={{textTransform: "uppercase",fontSize: "22px"}}>{row.symbol}</span>
                                                    <span className='tableCoinName' style={{ color: "darkgrey" }}>{row.name}</span>
                                                </div>
                                            </td>
                                            <td className='tableCoinPrice'>{symbol}{" "}{numberWithCommas(row.current_price.toFixed(2))}</td>
                                            <td className='tableCoinChange' style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red",fontWeight: 500}}>{profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%</td>
                                            <td className='tableCoinMar' >{symbol}{" "}{numberWithCommas(row.market_cap.toString().slice(0, -6))}M</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <div className="navigationDiv d-flex flex-row justify-content-around" style={{marginTop:"10px",marginBottom:"40px"}}>
                        <Button onClick={prevPage} style={{backgroundColor:"#ffd200",color:"black"}}>prev</Button>
                        <Button onClick={nextPage} style={{backgroundColor:"#ffd200",color:"black"}}>next</Button>
                        </div>
                </div>
            }
        </div>
    </div>
    )
}

export default CoinsTable;









