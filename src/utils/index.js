import Cookies from 'universal-cookie'
import classnames from 'classnames'
import _ from 'lodash'
import moment from 'moment';
import config from './config'
import menu from './menu'
import request from './request'
import { color } from './theme'

// require('./mock.js')

// 连字符转驼峰
String.prototype.hyphenToHump = () => { // eslint-disable-line
  return this.replace(/-(\w)/g, () => {
    return arguments[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = () => { // eslint-disable-line
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = (format) => { // eslint-disable-line
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds(), // eslint-disable-line
  }

  if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) } // eslint-disable-line
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 // eslint-disable-line
        ? o[k]
        : (`00${o[k]}`).substr((`${o[k]}`).length))
    }
  }
  return format
}

const formatDate = (format, type = 'date') => {
  const time = new Date(format * 1000)

  Date.prototype.toLocaleString = function () {
    const formatMinutes = this.getMinutes() < 10 ? `0${this.getMinutes()}` : `${this.getMinutes()}`
    const formatHours = this.getHours() < 10 ? `0${this.getHours()}` : `${this.getHours()}`

    if (type !== 'date') { // 默认返回 日期 型, 如果配置 type参数, 则返回 具体到分钟的 类型
      return `${this.getFullYear()}/${this.getMonth() + 1}/${this.getDate()}    ${formatHours}:${formatMinutes}` // 年月日 + 小时 + 分钟; 未添加秒: ${this.getSeconds()
    } else {
      return `${this.getFullYear()}/${this.getMonth() + 1}/${this.getDate()}` // 年月日 版本
    }
  }

  return time.toLocaleString()
}

function getCurrentUser() {
  const cookies = new Cookies()
  return cookies.get('user')
}

function getModuleByType(type) {
  let menus = []
  menu.forEach(item => {
    menus = [
      ...menus,
      ...item.child,
    ]
  })
  const foo = menus.find(item => item.key === type)
  return foo
}

export { config, getCurrentUser }

export { formatDate }

export default {
  config,
  menu,
  xxx: 'sdfsfd',
  request,
  color,
  classnames,
  getCurrentUser,
  getModuleByType,
}

// 清除对象中为null， undefined， '' 变量
export const cleanObject = (obj) => {
  const foo = {};
  for(let p in obj) {
    if (obj.hasOwnProperty(p) && obj[p] !== null && obj[p] !== undefined && obj[p] !== '') {
      foo[p] = obj[p];
    }
  }
  return foo;
};

export function transData(data) {
  if (moment.isMoment(data)) {
    return data.format('YYYY-MM-DDTHH:mm:ssZ');
  }
  if (_.isArray(data)) {
    return _.map(data, function(value) {
      return transData(value)
    });
  }
  if (_.isObject(data)) {
    return _.transform(data, function(result, value, key) {
      result[key] = transData(value);
    }, {});
  }
  return data;
};

export function copyToClipboard(str) {
  let container = document.createElement('input');
  container.setAttribute('type', 'text');
  container.value = str;
  container.setAttribute('style', 'opacity: 0')
  document.body.appendChild(container);
  container.select();

  if (document.execCommand('copy')) {
    document.execCommand('copy');
  }
  document.body.removeChild(container);
}
