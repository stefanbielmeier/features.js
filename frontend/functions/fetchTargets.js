import { supabase } from "../consts/consts";

export const getUniqueTargets = (requests) => {
  /* 
      Takes: array of objects of form {url: "someurl", method:"some method"}    
      Outputs: unique objects in the data as an array
       */

  var uniqueTargets = new Array();
  var uniqueTracker = new Set();

  for (let request of requests) {
    if (!uniqueTracker.has(request.url + request.method)) {
      uniqueTracker.add(request.url + request.method);
      uniqueTargets.push(request);
    }
  }
  return uniqueTargets;
};

export const getTLDs = (uniqueTargets) => {
    /*
    @Param: uniqueTargets: array of objects with unique request targets {url: "someurl", method:"GET/POST etc."}
    @Output: array of unique TLDs
    */

  var uniqueTlds = new Array();
  var uniqueTracker = new Set();

  for (let target of uniqueTargets) {
    const tld = target.url.split("/")[2];
    const tldObj = { tld: tld };

    if (!uniqueTracker.has(tld)) {
      uniqueTracker.add(tld);
      uniqueTlds.push(tldObj);
    }
  }
  return uniqueTlds;
};

export const fetchUnique = async (origin, setTargets, setTlds) => {
  /*
    @Param: 
        requestOrigin: string; 
        setTargets, setTlds: setter function from component
    @Return: 
        uniqueRequests: array of objects of unique requests from origin: {"someurl", method:"some method"}; 
        uniqueTargets: array of objects withunique targetURLs: {tld: "someurl"} 
    */

  try {
    let {
      data: requests,
      error,
      status,
    } = await supabase
      .from("requests")
      .select("url, method")
      .eq("origin", origin);

    if (error && status !== 406) {
      throw error;
    }

    if (requests) {
      const uniqueTargets = getUniqueTargets(requests);
      const uniqueTlds = getTLDs(uniqueTargets);
      setTargets(uniqueTargets);
      setTlds(uniqueTlds);
    }
  } catch (error) {
    alert(error.message);
  }
};
