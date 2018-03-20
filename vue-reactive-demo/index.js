/*实现reactive*/
var data = {
    name: 'test',
    arr: [1, 2, 3]
}
observe(data)

function observe(data) {
    if (!data || typeof data !== 'object') return
    for (let key in data) {
        let val = data[key]
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get: function () {
                console.log('读取值' + val);
                return val
            },
            set: function (newVal) {
                console.log('设置从' + val + '变为' + newVal)
                return newVal
            }
        })
        if (typeof val === 'object') {
            observe(val)
        }
    }

}

/*实现proxy代理到VM上*/

class Vue {
    constructor(option) {
        this.data = option.data
        observe(option.data)
        myProxy.call(this, option.data)
    }
}

var vm = new Vue({
    data: {
        name: 'default_name'
    }
})

function myProxy(data) {
    var vm = this
    if (!data || typeof data !== 'object') return
    for (let key in data) {
        let val = data[key]
        Object.defineProperty(vm,key,{
            configurable: true,
            enumerable: true,
            get: function () {
                return val
            },
            set: function (newVal) {
                return newVal
            }
        })
    }
}