import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import ChartArea from "./ChartArea";
import { fetchOrigins } from "../functions/fetchOrigins";

export default function SourceSelector() {
  const [input, setInput] = useState(null);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="grid">
        <div className="w-96">
          <AsyncSelect
            cacheOptions
            defaultOptions
            value={selected}
            getOptionLabel={(e) => e.origin}
            getOptionValue={(e) => e.origin}
            loadOptions={fetchOrigins}
            onInputChange={(value) => setInput(value)}
            onChange={(value) => setSelected(value)}
          />
        </div>
      </div>
      <ChartArea origin={selected && selected.origin} />
    </>
  );
}
