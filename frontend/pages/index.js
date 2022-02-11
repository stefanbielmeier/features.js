import React, { useEffect, useState } from 'react'
import Head from "next/head";
import ChartArea from '../components/ChartArea'

const origin = "http://localhost:3000/"

export default function Home() {

  return (
    <div className="container">
      <Head>
        <title>Features.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title font-bold">Welcome to Features.js!</h1>

        <p className="description">See which features users use based on your API requests</p>
        <ChartArea origin={origin}/>
        
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
