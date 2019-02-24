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
const phone = (value) => {
  if (!validator.isMobilePhone(value)) {
    return `${value} 不是合法的手机号码！`
  } else  {
    return false
  }
};
const file = (value) => {
  if (!validator.toString(value)) {
    return '文件不能为空！'
  } else  {
    return false
  }
};

export default {required,email,phone,file}
