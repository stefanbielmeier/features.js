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

      <main className="grid py-6 px-4 sm:p-6 md:py-10 md:px-8 gap-3">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Features.js!
          </h1>
          <p className="text-black-600 font-bold">
            See which features users use based on your API requests
          </p>
          <p className='underline'>How it works</p>
          <p className="text-gray-600"> 1) Download the service worker file
          {//intentional space
          ` `}
          <a
            download="features.js"
            href="https://gitfront.io/r/user-2510782/vyz22we5g3cL/features.js/raw/script/features.js"
            className="underline"
            >
            features.js
          </a>
          </p>
          <p className="text-gray-600"> 2) Put it in the public folder of your React or NextJS App</p>
          <p className="text-gray-600"> 3) Add the script to your app's head: </p>
          <p className="text-gray-400 font-semibold">Index.html for React: <span className='font-normal hover:text-blue-600'>{`<script src="%PUBLIC_URL%/features.js"></script>`}</span></p>
          <p className='text-gray-400 font-semibold'>{`<Head></Head>`} component for NextJS: <span className='font-normal hover:text-blue-600'> {`<script src="/features.js"></script>`}</span></p>
          <p className='text-gray-400 whitespace-normal'>Disclaimer: if you send headers via URL parameters to your backend, this may not work as well as expected </p>
        </div>
        <div className="mt-6">
          <SourceSelector />
        </div>
      </main>

    </div>
  );
}
