const TOOLS = {
    // 对应DOM中事件 @keyup.native='isNum($evnet, "state")'
    isNum(e, state) {
        let reg = /[^\d.]/g
        let isTrue = reg.test(e.key)
        if (isTrue && e.key != 'Backspace') {
            //不是纯数字，就显示错误提示
            // this[state]=0 
        } else {
            // this[state] = 0
        }
    },
    // 给数字加千分符
    numAddComma(str) {
        if (str) {
            if (str === '-') return str;
            let res = str.toString().replace(/\d+/, (n) => {
                return n.replace(/(\d)(?=(\d{3})+$)/g), ($1) => {
                    return $1 + ','
                }
            })
            return res
        }

    },
    //饼图大小间隔排序
    arrFormatSort(arr) {
        let length = arr.length
        let box = []
        if (length && length > 3) {
            let ban = length / 2
            if (ban === Math.ceil(ban)) {
                // 偶数个数时
                for (let i = 0; i < ban; i++) {
                    box.push(arr[i])
                    box.push(arr[ban + i])
                }
            } else {
                //奇数个数时
                let ban2 = Math.floor(ban)
                for (let i = 0; i < ban2; i++) {
                    box.push(arr[i])
                    box.push(arr[ban2 + 1 + i])
                }
                box.push(arr[ban2 + 1])
            }
        } else {
            box = arr
        }
        return box
    },
    // 四舍五入保留小数,callback
    toFixedFn(val, len, radix, callback) {
        val = Number(val)
        len = len || 0
        radix = radix || 1
        if (val) {
            val = val * radix
            val = (val + 0.00000000000001).toFixed(len)
        }
        if (callback) {
            cb(callback)
        }

        return val
    },
    //获取距离当前数值最近的整十百千万的数（折线图Y轴）
    getYaxisMaxVal(num, type) {
        // type = type || 'top'
        num = Number(num)
        if (num <= 0.01) {
            if (num <= 0.005) {
                return 0.005
            } else {
                return 0.001
            }
        } else if (num <= 0.1) {
            if (num <= 0.05) {
                return 0.05
            } else {
                return 0.01
            }
        } else if (num <= 1) {
            if (num <= 0.5) {
                return 0.5
            } else {
                return 0.1
            }
        } else {
            if (type === 'sec') {

            } else {
                num = String(num)
                let arrAll = param.splite('.')
                let arrLeft = arrAll[0].splite('')
                let resStr = ''
                for (let i = 0, len = arrLeft.length; i < len; i++) {
                    if (i !== 0) {
                        resStr = resStr + '0'
                    } else {
                        resStr = arrLeft[0] + 1
                    }
                }
                return Number(resStr)
            }
        }
    },
    //折线图Y轴 刻度值保留小数位
    valLen(levelNum) {
        levelNum = Number(levelNum)
        let len = 0
        if (levelNum < 10) {
            len = 0
            if (levelNum < 0.0001) {
                len = 5
            } else if (levelNum < 0.001) {
                len = 4
            } else if (levelNum < 0.01) {
                len = 3
            } else if (levelNum < 0.1) {
                len = 2
            } else if (levelNum < 1) {
                len = 1
            } else if (levelNum < 5) {
                len = 1
            }
        }

        return len
    }



}