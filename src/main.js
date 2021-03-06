// 测试js
import importJs from './js/importJs'
importJs()
// 测试ES6
import { jiantou, includes } from './js/testES6'

console.log(jiantou()())
includes()

// 测试css
import '@/css/importCSS.css'
import '@/css/importLESS.less'

// 测试图片
import bigImg from './image/big.jpg'
import smallImg from './image/small.jpg'

let body = document.querySelector('body')

function createImg(src) {
    let img = document.createElement('img')
    img.src = src
    body.appendChild(img)
}

createImg(bigImg)
createImg(smallImg)

// 测试lodash
import lodash from 'lodash'

// 测试commonJs
import { commonJs } from './common/common'

console.log(commonJs())
