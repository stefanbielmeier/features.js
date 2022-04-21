import { supabase } from "../consts/consts";

interface Origin {
  origin: string;
}

export const getUnique = (origins: Origin[]): Origin[] => {
  /* 
      Takes: array of objects of form {origin: "someorigin"}    
      Outputs: unique objects in the data as an array
       */

  var uniqueOrigins = new Array();
  var uniqueUrls = new Set();

  for (let origin of origins) {
    if (!uniqueUrls.has(origin.origin)) {
      uniqueUrls.add(origin.origin);
      uniqueOrigins.push(origin);
    }
  }
  return uniqueOrigins;
};

export const fetchOrigins = async (sourceURL: string): Promise<Origin[]> => {
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
