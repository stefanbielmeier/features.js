import React, {useEffect, useState} from "react";

import {supabase} from '../consts/consts'

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  VerticalBarSeries,
} from "react-vis";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const getDay = (timestamp) => {
    const date = new Date(timestamp)
    return monthNames[date.getMonth()] + " " + date.getDate()
}

const mapData = (rawData) => {
    /*
    gets: Array of Objects ({id,  unix_timestamp in UTC})
    Returns: array of objects with {x: timestamp as a legible string, e.g. Feb 2 2022, y: count}
    */
    var counter = new Map()
    var today = new Date()
    
    //Create data objects for the last 30 days
    for (let i = -30; i <= 0; i++) {
        var priorDate = new Date(new Date().setDate(today.getDate() + i));
        var date = getDay(priorDate)
        counter.set(date, {x: i, y: 0})
    }
    //Assign event data to the objects
    for (let request of rawData) {
        const requestDate = getDay(request.unix_timestamp)
        if (counter.has(requestDate)) {
            var currentVal = counter.get(requestDate)
            counter.set(requestDate, {x: currentVal.x, y: currentVal.y + 1})
        }
    }

    const output = Array.from(counter.values());
    return output
}

const fetchFromBackend = async (setData, url, method, origin) => {
    try {
        let { data, error, status } = await supabase
            .from('requests')
            .select('unix_timestamp')
            .eq('url', url)
            .eq('origin', origin)
            .eq('method', method)
    
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
            const mappedData = mapData(data)
            setData(mappedData)
        }
    } catch (error) {
        alert(error.message)
    }
}

export default function BarChart({origin, url, method, trigger}) {

    const [data, setData] = useState(null)

    useEffect(() => {
        fetchFromBackend(setData, url, method, origin)
    },[origin, method, origin, trigger])

  return (
      <XYPlot xType="linear" width={450} height={300} xPadding={12} yPadding={10}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title={"Days from "+ monthNames[new Date().getMonth()] +" " +new Date().getDate()}/>
        <YAxis title="Number of User Actions" />
        <VerticalBarSeries data={data} />

    </XYPlot>
  );

};
