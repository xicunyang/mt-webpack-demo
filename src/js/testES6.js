import '@babel/polyfill'
/**
 * 测试箭头函数
 * @returns {function(): string}
 */
export const jiantou = () =>{
    return  ()=>{
        return 'jiantou function'
    }
}

/**
 * 测试includes
 */
export const includes = ()=>{
    let arr = [1,2,3]
    console.log(arr.includes('has yxc2'))
}
