import React, {useState, useEffect, useCallback} from "react";
import { supabase } from "../consts/consts";
import AsyncSelect from "react-select/async";

const getUniqueData = (data) => {
  /* 
    Takes: array of objects of form {origin: "someorigin"}    
    Outputs: unique objects in the data as an array
     */

    var uniqueOrigins = new Array();
    var uniqueTracker = new Set();

  for (let datapoint of data) {
    if (!uniqueTracker.has(datapoint.origin)) {
      uniqueTracker.add(datapoint.origin);
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
      .ilike('origin', "%"+inputValue+"%")

    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      return getUniqueData(data);
    }
  } catch (error) {
    alert(error.message);
    return null
  }
};

export default function SourceSelector() {
  const [inputValue, setValue] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleInputChange = value => {
    setValue(value);
  };
 
  // handle selection
  const handleChange = value => {
    setSelectedValue(value);
  }

  return (
    <div className="grid gap-4">
      <div>
        <p className="">Select your App URL to display your data</p>
      </div>
      <div className="col-span-5">
        <AsyncSelect 
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={e => e.origin}
        getOptionValue={e => e.origin}
        loadOptions={getUniqueOrigins}
        onInputChange={handleInputChange}
        onChange={handleChange}
        />
      </div>
    </div>
  );
}
