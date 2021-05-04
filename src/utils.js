export const pathGet = (arr1, query) => {
    // TASK 1: 
    // Write a function that searches through the input array / object
    // and returns the appropriate string path leading to the input query, if found
    // Example:
    // const a = {
    //    user: {
    //      id: 1,
    //      name: {
    //        firstName: "James",
    //        lastName: "Ibori"
    //      },
    //      location: {
    //        city: "Ikoyi",
    //        state: "Lagos",
    //        address: "One expensive house like that"
    //      }
    //    }
    // }
    // `pathGet(a, 'One expensive house like that')` = "a.user.location.address"
    // `pathGet(a, 'James')` = "a.user.name.firstName"
  
    // ============== CODE GOES BELOW THIS LINE :) ==============
  
    if(arr1 instanceof Array) {
      return arr1.map(obj => {
        return getPath(obj, query)
      })
    }
    else {
      return getPath(arr1, query)
    }
  }
  
  const getPath = (obj, query) => {
    obj = JSON.parse(JSON.stringify(obj).toLowerCase());
    const keys = Object.keys(obj);
    let path = '';
    for (let key of keys) {
      if(!obj[key]) continue
      if(typeof obj[key] !== 'object') {
        if(String(obj[key]).includes(query)) {
          path+=key
          return path;
        }
        else {
          continue
        }
      }
      else {
        let result = checkQuery(obj[key], query);
        if(result) path +=  key + '.' + getPath(obj[key], query);
        else path += getPath(obj[key], query); 
      }
    }
    return path
  }
  const checkQuery = (obj, query) => {
    obj = JSON.parse(JSON.stringify(obj).toLowerCase());
    const keys = Object.keys(obj);
    let result = false
    for (let key of keys) {
      if(!obj[key]) continue
      if(typeof obj[key] !== 'object') {
        if(String(obj[key]).includes(query)) {
          return true
        }
        else {
          continue
        }
      }
      else {
        result = checkQuery(obj[key], query);
      }
    }
    return result;
  }