import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

// const normalize = (v, v2) => Number.parseFloat(((v * v2) / 100).toFixed(2));

// const valueFormatter = (item) => `${item.value}%`;

export default function PieChartFlow({ chartdata = [] }) {  // Set default value for data
  const totalValue = chartdata?.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className='chart-container'>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.value}%`,
            arcLabelMinAngle: 35,
            arcLabelRadius: '60%',
            data: chartdata.length ? chartdata : [{ label: 'No data', value: 100 }],  // Fallback data
          },
        ]}
        width={400}
        height={200}
        slotProps={{ legend: { hidden: true } }} // Hide the legend
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: 'bold',
          },
        }}
      />
      <div className='chart-legend'>
        {chartdata.map((item, index) => {
          return (
            <div className='chart-legendcontent' key={`chart${index}`}>
              <div className='chart-bardata'>
                <div className='chart-legendbar' style={{ backgroundColor: `${item.color}` }}></div><div>{item.label}</div>
              </div>
              <div>{item.value}</div>
            </div>
          )
        })}

      </div>
      <div className='chart-totalcontent'>Total value of all stocks: ${totalValue}</div>
    </div>

  );
}
