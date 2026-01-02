///@ts-nocheck
import moment from "dayjs";
import { request, dropByCacheKey, closeTab, history, serverUrl } from "umi";
//能进入登录页的名单

export function pubGoBack(execute?: any): any {
  let current = window.location.pathname
  let listpath = execute === 'true' ? '/appWorkflow/workflowSelf/doing' : window.location.pathname.split('/').slice(0, -1).join('/')
  history.push({
    pathname: listpath,
  });
  setTimeout(() => {
    closeTab(current)
  }, 150);
}

export function verifyUrl(targetUrl: string) {
  let current = window.location.pathname
  return current.includes(targetUrl)
}

export function focusOn(name) {
  setTimeout(() => {
    document.getElementById(name)?.focus();
  }, 300);
}
export function blurOn(name) {
  document.getElementById(name)?.blur();
}

export function formatMoment(text, formatText = "YYYY-MM-DD HH:mm") {
  return text && moment(text).format(formatText);
}
export function formatStrDate(text) {
  return text && moment(text);
}
export function getData(
  { Filter, Sorting, SkipCount, MaxResultCount }: any,
  api
) {
  return request<API.VoloAbpApplicationDtosPagedResultDtoBurnAbpMESDepartInfoDto>(
    api || "",
    {
      method: "GET",
      params: {
        ...{ Filter, Sorting, SkipCount, MaxResultCount: MaxResultCount || 20 },
      },
      ...{},
    }
  ).then((res: any) => {
    if (res.items) {
      return res;
    } else {
      return { items: res, total: res.length };
    }
  });
}
export function formatDate(date, second = false, justYM = false) {
  //第一个参数日期类型Date,第二个是否要秒，第三个是否只要年月
  let seperator1 = "-";
  let seperator2 = ":";
  let month: any = Number(date.getMonth()) + Number(1);
  let strDate: any = Number(date.getDate());
  let strHour: any = Number(date.getHours());
  let strMin: any = Number(date.getMinutes());
  let strSecond: any = Number(date.getSeconds());
  if (month >= 1 && month <= 9) {
    month = "0" + month.toString();
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate.toString();
  }
  if (strHour >= 0 && strHour <= 9) {
    strHour = "0" + strHour.toString();
  }
  if (strMin >= 0 && strMin <= 9) {
    strMin = "0" + strMin.toString();
  }
  if (strSecond >= 0 && strSecond <= 9) {
    strSecond = "0" + strSecond.toString();
  }
  let sc = second === true ? seperator2 + strSecond : "";

  let currentdate = "";
  if (!justYM) {
    currentdate =
      date.getFullYear() +
      seperator1 +
      month +
      seperator1 +
      strDate +
      " " +
      strHour +
      seperator2 +
      strMin +
      sc;
  } else {
    currentdate =
      date.getFullYear() + seperator1 + month + seperator1 + strDate;
  }
  return currentdate;
}

//格式化form中的时间类型数据
export function formatFormDate(data) {
  let values = Object.assign({}, data);
  for (let name in values) {
    if (
      Array.isArray(values[name]) &&
      values[name].length === 2 &&
      values[name][0] &&
      values[name][1] &&
      values[name][0].format &&
      values[name][1].format
    ) {
      //  //console.log(values[name][0].format('YYYY-MM-DD'), values[name][1].format('YYYY-MM-DD'))
      let time = {
        start: values[name][0].format("YYYY-MM-DD"),
        end: values[name][1].format("YYYY-MM-DD"),
      };
      values[name] = time;
    }
    if (values[name]) {
      if (values[name].format) {
        values[name] = values[name].format("YYYY-MM-DD");
      }
    }
    if (values[name] === undefined) {
      values[name] = "";
    }
  }
  return values;
}
//防抖动，触发非常频繁的事件在规定时间内合并成一次执行
let debouncefun: any = null;
export const debounce = function (func, wait) {
  return function () {
    clearTimeout(debouncefun);
    debouncefun = setTimeout(func, wait);
  };
};

//树状数据转为字典
export function TreeToMap(datas) {
  let arr = [];
  let map = {};
  for (let item of datas) arr.push(item);
  while (arr.length > 0) {
    let d = arr[0];
    map[d.id] = d;
    arr.splice(0, 1);
    if (d.children != undefined) {
      for (let child of d.children) arr.push(child);
    }
  }
  return map;
}
export function publicTrim(schemeInfo) {
  for (let i in schemeInfo) {
    if (typeof schemeInfo[i] === "string") {
      schemeInfo[i] = schemeInfo[i]?.trim();
    }
    if (schemeInfo[i] == null) {
      delete schemeInfo[i];
    }
  }
  return schemeInfo;
}
//获取数据源中的对应的value的显示值，valueFiled默认id，labealField模板name
export function renderSourceName(
  value,
  source,
  valueField,
  labelField,
  childrenField
) {
  if (source === undefined || source.length === 0) {
    return "";
  }
  let m = source.find((item) => {
    return item[valueField ? valueField : "id"] === value;
  });
  if (m === undefined) {
    for (let item of source) {
      let source2 = item[childrenField ? childrenField : "children"];
      let ret = renderSourceName(
        value,
        source2,
        valueField,
        labelField,
        childrenField
      );
      if (ret) {
        return ret;
      }
    }
    return "";
  } else {
    return m[labelField ? labelField : "name"];
  }
}

//获取树节点
export function parseTree2(datas, key) {
  if (key === undefined || key === "") {
    key = "id";
  }
  let treeDatas = [];
  for (let i = 0; i < datas.length; i++) {
    let children = [];
    if (datas[i].children && datas[i].children.length > 0) {
      children = parseTree2(datas[i].children);
    }
    treeDatas.push({
      title: datas[i].name,
      value: datas[i][key],
      key: datas[i][key],
      children: children,
    });
  }
  return treeDatas;
}

//转换成符合格式的树结构
export function parseTree(datas) {
  for (let i = 0; i < datas.length; i++) {
    if (datas[i].childrens && datas[i].childrens.length > 0) {
      parseTree(datas[i].childrens);
    }
    datas[i]["children"] = datas[i]["childrens"];
  }
  return datas;
}

export function treeToArray(nodeTree, nodeArray) {
  if (nodeTree && nodeTree.length > 0) {
    nodeArray.push.apply(nodeArray, nodeTree);
    nodeTree.forEach((node) => treeToArray(node.children, nodeArray));
  }
}
export const getHeight = () => {
  return document.getElementsByTagName("body")[0].clientHeight - 60;
};

//表的高度自适应
export function getTableHeight(
  routerHeight = 0,
  className = undefined,
  count = undefined,
  hundred = 0.9
) {
  if (count === undefined) {
    count = 100;
  }
  if (className === undefined) {
    className = "outsideTableDiv";
  }
  if (routerHeight === -1 || routerHeight === 0) {
    routerHeight = getHeight;
  }
  let otherheight = 0;
  let otherdiv = document.getElementsByClassName(className);
  for (let i = 0; i < otherdiv.length; i++) {
    otherheight += otherdiv[i].clientHeight;
  }
  let tableheight = (routerHeight - otherheight) * hundred - count;
  return tableheight;
}
//判断logintype
export function getType() {
  let loginType =
    sessionStorage.getItem("loginType") &&
    sessionStorage.getItem("loginType").toString();
  let type = "normal";
  let alltype = {
    needBrand: ["2"],
    normal: ["1", "3", "7"],
    platform: ["0"],
  };
  for (let name in alltype) {
    if (alltype[name].indexOf(loginType) !== -1) {
      type = name;
      break;
    }
  }
  return type;
}
//判断整数
export function isInteger(num) {
  return Number.isInteger(num);
}
//处理JS的数字精度问题,估计没用，以后需要的话用math.js处理更好
export const formatFloat = (f, digit) => {
  let m = Math.pow(10, digit);
  return parseInt(f * m, 10) / m;
};
export const setTitleIcon = (loginType) => {
  let href = "";
  //console.log(loginType,'000')
  switch (loginType) {
    case "0":
      document.title = "kunpeng运营平台";
      href = "/favicon1.ico";
      break;
    case "1":
      document.title = "怀集县万福山殡仪馆祭拜预约系统";
      href = "/favicon1.ico";
      break;
    case "2":
      document.title = "kunpeng 3D Design";
      href = "/favicon.ico";
      break;
    case "3":
      document.title = "kunpeng Order";
      href = "/favicon1.ico";
      break;
    case "7":
      document.title = "kunpeng 案例库";
      href = "/favicon1.ico";
      break;
    default:
      break;
  }
  // let oldlink = document.querySelectorAll("link")
  // for (let i = 0; i < oldlink.length; i++) {
  //     if (oldlink[i].rel === "shortcut icon") {
  //         document.head.removeChild(oldlink[i])
  //     }
  // }
  // let link = document.createElement("link");
  // link.href = href
  // link.rel = "shortcut icon"
  // document.head.appendChild(link)
};
export const getUnit = (type) => {
  let obj = { "1": "件", "2": "包", "3": "本", "4": "个" };
  return obj[type];
};

export const allowhost = {
  kp: ["103.235.243.37"],
};

// 正则
export const reg = {
  allHanzi: /^[\u4e00-\u9fa5]*$/,
  hanzi: /[\u4e00-\u9fa5]/,
  intagerReg: /^(0?|[1-9][0-9]*)$/,
  floatReg: /^(0?|[1-9][0-9]*)?(\.(\d*))?$/,
  amountReg: /^(0?|[1-9][0-9]*)?(\.(\d{0,2}))?$/, //小数限制2位有效金额
  allNumber: /^\d+$/,
  phone:
    /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|16[0-9]|17[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
  email: /^\w+([-+.])*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  tele: /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/, //固定电话
  text: /^.{0,50}$/, //不超过50个
  wechat: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/, //微信
  noHanzi: /^[^\u4e00-\u9fa5]+$/,
  nameReg: /^\s*[\u4e00-\u9fa5]*[a-z]*[A-Z]*\s*$/,
  http: /^http[s]{0,1}\:\/\//,
};
//格式化订单的数据，转换tostring
export const formatOrderData = (obj) => {
  let data = Object.assign({}, obj);
  for (let name in data) {
    if (data[name] && !Array.isArray(data[name])) {
      data[name] = data[name].toString();
    } else if (data[name] === undefined) {
      data[name] = "";
    }
  }
  return data;
};
const getDataType = (data) => {
  if (Array.isArray(data)) {
    return "array";
  } else if (Object.prototype.toString.call(data) === "[object Object]") {
    return "object";
  } else return undefined;
};
//深克隆
export const deepClone = (data) => {
  if (data instanceof moment) {
    return moment(data);
  }

  let type = getDataType(data);
  let obj;
  if (type === "array") {
    obj = [];
  } else if (type === "object") {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === "array") {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === "object") {
    for (let key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};

//格式化null值
export const formatNullToString = (data) => {
  if (data === null) {
    return "";
  } else {
    return data;
  }
};
//计算提示控件要放在中间时，top应该是多少,
//配合props更新，didmout等2个生命周期，
//传那个页面的message控件和redux 里面的屏幕高度属性来用
export const countMsgCenterTop = (message, ScreenHeight) => {
  let bodytop =
    ScreenHeight.Height === -1
      ? document.body.clientHeight
      : ScreenHeight.Height;
  message.config({
    top: bodytop / 2 - 55,
  });
};

//侧边的详情页面，公共的拉伸和关闭
// export function skew() {
//     let { isFull } = this.state,
//         left = isFull ? 200 : 0;
//     this.setState({
//         isFull: !isFull,
//         hadMove: left,
//     })
//     this.refs.flexibleMask.style.left = left + 'px'
// }
// export function close() {
//     let { history, dispatch, BreadList } = this.props, prev = BreadList.BreadList[BreadList.BreadList.length - 2];
//     history.goBack();
//     dispatch({
//         type: 'SET_BREADLIST',
//         name: prev.name,
//         url: prev.url,
//         funid: prev.fuunid,
//         stateoption: null,
//     })
// }

const toString = Object.prototype.toString;
export function isString(v) {
  return toString.call(v) === "[object String]";
}
export function isNumber(v) {
  return toString.call(v) === "[object Number]";
}
export function isFunction(v) {
  return toString.call(v) === "[object Function]";
}
export function isObject(v) {
  return toString.call(v) === "[object Object]";
}
export function isBoolean(v) {
  return toString.call(v) === "[object Boolean]";
}
export function isArray(v) {
  return Array.isArray(v);
}

export function getWindowWH() {
  return {
    w: window.innerWidth || document.body.offsetWidth,
    h: window.innerHeight || document.body.offsetHeight,
  };
}
export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}
export function throttle(fn, delay = 270) {
  let time = null,
    start = new Date() - 0;
  return function () {
    let current = new Date() - 0;
    clearTimeout(time);
    time = null;
    if (current - start > delay) {
      start = current;
      fn();
    } else {
      time = setTimeout(fn, delay);
    }
  };
}
export function toStopPropagation(e) {
  e.stopPropagation();
}
export function toPreventDefault(e) {
  e.preventDefault();
}
export function isValidDate(date) {
  return isNaN(date.getTime());
}
export function regFormatDate(date, fmt = "YYYY-MM-dd") {
  try {
    let time = date.getTime();
    if (time === 0) {
      return "";
    }
    let o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  } catch (ex) {
    return "";
  }
}

export const bubbleSort = (array, sortKey) => {
  //排序，[{sortKey:1},{sortKey:3}]
  //  let sortKey = this.props.sortKey
  let i = 0,
    len = array.length,
    j,
    d;
  for (; i < len; i++) {
    for (j = 0; j < len; j++) {
      if (array[i][sortKey] < array[j][sortKey]) {
        d = array[j];
        array[j] = array[i];
        array[i] = d;
      }
    }
  }
  return array;
};

export function downLoadBase64(name, base64) {
  const eleLink = document.createElement("a");
  eleLink.download = name;
  eleLink.href = base64;
  eleLink.style.display = "none";
  document.body.appendChild(eleLink);
  eleLink.click();
  document.body.removeChild(eleLink);
}
export function imgGetBlob(blobName) {
  let url = `${serverUrl()}/api/attachmentManage/static-file-blob/${blobName}`;
  return url;
}

export const autoFocus = (id) => {
  let dom = document.getElementById(id);
  if (dom) {
    if (dom.focus) {
      dom.focus();
    }
  }
};

export const formatFRoot = (rootList, code, key) => {
  //字段权限，表单页
  let list = rootList || [];
  let root = list.find((item) => item.code === code);
  if (!root) {
    return null;
  } else {
    let value = root[key];
    if (key === "read" && value === 1) {
      //display
      return null;
    } else if (key === "read" && value === 0) {
      //display
      return "none";
    }
    if (key === "write" && value === 1) {
      //disbabled
      return false;
    } else if (key === "write" && value === 0) {
      //disbabled
      return true;
    }
  }
};

export const fRootDt = (rootList, code, value) => {
  //字段权限，详情页
  let list = rootList || [];
  let root = list.find((item) => item.code === code);
  if (root === undefined) {
    return value;
  } else {
    if (root["read"] === 1) {
      //可见
      return value;
    } else if (root["read"] === 0) {
      //不可见
      return "****";
    }
  }
};

export const getABtnRoot = (code, btnRoot) => {
  let list = btnRoot || [];
  let root = list.find((item) => item.code === code);
  if (root) {
    return root.status;
  } else return 1;
};
export const getDisBtnRoot = (code, btnRoot) => {
  let list = btnRoot || [];
  //console.log(list,code)
  let root = list.find((item) => item.code === code);
  if (root) {
    if (root.status === 1) {
      return false;
    } else return true;
  } else return false;
};

/**
 * 获取目标页面的Funid---因被跳转页面的btnRoot和导航可能被覆盖
 * @param {string} code
 * @param {array} menuList
 */
export const getTargetFunId = (code, menuList) => {
  let value = [];
  getFunId(code, menuList, value);
  return value[0];
};
const getFunId = (code, menuList, value) => {
  if (menuList) {
    for (let i = 0; i < menuList.length; i++) {
      if (value[0]) {
        break;
      }
      if (menuList[i].code === code) {
        value[0] = menuList[i].functionId;
        break;
      } else {
        if (menuList[i].children) {
          getFunId(code, menuList[i].children, value);
        }
      }
    }
  }
};
/**
 * 生成随机ID ：UUID
 */
export const getUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .toUpperCase();
};
/**
 * 生成随机ID ：UUID
 */
export const getUUID2 = () => {
  return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx"
    .replace(/[xy]/g, (c) => {
      let r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .toLowerCase();
};
/**
 * 20200311 wangjh
 * 四舍五入保留N位小数取值
 */
export function getNumberByPrecision(number, precision) {
  return (
    Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision)
  ).toFixed(precision);
}

/**
 *
 * 补零后输出为字符串类型
 * @param {number} number
 * @param {*} precision
 */
export function numbeFormatByPrecision(number, precision = 0) {
  if (isNaN(Number(number))) {
    return number;
  }
  const param = Math.pow(10, precision);
  let numberString = String(Math.round(number * param) / param);
  const decimal = numberString.split(".")[1];
  let missPlace = precision;
  if (decimal) {
    missPlace = precision - decimal.length;
  } else if (precision > 0) {
    numberString += ".";
  }
  let addStr = "";
  for (let i = 0; i < missPlace; i++) {
    addStr += "0";
  }
  return numberString + addStr;
}

export function getFieldRoot(source, fieldCode) {
  // 是否可读 是否可写
  let res = {
    // 默认可读可写
    read: true,
    write: true,
  };
  const equalRow = (source || []).find((item) => item.code === fieldCode);
  if (equalRow) {
    res.read = equalRow.read === 1 ? true : false;
    res.write = equalRow.write === 1 ? true : false;
  }
  return res;
}

export const getFormatTime = (value) => {
  //首页的时间查询
  let day = [];
  let initMoment = moment(),
    sTime = "",
    eTime = "";
  switch (value) {
    case "day":
      eTime = sTime = initMoment.format("YYYY-MM-DD");
      break;
    case "preDay":
      eTime = sTime = initMoment.subtract(1, "days").format("YYYY-MM-DD");
      break;
    case "week":
      sTime = initMoment.startOf("week").format("YYYY-MM-DD");
      eTime = initMoment.endOf("week").format("YYYY-MM-DD");
      break;
    case "prevWeek":
      sTime = initMoment
        .week(moment().week() - 1)
        .startOf("week")
        .format("YYYY-MM-DD");
      eTime = initMoment
        .week(moment().week() - 1)
        .endOf("week")
        .format("YYYY-MM-DD");
      break;
    case "month":
      sTime = moment().startOf("month").format("YYYY-MM-DD");
      eTime = moment().endOf("month").format("YYYY-MM-DD");
      break;
    case "pretoMonth":
      sTime = moment()
        .month(moment().month() - 1)
        .startOf("month")
        .format("YYYY-MM-DD");
      eTime = moment()
        .month(moment().month() - 1)
        .endOf("month")
        .format("YYYY-MM-DD");
      break;
    case "season":
      sTime = moment().startOf("quarter").format("YYYY-MM-DD");
      eTime = moment().endOf("quarter").format("YYYY-MM-DD");
      break;
    case "preSeason":
      sTime = moment()
        .quarter(moment().quarter() - 1)
        .startOf("quarter")
        .format("YYYY-MM-DD");
      eTime = moment()
        .quarter(moment().quarter() - 1)
        .endOf("quarter")
        .format("YYYY-MM-DD");
      break;
    case "year":
      sTime = moment().startOf("year").format("YYYY-MM-DD");
      eTime = moment().endOf("year").format("YYYY-MM-DD");
      break;
    case "preYear":
      sTime = moment()
        .year(moment().year() - 1)
        .startOf("year")
        .format("YYYY-MM-DD");
      eTime = moment()
        .year(moment().year() - 1)
        .endOf("year")
        .format("YYYY-MM-DD");
      break;
    default:
      eTime = sTime = initMoment.format("YYYY-MM-DD");
      break;
  }
  day = [sTime, eTime];
  return day;
};

export const isMobile = () =>
  /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(window.navigator.userAgent);

export const findTree = (
  tree,
  keyname,
  value,
  arr = [],
  childname = "children"
) => {
  for (let item of tree) {
    if (item[keyname] === value) {
      arr.push(item);
      break;
    } else if (Array.isArray(item[childname])) {
      findTree(item[childname], keyname, value, arr, childname);
    }
  }
};

export const formatter3poin = (value) => {
  const number = Number(value);
  let x = String(number).indexOf(".") + 1; //小数点的位置
  let y = String(number).length - x; //小数的位数
  return y < 3 ? value : number.toFixed(3);
};

export const baseGranularityList = [
  { label: "不采集", value: "00" },
  { label: "SN", value: "10" },
  { label: "制造批次-Lot No & Datecode", value: "20" },
  { label: "来料批次 09", value: "21" },
  { label: "出入库日期", value: "22" },
  { label: "不校验", value: "80" },
  { label: "采物料编码", value: "90" },
];
