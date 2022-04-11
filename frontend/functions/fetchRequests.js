import React from "react";
import { supabase } from "../consts/consts";

export const getUniqueOrigins = (requests) => {
  /* 
      Takes: array of objects of form {origin: "someorigin"}    
      Outputs: unique objects in the data as an array
       */

  var uniqueOrigins = new Array();
  var uniqueUrls = new Set();

  for (let request of requests) {
    if (!uniqueUrls.has(request.origin)) {
      uniqueUrls.add(request.origin);
      uniqueOrigins.push(request);
    }
  }
  return uniqueOrigins;
};

export const fetchOrigins = async (sourceURL) => {
  try {
    let {
      data: requests,
      error,
      status,
    } = await supabase
      .from("requests")
      .select("origin")
      .ilike("origin", "%" + sourceURL + "%");

    if (error && status !== 406) {
      throw error;
    }
    if (requests) {
      return getUniqueOrigins(requests);
    }
  } catch (error) {
    alert(error.message);
    return null;
  }
};
