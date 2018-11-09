/**
 * @author yanxiaodi
 * @email yanxiaodi@lanjinger.com
 * @create date 2017-11-14 16:01:52
 * @modify date 2017-11-20 18:19:35
 * @desc 财联社-后台系统: '文章审核-推送电报' - 配置返回数据 方法
*/
import cloneDeep from 'lodash/cloneDeep'

// 处理返回的数组 => 处理成需要的格式
export const setPushData = (arr) => {
  const data = []

  arr.map((item) => {
    const deviceArr = Object.keys(item)

    let huaweiObj = {}
    let iosObj = {}
    let xiaomiObj = {}
    let otherObj = {}

    let idObj = {
      key: item.pushID,
      pushID: item.pushID,
      description: item.content,
    }

    // // 配置 设备属性 - 华为
    if (deviceArr.find(n => n === 'huawei')) {
      huaweiObj = Object.assign({}, {
        startAtHuawei: item.huawei.startAt,
        finishAtHuawei: item.huawei.finishAt,
        totalCostHuawei: item.huawei.totalCost,
      })
    }

    // // 配置 设备属性 - ios
    if (deviceArr.find(n => n === 'ios')) {
      iosObj = Object.assign({}, {
        startAtIOS: item.ios.startAt,
        finishAtIOS: item.ios.finishAt,
        totalCostIOS: item.ios.totalCost,
      })
    }

    // // 配置 设备属性 - 小米
    if (deviceArr.find(n => n === 'xiaomi')) {
      xiaomiObj = Object.assign({}, {
        startAtXiaomi: item.xiaomi.startAt,
        finishAtXiaomi: item.xiaomi.finishAt,
        totalCostXiaomi: item.xiaomi.totalCost,
      })
    }

    // // 配置 设备属性 - 其他类型
    if (deviceArr.find(n => n === 'other')) {
      otherObj = Object.assign({}, {
        startAtOther: item.other.startAt,
        finishAtOther: item.other.startAt,
        totalCostOther: item.other.totalCost,
      })
    }

    idObj = Object.assign(idObj, {
      ...cloneDeep(huaweiObj),
      ...cloneDeep(iosObj),
      ...cloneDeep(xiaomiObj),
      ...cloneDeep(otherObj),
    })

    return data.push(idObj) // 将配置好的 idObj 存入 数组中
  })

  return data
}
