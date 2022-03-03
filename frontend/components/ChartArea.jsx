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
      console.log(uniqueData)
      setCharts(uniqueData);
    }
  } catch (error) {
    alert(error.message);
  }
};

export default function ChartArea({ origin }) {
  const [charts, setCharts] = useState(null);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    getUniqueCharts(setCharts, origin);
    setTrigger(false)
  }, [origin, trigger]);

  return (
    <div className='text-left'>
      {!origin ? (<p className="text-gray-400 text-left">Select your App's URL to display data</p>)
      :
       ( 
      <div className='grid'>
        <div className="flex justify-end mt-5 mb-5">
          <button class="bg-[#1f9399] hover:bg-[#1e9500] text-white font-bold py-2 px-4 rounded" onClick={() => setTrigger(true)}>
            Refresh data
          </button>
        </div>
        <div className="grid grid-flow-rows 2xl:grid-cols-3 grid-cols-1 lg:grid-cols-2 text-left gap-10">
          {charts && charts.map((chart) => (
            <div className="card hover:shadow-md rounded-lg bg-slate-200">
              <p className="font-bold text-left p-5">{chart.method} {chart.url.split("/").slice(3).join("/")}</p>
              <BarChart
                origin={origin}
                url={chart.url}
                method={chart.method}
                trigger={trigger}
              />
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
    )
}
