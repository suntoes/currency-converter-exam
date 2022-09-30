import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/",
  headers: {
    "Content-type": "application/json"
  }
});

async function getExchangeRate({from, to, callback}) {
  try {
    // in-function lowerCase() for the func to be not case-sensitive
    const res = await apiClient.get("/" + from?.toLowerCase() + "/" + to?.toLowerCase() + ".json")

    // return specific result rate
    callback(res?.data[to?.toLowerCase()])
  } catch (err) {
    callback(false)
  }
}

export async function recursiveGetAllRates(data, callback, logProcess=()=>{}, count=0) {
  // listener callback for recursion progress
  logProcess(count / data.length)

  // return callback function if finished
  if(count >= data.length) return callback(data)

  const reqCallback = async(res) => {
    if(!res) return callback(false)

    // modify data
    data[count] = {...data[count], rate: res}
    
    // recurse this function with incremented count
    await recursiveGetAllRates(data, callback, logProcess, count + 1)
  }

  await getExchangeRate({
    from: data[count]?.from?.currency,
    to: data[count]?.to?.currency,
    callback: reqCallback
  })
}