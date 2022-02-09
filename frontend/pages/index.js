import React from 'react'
import Head from 'next/head'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2'


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Features.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title font-bold">
          Welcome to Features.js! 
        </h1>

        <p className="description">
          See which features users use
        </p>
      
        <div className="grid text-left">
          <div className="card">
            <Bar data={data} ></Bar>
            <p className='font-bold text-left'>
              POST create-snippet
            </p> 
          </div>  
        </div>
      </main>

      <footer>
        <a
          href="https://github.com/stefanbielmeier"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by Stefan Bielmeier{' '}
        </a>
      </footer>
    </div>
  )
}
