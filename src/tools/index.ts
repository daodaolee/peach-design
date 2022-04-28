// 递归查询返回单个
export const deepFindByOnce = (array, key, target) => {
  for (const x in array){
    const item = array[x]
    if (item[key] === target){
      return item
    } else {
      if (item.children){
        const value = deepFindByOnce(item.children, key, target)
        if (value){
          return value
        }
      }
    }
  }
}
// 递归查询返回整链
export const deepFindByChain = (array, key, target) => {
  for (const i in array){
    const item = array[i]
    if (item[key] === target){
      return [item]
    }
    if (item.children){
      const node = deepFindByChain(item.children, key, target)
      if (node){
        return [item, ...node]
      }
    }
  }
}