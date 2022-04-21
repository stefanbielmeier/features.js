import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import ChartArea from "./ChartArea";
import { fetchOrigins } from "../functions/fetchOrigins";
import {Origin} from '../types/types';


export default function SourceSelector(): JSX.Element {
  const [input, setInput] = useState<string>(null);
  const [selected, setSelected] = useState<Origin>(null);

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
            onInputChange={(newVal) => setInput(newVal)}
            onChange={(value) => setSelected(value)}
          />
        </div>
      </div>
      {selected && <ChartArea origin={selected.origin} />}
    </>
  );
}
