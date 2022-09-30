import React, {useEffect, useState} from "react"

import { Text, Heading, CircularProgress, Divider, useColorModeValue, Stack } from "@chakra-ui/react"

import Header from "./components/header";
import Page from "./components/page";
import CurrencyInput from "./components/currency-input";
import CurrencyGrid from "./components/currency-grid";
import Footer from "./components/footer";

import { currencyList, blankExchangeList, formatCurrency } from "./utils/currency";
import { recursiveGetAllRates } from "./utils/axios";
import { solveSubTaskOne } from "./utils/sub-task";

function App() {
  const [selectedCurrency, setSelectedCurrency] = useState(currencyList[0])
  const [exchangeList, setExchangeList] = useState([])
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const [input, setInput] = useState(1)
  const [selectedExchangeList, setSelectedExchangedList] = useState([])
  const [lastFetchMade, setLastFetchMade] = useState(new Date())

  const cardColor = useColorModeValue("whiteAlpha.600", "gray.700")

  // Initial function
  useEffect(() => {
    // Avoid multiple call
    if(!loading) {
      setLoading(true)

      // Check for local cache
      const localExchangeList = localStorage.getItem("localExchangeList")
      const localLastFetchDate = localStorage.getItem("localLastFetchDate")

      const fetchNew = async() => {
        const callback = (res) => {
          if(!res) return console.error("Failed Axios Fetching")
          setLoading(false)
          setExchangeList(res)
          localStorage.setItem("localExchangeList", JSON.stringify(res))
          localStorage.setItem("localLastFetchDate", new Date().toString())
          console.log("fetched new data")
        }
        const progressListen = (value) => setProgress(value * 200)
        await recursiveGetAllRates(blankExchangeList, callback, progressListen)
      }

      const checkOld = () => {
        const now = new Date()
        const old = Date.parse(localLastFetchDate)
        const oneDay = 60 * 60 * 24 * 1000
        const isPassedADay = (now - old) > oneDay;
        if(isPassedADay) return fetchNew()
        setLoading(false)
        setExchangeList(JSON.parse(localExchangeList))
        setLastFetchMade(old)
        console.log("used old data")
      }

      // Local cache condition
      if(!localExchangeList || !localLastFetchDate) fetchNew()
      else checkOld()
    }
  }, [])
  
  // Function listener to exchangeList & selectedCurrency
  useEffect(() => {

    // Reset input
    setInput(1)

    // Filter out exchange list
    setSelectedExchangedList(
      exchangeList.filter(({from, to}) => 
        from?.currency === selectedCurrency.currency || to?.currency === selectedCurrency.currency)
    )
  }, [exchangeList, selectedCurrency])

  return (
    <Page>
      <Header />
      {
        loading
          ? <CircularProgress value={progress} isIndeterminate={progress === -1}/>
          : <Stack spacing={10}>
                <Divider/>
                <CurrencyInput 
                  selectedCurrency={selectedCurrency}
                  input={input}
                  onInputChange={setInput}
                  onDropdownChange={setSelectedCurrency}
                />
                <Divider/>
                <Stack spacing={1}>
                  <Heading fontSize={24}>Group 1</Heading>
                  <Text pb={3}>All exchange rates that are &lt; 1, <b>if {selectedCurrency.currency} input is equal to 1</b></Text>
                  <CurrencyGrid 
                    input={input}
                    cardColor={cardColor}
                    formatCurrency={formatCurrency}
                    data={selectedExchangeList.filter(({rate}) => rate < 1)} />
                </Stack>
                <Divider/>
                <Stack spacing={1}>
                  <Heading fontSize={24}>Group 2</Heading>
                  <Text pb={3}>All exchange rates that are &gt;= 1 and &lt; 1.5, <b>if {selectedCurrency.currency} input is equal to 1</b></Text>
                  <CurrencyGrid
                    input={input}
                    cardColor={cardColor}
                    formatCurrency={formatCurrency}
                    data={selectedExchangeList.filter(({rate}) => rate >= 1 && rate < 1.5)}
                    />
                </Stack>
                <Divider/>
                <Stack spacing={1}>
                  <Heading fontSize={24}>Group 3</Heading>
                  <Text pb={3}>All exchange rates that are &gt;= 1.5, <b>if {selectedCurrency.currency} input is equal to 1</b></Text>
                  <CurrencyGrid
                    input={input}
                    cardColor={cardColor}
                    formatCurrency={formatCurrency}
                    data={selectedExchangeList.filter(({rate}) => rate >= 1.5)}/>
                </Stack>
                <Divider/>
                <Stack spacing={1}>
                  <Heading fontSize={24}>Sub task 1</Heading>
                  <Text>
                    Get the length of the longest array that meets the following conditions:
                  </Text>
                  <Text>
                    - For elements of the array should be considered only exchange rates for the currently selected currency
                  </Text>
                  <Text>
                    - The absolute difference between any two elements of the array is &lt;= 0.5
                  </Text>
                  <Heading fontSize={24} pb={3}>The answer is: {solveSubTaskOne(selectedExchangeList)?.length}</Heading>
                  <CurrencyGrid
                    input={1}
                    cardColor={cardColor}
                    formatCurrency={formatCurrency}
                    data={solveSubTaskOne(selectedExchangeList)} stayOne/>
                </Stack>
                <Divider/>
                <Stack spacing={1}>
                  <Heading fontSize={24}>Sub task 2</Heading>
                  <Text>
                    Implement caching in the browser, so that if the user opens the app again in the same day, the exchange
                    rates are read from the cache and no requests are made.
                  </Text>
                  <Heading fontSize={24} pb={2}>The answer:</Heading>
                  <Text>
                    The last API GET request made is at <b>{new Date(lastFetchMade).toString()}</b>.
                    Next GET request would be scheduled at <b>{new Date(lastFetchMade + (1000 * 60 * 60 * 24)).toString()}</b>
                  </Text>
                </Stack>
            </Stack>
      }
      <Footer />
    </Page>
  );
}

export default App;
