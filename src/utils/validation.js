import validator from 'validator'

const required = (value) => {
  if (!value.toString().trim().length) {
    return '此项必填！';
  } else  {
    return false
  }
};

const email = (value) => {
  if (!validator.isEmail(value)) {
    return `${value} 不是合法的email！`
  } else  {
    return false
  }
};
const mobilePhone = (value) => {
  if (!validator.isMobilePhone(value,['zh-CN'])) {
    return `${value} 不是合法的手机号码！`
  } else  {
    return false
  }
};
const phone = (value) => {
  let regex = /(^([0-9]{4}-[0-9]{8})|([0-9]{3}-[0-9]{8})|([0-9]{4}-[0-9]{7})$)|(^(1[3|4|5|8])(\\d){9}$)/;
  if (!regex.test(value)) {
    return `${value} 不是合法的电话！`
  } else  {
    return false
  }
};
const file = (value) => {
  if (!value) {
    return '文件不能为空！'
  } else  {
    return false
  }
};

export default {required,email,phone,mobilePhone,file}
