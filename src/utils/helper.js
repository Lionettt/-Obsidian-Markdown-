export const flattenArr = (arr) => {
    return arr.reduce((map, item) => {
      map[item.id] = item
      return map
    }, {})
  }
//数组转为对象


  export const objToArr = (obj) => {
    return Object.keys(obj).map(key => obj[key])
  }