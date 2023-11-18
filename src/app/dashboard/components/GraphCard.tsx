import React, {useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
);

const GraphCard = (props: { itemName: string; title: string; valorSeg: number; valorTer: number; valorQua: number; valorQui: number; valorSex: number; valorSab: number; valorDom: number; }) => {

  const { itemName, title, valorSeg, valorTer, valorQua, valorQui, valorSex, valorSab, valorDom } = props;
  
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
      datasets: [
        {
          label: [itemName],
          data: [19, [valorTer], [valorQua], [valorQui], [valorSex], [valorSab], [valorDom]],
          backgroundColor: '#590BD8bb',
        }, 
      ],
    });

    setChartOptions({
      plugins: {
          legend: {
              position: 'top',
          },
          title: {
              display: true,
              text: [title]
          },
      },
      maintainAspectRatio: false,
      responsive: true
  });
  }, []);
  
  return (
    <>
      <div className='h-[50vh] p-4 border rounded-lg bg-white'>
        <Bar data={chartData} options={chartOptions} />
      </div> 
    </>
  );
};

export default GraphCard;