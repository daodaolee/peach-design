// 递归查询返回单个
export const deepFindByOnce = (array: any, key: string, target: string) => {
  for (const item of array){
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
export const deepFindByChain = (array: any, key: string, target: string) => {
  for (const item of array){
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