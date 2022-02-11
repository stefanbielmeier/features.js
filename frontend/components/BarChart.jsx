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
    return monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear()
}

const mapData = (rawData) => {
    /*
    gets: Array of Objects ({id,  unix_timestamp in UTC})
    Returns: array of objects with {x: timestamp as a legible string, e.g. Feb 2 2022, y: count}
    */
    var counter = new Map()

    for (let request of rawData) {
        const date = getDay(request.unix_timestamp)

        if (counter.has(date)) {
            var currentVal = counter.get(date)
            counter.set(date, {x: currentVal.x, y: currentVal.y + 1})
        }
        if (!counter.has(date)) {
            const newDay = {x: date, y: 1}
            counter.set(date, newDay)
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

export default function BarChart({origin, url, method}) {

    const [data, setData] = useState(null)

    useEffect(() => {
        fetchFromBackend(setData, url, method, origin)
    },[origin, method, origin])

  return (
      <XYPlot xType="ordinal" width={450} height={300}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="Day" />
        <YAxis title="Number of User Actions" />
        <VerticalBarSeries data={data} />
    </XYPlot>
  );

};
