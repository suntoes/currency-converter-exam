// Fixed currency
export const currencyList = [
    {currency: "USD", symbol: "$", emoji: "/images/united-states-of-america-flag-icon-16.png"}, 
    {currency: "EUR", symbol: "€", emoji: "/images/europe-flag-icon-16.png"}, 
    {currency: "AUD", symbol: "$", emoji: "/images/australia-flag-icon-16.png"}, 
    {currency: "CAD", symbol: "$", emoji: "/images/canada-flag-icon-16.png"}, 
    {currency: "CHF", symbol: "CHF", emoji: "/images/switzerland-flag-icon-16.png"}, 
    {currency: "NZD", symbol: "$", emoji: "/images/new-zealand-flag-icon-16.png"}, 
    {currency: "BGN", symbol: "лв", emoji: "/images/bulgaria-flag-icon-16.png"}, 
]
  
// Get all exchange possibilities
const populateCurrencyExchangeList = (arr) =>
    arr
      .map((obj, i) => 
        arr.map((_obj) => ({from: obj, to: _obj}))
          .filter((_obj, _i) => _i !== i)
        )
      .flat()
  
export const blankExchangeList = populateCurrencyExchangeList(currencyList)

export const formatCurrency = (val, symbol) => symbol + val

export const parseCurrency = (val, symbol) => {
    let pattern = `^\\${symbol}`
    pattern = new RegExp(pattern)
    return val.replace(pattern, '')
}