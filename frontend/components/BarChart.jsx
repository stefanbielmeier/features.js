import React from "react";

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  VerticalBarSeries,
  LabelSeries,
} from "react-vis";

const MSEC_DAILY = 86400000;

const timestamp = new Date("Feb 01 2022").getTime();

const data = [
    { x: timestamp + MSEC_DAILY, y: 3 },
    { x: timestamp + MSEC_DAILY * 2, y: 24 },
]

export default function BarChart() {

  return (
      <XYPlot xType="time" width={450} height={300}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="Day" />
        <YAxis title="Number of User Actions" />
        <VerticalBarSeries data={data} />
    </XYPlot>
  );

};
