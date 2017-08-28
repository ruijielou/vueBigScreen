# sell

> sell app

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


>> qlik、tableau的数据每次都保存在本地，不刷新页面不重新请求，全局声明一个空对象，然后每次以当前ID为key, 请求的返回值为value
>> 每次点击发送均带上当前控件的ID为参数，第二层作为每次请求的productId，三层为每次请求的productId和APPId


>> 递归生成树结构的数据表
>> 给每个数据添加一个特有的属性，如果有这个属性就添加父级，
>> 每次生成的新元素添加属性为1，当再次有新元素拖过来时把目标元素的属性定义为2，那么新元素和目标元素公有一个父级如此循环
..... id1+id2:{
        id1: {
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            id: jskfjksdljfks,
            appid: klsjkdfjskdlf,
            description: kjklsjdfkljsdf
        },
        id2 + id3: {
            id2: {}
            id3: {}
        }
}
>>  

                {
                    id: '1',
                    text: 'first',
                    show: 'true',
                    next: [
                        {
                            id: '1-1',
                            text: 'first1-1',
                            show: true,
                            next: [{
                                id: '1-1-1',
                                text: 'first1-1-1',
                                show: true,
                                next: [{
                                    id: '1-1-1-1',
                                    text: 'first1-1-1-1',
                                    show: true,
                                    next: [{
                                        id: '1-1-1-1',
                                        text: 'first1-1-1-1',
                                        show: true
                                    }]
                                }]
                            }]
                        }
                    ]
                }
            
