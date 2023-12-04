'use client'

import React from 'react';
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

const GraphCard = () => {

  const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'FEEDBACK ANUAL DE AVALICAÇÕES',
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Negativas',
        data: [3, 8, 12, 5, 2, 9, 4, 13, 6, 3, 1, 7],
        backgroundColor: '#d33',
          borderRadius: 8,
      },
      {
        label: 'Positivas',
        data: [19, 5, 8, 12, 9, 2, 16, 23, 13, 4, 5, 10],
        backgroundColor: '#2a6',
          borderRadius: 8,
      },
    ],
  };
  
  return (
    <>
      <div className='h-[60vh] p-4 rounded-2xl bg-white dark:bg-darkBGLighter text-black dark:text-white'>
        <Bar options={options} data={data} />
      </div> 
    </>
  );
};

export default GraphCard;