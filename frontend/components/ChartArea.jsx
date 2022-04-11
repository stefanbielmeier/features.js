import React, { useEffect, useState } from "react";

import Select from "react-select";
import { fetchUnique } from "../functions/fetchTargets";
import ChartBox from "./ChartBox";

export default function ChartArea({ origin }) {
  const [targets, setTargets] = useState(null);
  const [tlds, setTlds] = useState(null);

  const [input, setInput] = useState(null);
  const [selected, setSelected] = useState(null);
  
  const [trigger, setTrigger] = useState(false);
  
  useEffect(() => {
    fetchUnique(origin, setTargets, setTlds);
  }, [origin]);

  const selectedTlds = selected && selected.map((tldObj) => tldObj.tld);

  return (
    <div className="text-left">
      {!origin ? (
        <p className="text-gray-400 text-left">
          Select your App's URL to display data
        </p>
      ) : (
        <div className="grid">
          {targets && (
            <div className="flex justify-between mt-5 mb-5">
              <div className="w-96">
                <Select
                  options={tlds}
                  cacheOptions
                  isMulti={true}
                  defaultOptions
                  placeholder={'Select API domains to display data'}
                  value={selected}
                  getOptionLabel={(obj) => obj.tld}
                  getOptionValue={(obj) => obj.tld}
                  onInputChange={(value) => setInput(value)}
                  onChange={(value) => setSelected(value)}
                  isSearchable={true}
                  />
              </div>
              <button
                className="bg-[#1f9399] hover:bg-[#1e9500] text-white font-bold py-2 px-4 rounded"
                onClick={() => setTrigger(true)}
              >
                Refresh data
              </button>
            </div>
          )}
          <div className="grid grid-flow-rows 2xl:grid-cols-3 grid-cols-1 lg:grid-cols-2 text-left gap-10">
            {
              // I want to display the data for the selected tlds here. I need to filter the requests array by the selected tlds. I need to check the url of each request to see if it includes the selected tlds
              targets && selectedTlds && 
                targets
                  .filter((request) =>
                    selectedTlds.includes(request.url.split("/")[2])
                  )
                  .map((request) => (
                    <ChartBox origin={origin} request={request} trigger={trigger}/>
                  ))
            }
          </div>
        </div>
      )}
    </div>
  );
}
