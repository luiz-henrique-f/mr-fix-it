'use client'

import React, {useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Colors } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  Colors
);

const GraphCard = (props: { itemName: string; itemName2: string; title: string; }) => {

  const { itemName, itemName2, title } = props;
  
  
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [
        {
          label: [itemName2],
          data: [3, 8, 12, 5, 2, 9, 4, 13, 6, 3, 1, 7],
          backgroundColor: '#d33',
          borderRadius: 8,
        }, 
        {
          label: [itemName],
          data: [19, 5, 8, 12, 9, 2, 16, 23, 13, 4, 5, 10],
          backgroundColor: '#2a6',
          borderRadius: 8,
        }, 
      ],
    });

    setChartOptions({
      plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#aaa',
              usePointStyle: true,
              pointStyle: 'circle',
            },
          },
          title: {
            display: true,
            text: [title],
            color: '#aaa',
          },
      },
      maintainAspectRatio: false,
      responsive: true
  });
  }, []);
  
  return (
    <>
      <div className='h-[60vh] p-4 rounded-2xl bg-white dark:bg-darkBGLighter text-black dark:text-white'>
        <Bar data={chartData} options={chartOptions} />
      </div> 
    </>
  );
};

export default GraphCard;