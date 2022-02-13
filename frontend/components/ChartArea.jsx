import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";

import {supabase} from '../consts/consts'

const getUniqueData = (data) => {
  /* 
    Takes: array of objects of form {url: "someurl", method:"some method"}    
    Outputs: unique objects in the data as an array
     */

  var uniqueRequests = new Array();
  var uniqueTracker = new Set();

  for (let datapoint of data) {
    if (!uniqueTracker.has(datapoint.url + datapoint.method)) {
      uniqueTracker.add(datapoint.url + datapoint.method);
      uniqueRequests.push(datapoint);
    }
  }
  return uniqueRequests;
};

const getUniqueCharts = async (setCharts, origin) => {
  try {
    let { data, error, status } = await supabase
      .from("requests")
      .select("url, method")
      .eq('origin', origin);

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      const uniqueData = getUniqueData(data);
      setCharts(uniqueData);
    }
  } catch (error) {
    alert(error.message);
  }
};

export default function ChartArea({ origin }) {
  const [charts, setCharts] = useState(null);

  useEffect(() => {
    getUniqueCharts(setCharts, origin);
    console.log(origin)
  }, [origin]);

  return (
    <>
      {!origin ? (<p className="">Select your App URL to display your data</p>)
      :
       ( 
      <div className="justify-center flex flex-wrap text-left">
        {charts && charts.map((chart) => (
          <div className="card basis-1/2">
            <p className="font-bold text-left">{chart.method} {chart.url.split("/").slice(3).join("/")}</p>
            <BarChart
              origin={origin}
              url={chart.url}
              method={chart.method}
            />
          </div>
        ))}
      </div>
      )}
    </>
    )
}
