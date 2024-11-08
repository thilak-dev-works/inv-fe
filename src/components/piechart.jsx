import * as React from 'react';
import { useEffect, useState } from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import axios from 'axios';

export default function PieChartFlow() {
  const [chartData, setChartData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://inv-be.vercel.app/v1/inventory/price-summary')
      .then(response => {
        const data = response.data;
        const inHand = data.overAllStockTotal;
        const toBeReceived = data.overAllStockToBeReceivedTotal;

        // Set chart data with the quantities in hand and to be received
        setChartData([
          { label: 'Quantity in hand', value: inHand, color: '#4caf50' },
          { label: 'Quantity to be received', value: toBeReceived, color: '#ffa726' }
        ]);

        // Calculate and set total stock value
        setTotalValue(data.overAllStockTotalPrice + data.overAllStockToBeReceivedTotalPrice);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' , marginTop: '-40px' }}>
       <div style={{ paddingLeft: '70px' }}> 
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.value}%`,
            arcLabelMinAngle: 35,
            arcLabelRadius: '60%',
            data: chartData.map(item => ({
              label: item.label,
              value: ((item.value / (chartData[0].value + chartData[1].value)) * 100).toFixed(0) // Convert to percentage
            })),
          },
        ]}
        width={250} // Smaller pie chart width
        height={250} // Smaller pie chart height
        slotProps={{ legend: { hidden: true } }}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: 'bold',
          },
        }}
      />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '-40px' ,paddingLeft: '50px', paddingRight: '50px'}}>
        {chartData.map((item, index) => (
          <div key={`chart${index}`} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 12px',
            width: '100%'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '12px',
                height: '12px',
                marginRight: '5px',
                borderRadius: '50%',
                backgroundColor: item.color
              }}></div>
              <div>{item.label}</div>
            </div>
            <div style={{
              backgroundColor: '#f0f0f0',
              padding: '4px 8px',
              borderRadius: '12px',
              fontWeight: 'bold'
            }}>{item.value}</div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: '15px',
        padding: '10px 20px',
        backgroundColor: '#f3f4fa',
        borderRadius: '20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#4A90E2', // Blue color for the total value text
        textAlign: 'center'
      }}>
        Total value of all stocks: <span style={{ color: '#4A90E2' }}>${totalValue.toLocaleString()}</span>
      </div>
    </div>
  );
}