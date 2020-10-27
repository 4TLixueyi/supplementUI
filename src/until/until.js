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
    //饼图 占比太小时，设置一个最小扇形（适用于移动端）
    setSectorMinVal(data, type, minVal) {
        type = type || 'value'
        minVal = Number(minVal) || 0.03
        data = JSON.parse(JSON.stringify(data))
        let minArr = []
        let maxArr = []
        let maxArrTotalRate = 0
        data.forEach(function (item) {
            if (Number(item[type]) < minVal) {
                item[type] = minVal
                minArr.push(item)
            } else {
                maxArrTotalRate = maxArrTotalRate + Number(item[type])
                maxArr.push(item)
            }
        });
        let sumMinArr = minArr.length * minVal
        // 如果有小于最小值时
        if (sumMinArr) {
            let sumMaxArr = 1 - sumMinArr
            maxArr.forEach(function (item) {
                item[type] = (item[type] / maxArrTotalRate) * sumMaxArr
            })
            data = maxArr.concat(minArr)
        }
        return data
    },
    //饼图大小间隔排序
    arrFormatSort(data) {
        let length = data.length
        let arr = []
        if (length && length > 3) {
            let ban = length / 2
            if (ban === Math.ceil(ban)) {
                // 偶数个数时
                for (let i = 0; i < ban; i++) {
                    arr.push(data[i])
                    arr.push(data[ban + i])
                }
            } else {
                //奇数个数时
                let ban2 = Math.floor(ban)
                for (let i = 0; i < ban2; i++) {
                    arr.push(data[i])
                    arr.push(data[ban2 + 1 + i])
                }
                arr.push(data[ban2 + 1])
            }
        } else {
            arr = data
        }
        return arr
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
            num = String(num)
            let arrAll = param.splite('.')
            let arrLeft = arrAll[0].splite('')
            let resStr = ''
            if (type === 'sec') {
                // 第二位加1
                for (let i = 0, len = arrLeft.length; i < len; i++) {
                    if (i > 0) {
                        resStr = resStr + '0'
                    } else if (i == 1) {
                        let sec = Number(arrLeft[1])
                        if (sec !== 9) {
                            resStr = resStr + (Number(arrLeft[1]) + 1)
                        } else {
                            resStr = Number(resStr) + 1 + '0'
                        }
                    } else {
                        resStr = arrLeft[0]
                    }
                }
            } else {
                // 第一位加1
                for (let i = 0, len = arrLeft.length; i < len; i++) {
                    if (i !== 0) {
                        resStr = resStr + '0'
                    } else {
                        resStr = arrLeft[0] + 1
                    }
                }
            }
            return Number(resStr)

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
    },
    //markPotion 气泡
    setMarkPotionArrow(data) {
        let indexMax = data.length - 1
        let obj = {}
        if (indexMax > 3) {
            obj = {
                coord: [indexMax, data[indexMax]]
            }
        } else {
            obj = {
                coord: [indexMax, data[indexMax]],
                symbol: 'image://static/img/xxx.png',
                symbolOffset: ['50%', '-60%'],
                label: {
                    show: true,
                    offset: [1, -1]
                }
            }
        }
        return obj
    }




}