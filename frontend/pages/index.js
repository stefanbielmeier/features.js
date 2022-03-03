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
          <p>How it works</p>
          <p className="text-gray-600"> 1) Download the service worker file
          {//intentional space
          ` `}
          <a
            download="features.js"
            href="https://gitfront.io/r/user-6550251/0d193ab03208ad91f6ad7a0da03148448cf27ecf/features.js/raw/script/features.js"
            className="underline"
            >
            features.js
          </a>
          </p>
          <p className="text-gray-600"> 2) Put it in the public folder of your React App</p>
          <p className="text-gray-600"> 3) Start tracking below</p>
        </div>
        <div className="mt-6">
          <SourceSelector />
        </div>
      </main>

      <footer className="grid py-6 px-4 sm:p-6 md:py-10 md:px-8">
        <a
          href="https://github.com/stefanbielmeier"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400"
        >
          Built by Stefan Bielmeier
        </a>
      </footer>
    </div>
  );
}
