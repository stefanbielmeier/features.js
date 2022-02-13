import React from "react";
import Head from "next/head";
import SourceSelector from "../components/SourceSelector";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Features.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title font-bold">Welcome to Features.js!</h1>

        <p className="description">
          See which features users use based on your API requests
        </p>
        <p className='text'>Installation: 1) Download </p> <a download="features.js" href='https://gitfront.io/r/user-3819279/8b7df2ee61d95fae0b838057f3c8a82fbe32dcf8/features.js/raw/script/features.js'>features.js</a>
        <p className='text'>
          2) Put it in the public folder of your React App 
        </p>
        <p className='text'>3) Start tracking
          below</p>

        <SourceSelector />
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
