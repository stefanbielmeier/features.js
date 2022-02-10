import React from "react";

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

const data = [
    { x: timestamp + MSEC_DAILY, y: 3 },
    { x: timestamp + MSEC_DAILY * 3, y: 24 },
    { x: timestamp + MSEC_DAILY * 5, y: 30 },
    { x: timestamp + MSEC_DAILY * 8, y: 15 },
]

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const dataArr = data.map((d)=> {
    let date = new Date(d.x)
    let displDate = (monthNames[date.getMonth()]) + " " + date.getDate()  
    return {x: displDate, y: parseFloat(d.y)}
})  

console.log(dataArr)

export default function BarChart() {

  return (
      <XYPlot xType="ordinal" width={450} height={300}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="Day" />
        <YAxis title="Number of User Actions" />
        <VerticalBarSeries data={dataArr} />
    </XYPlot>
  );

};
