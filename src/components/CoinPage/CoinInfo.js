import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { HistoricalChart } from "../../config/api";
import { Line } from "react-chartjs-2";
import { Button, Spinner, Container } from "react-bootstrap";
import { chartDays } from "../../config/data";
import { Crypto } from "../../CryptoContext";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';

const CoinInfo = () => {

  const { currency } = useContext(Crypto);
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag,setflag] = useState(false);
  const { id } = useParams();
  Chart.register(CategoryScale);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
      <div style={{minWidth: "70vw"}} className="CoinInfoDiv">
        {!historicData | flag===false ? (
          <Container className='d-flex justify-content-center mt-4'><Spinner animation="border" className='m-auto coinInfoSpinner' variant="warning" size="lg" style={{height:"200px",width:"200px"}}/></Container>
        ) : (
          <>
          <Line
            className="line"
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                    // fontSize:"10"
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
              style={{margin:"0px 30px"}}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around"
              }}
            >
              {chartDays.map((day) => (
                <Button 
                    key={day.value}
                    onClick={() => {setDays(day.value);
                        setflag(false);
                    }}
                    style={(day.value === days)?{backgroundColor:"#EEBC1D",color:"black",border: "1px solid #212529"}:{backgroundColor:"#212529",border:"1px solid #EEBC1D",color:"#EEBC1D"}}
                    className="timeBtn"
                >
                    {day.label}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
  );
};

export default CoinInfo;