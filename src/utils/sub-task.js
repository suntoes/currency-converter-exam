// Find longest arr with absolute difference between any two elem of the said array of <= 0.5
export const solveSubTaskOne = (list) => {
    
    const populatePossibilitiesToObj = (arr) => {
      const result = {}

      // First arr loop: Each elem (base)
      for(let i = 0; i < arr.length; i++) {
        const base = arr[i]
        const tmp = {}

        // Second arr loop: Base pair elem (_base)
        for(let _i = 0; _i < arr.length; _i++) {
          const _base = arr[_i]
          if(Math.abs(base.rate - _base.rate) > 0.5) continue;
          const _tmp = [_base]

          // Third arr loop: Applied condition with _base
          for(let __i = 0; __i < arr.length; __i++) {
            const __base = arr[__i]
            const test = _tmp.every(obj => 
              Math.abs(obj.rate - __base.rate) <= 0.5
            )
            if(test && __base.rate !== _base.rate) _tmp.push(__base)
          }
          tmp[_base.rate] = _tmp
        }
        result[base.rate] = tmp
      }
      return result
    }
  
    const flattenTwoLevelObjToArr = (obj) => {
      const tmp = []
      for(let key in obj) {
        for(let _key in obj[key]) {
          tmp.push(obj[key][_key])
        }
      }
      return tmp
    }
  
    const initialResult = populatePossibilitiesToObj(list)
    // Get most lengthy array in array
    return flattenTwoLevelObjToArr(initialResult).sort().reverse()[0]
}