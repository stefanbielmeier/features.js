import React from "react";
import BarChart from "./BarChart";

const getMethod = (request) => request.url.split("/").slice(3).join("/");

export default function ChartBox({ origin, request, trigger }) {
  return (
    <div className="card hover:shadow-md rounded-lg bg-slate-200">
      <p className="font-bold text-left p-5">
        {request.method} {getMethod(request)}
      </p>
      <BarChart
        origin={origin}
        url={request.url}
        method={request.method}
        trigger={trigger}
      />
    </div>
  );
}
