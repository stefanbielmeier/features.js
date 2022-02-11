import React, {useEffect, useState} from "react";

import { createClient } from '@supabase/supabase-js'

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  VerticalBarSeries,
} from "react-vis";

const MSEC_DAILY = 86400000;

const timestamp = new Date("Feb 01 2022").getTime()

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
    console.log(rawData)
    
    var counter = new Map()

    for (let request of rawData) {
        const date = getDay(request.unix_timestamp)

        if (counter.has(date)) {
            var currentVal = counter.get(date)
            counter.set(date, {x: currentVal.x, y: currentVal.y + 1})
        }
        if (!counter.has(date)) {
            const newDay = {x: date, y: 1}
            console.log("not in ocunter")
            counter.set(date, newDay)
        }
    }
    const output = Array.from(counter.values());
    console.log("putput", output)
    return output
}

const SUPABASE_URL = "https://gvazgvbsrhzxpcadfzcb.supabase.co"

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(SUPABASE_URL, supabaseKey)



const fetchFromBackend = async (setData) => {
    try {
        let { data, error, status } = await supabase
            .from('requests')
            .select('*')
    
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
            console.log("log", data)
            const mappedData = mapData(data)
            setData(mappedData)
        }
    } catch (error) {
        alert(error.message)
    }
}

export default function BarChart() {

    const [data, setData] = useState(null)

    useEffect(() => {
        fetchFromBackend(setData)
    },[])

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
