import React from 'react'
import Head from "next/head";
import BarChart from '../components/BarChart';

export default function Home() {

  return (
    <div className="container">
      <Head>
        <title>Features.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title font-bold">Welcome to Features.js!</h1>

        <p className="description">See which features users use</p>

        <div className="grid text-left">
          <div className="card">
            <p className="font-bold text-left">POST create-snippet</p>
            <BarChart origin={"http://localhost:3000/"} url={"https://quiet-oasis-59352.herokuapp.com/api/reports/search/"} method={"GET"}/>
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://github.com/stefanbielmeier"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by Stefan Bielmeier{" "}
        </a>
      </footer>
    </div>
  );
}
