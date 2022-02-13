import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../consts/consts";
import AsyncSelect from "react-select/async";
import ChartArea from "./ChartArea";

const getUniqueData = (data) => {
  /* 
    Takes: array of objects of form {origin: "someorigin"}    
    Outputs: unique objects in the data as an array
     */

  var uniqueOrigins = new Array();
  var uniqueUrls = new Set();

  for (let datapoint of data) {
    if (!uniqueUrls.has(datapoint.origin)) {
      uniqueUrls.add(datapoint.origin);
      uniqueOrigins.push(datapoint);
    }
  }
  return uniqueOrigins;
};

const getUniqueOrigins = async (inputValue) => {
  try {
    let { data, error, status } = await supabase
      .from("requests")
      .select("origin")
      .ilike("origin", "%" + inputValue + "%");

    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      return getUniqueData(data);
    }
  } catch (error) {
    alert(error.message);
    return null;
  }
};

export default function SourceSelector() {
  const [inputValue, setValue] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = (value) => {
    setValue(value);
  };

  // handle selection
  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="col-span-5">
          <AsyncSelect
            cacheOptions
            defaultOptions
            value={selectedValue}
            getOptionLabel={(e) => e.origin}
            getOptionValue={(e) => e.origin}
            loadOptions={getUniqueOrigins}
            onInputChange={handleInputChange}
            onChange={handleChange}
            className='w-full'
          />
        </div>
      </div>
      
      <ChartArea origin={selectedValue && selectedValue.origin} />
      
    </div>
  );
}
