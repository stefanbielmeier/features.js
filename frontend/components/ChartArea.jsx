import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";

import { supabase } from "../consts/consts";
import Select from "react-select";

const getUniqueRequests = (data) => {
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

const getUniqueTlds = (uniqueRequests) => {
  var uniqueTlds = new Array();
  var uniqueTracker = new Set();

  for (let request of uniqueRequests) {
    const tld = request.url.split("/")[2];
    const tldObj = { tld: tld };

    if (!uniqueTracker.has(tld)) {
      uniqueTracker.add(tld);
      uniqueTlds.push(tldObj);
    }
  }
  return uniqueTlds;
};

const fetchRequests = async (setRequests, setTlds, origin) => {
  try {
    let { data, error, status } = await supabase
      .from("requests")
      .select("url, method")
      .eq("origin", origin);

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      const uniqueRequests = getUniqueRequests(data);
      const uniqueTlds = getUniqueTlds(uniqueRequests);
      setRequests(uniqueRequests);
      setTlds(uniqueTlds);
    }
  } catch (error) {
    alert(error.message);
  }
};

export default function ChartArea({ origin }) {
  const [requests, setRequests] = useState(null);
  const [tlds, setTlds] = useState(null);

  const [trigger, setTrigger] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [inputValue, setInputValue] = useState(null);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  // handle selection
  const handleChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    fetchRequests(setRequests, setTlds, origin);
  }, [origin]);

  const selectedTlds = selectedValue && selectedValue.map((obj) => obj.tld);

  return (
    <div className="text-left">
      {!origin ? (
        <p className="text-gray-400 text-left">
          Select your App's URL to display data
        </p>
      ) : (
        <div className="grid">
          {requests && (
            <div className="flex justify-between mt-5 mb-5">
              <Select
                options={tlds}
                cacheOptions
                isMulti={true}
                defaultOptions
                value={selectedValue}
                getOptionLabel={(obj) => obj.tld}
                getOptionValue={(obj) => obj.tld}
                onInputChange={handleInputChange}
                onChange={handleChange}
                isSearchable={false}
              />
              <button
                class="bg-[#1f9399] hover:bg-[#1e9500] text-white font-bold py-2 px-4 rounded"
                onClick={() => setTrigger(true)}
              >
                Refresh data
              </button>
            </div>
          )}
          <div className="grid grid-flow-rows 2xl:grid-cols-3 grid-cols-1 lg:grid-cols-2 text-left gap-10">
            {
              // I want to display the data for the selected tlds here. I need to filter the requests array by the selected tlds. I need to check the url of each request to see if it includes the selected tlds
              requests && selectedTlds && 
                requests
                  .filter((request) =>
                    selectedTlds.includes(request.url.split("/")[2])
                  )
                  .map((request) => (
                    <div className="card hover:shadow-md rounded-lg bg-slate-200">
                      <p className="font-bold text-left p-5">
                        {request.method} {request.url.split("/").slice(3).join("/")}
                      </p>
                      <BarChart
                        origin={origin}
                        url={request.url}
                        method={request.method}
                        trigger={trigger}
                      />
                    </div>
                  ))
            }
          </div>
        </div>
      )}
    </div>
  );
}
