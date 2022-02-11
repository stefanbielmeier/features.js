import React from "react";
import {supabase} from '../consts/consts'
import Async from 'react-select/async'


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

const getUniqueCharts = async (setCharts) => {
  try {
    let { data, error, status } = await supabase
      .from("requests")
      .select("url, method");

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

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

export default function SourceSelector() {
  
    return (
    <Select options={options} />
  )
}
