import { supabase } from "../consts/consts";

export const getUnique = (origins) => {
  /* 
      Takes: array of objects of form {origin: "someorigin"}    
      Outputs: unique objects in the data as an array
       */

  var uniqueOrigins = new Array();
  var uniqueUrls = new Set();

  for (let origins of origins) {
    if (!uniqueUrls.has(origins.origin)) {
      uniqueUrls.add(origins.origin);
      uniqueOrigins.push(origins);
    }
  }
  return uniqueOrigins;
};

export const fetchOrigins = async (sourceURL) => {
  // Param: 
    // sourceURL: string, the sourceURL to fetch unique origins for 
  // Output: array of unique origins. Form: {origin: "URL"}
  
    try {
    let {
      data: matchedOrigins,
      error,
      status,
    } = await supabase
      .from("requests")
      .select("origin")
      .ilike("origin", "%" + sourceURL + "%");

    if (error && status !== 406) {
      throw error;
    }
    if (matchedOrigins) {
      return getUnique(matchedOrigins);
    }
  } catch (error) {
    alert(error.message);
    return null;
  }
};
