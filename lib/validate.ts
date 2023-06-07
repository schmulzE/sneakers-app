const loginValidate = (values: any) => {
  type Errors = {
    email: string,
    password: string
  }
 
  const errors: Errors = {
    email: '',
    password: ''
  }


  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
 
  if(!values.password){
    errors.password = 'Required';
  }else if (values.password.length < 8 || (values.password.length > 20)) {
    errors.password = 'Must be greater than 8 and less than 20 characters long'
  }else if (values.password.includes(" ")) {
    errors.password = "invalid Password"
  }

  return errors;

}

export const registerValidate = (values: any) => {
  type Errors = {
    email: string,
    password: string
  }
 
  const errors: Errors = {
    email: '',
    password: ''
  }


  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
 
  if(!values.password){
    errors.password = 'Required';
  }else if (values.password.length < 8 || (values.password.length > 20)) {
    errors.password = 'Must be greater than 8 and less than 20 characters long'
  }else if (values.password.includes(" ")) {
    errors.password = "Invalid Password"
  }
  if(!values.cpassword){
    errors.password = 'Required';
  }else if (values.password !== values.cpassword) {
    errors.password = 'Password not match!..'
  }else if (values.cpassword.includes(" ")) {
    errors.password = "Invalid Password"
  }

  return errors;
}

export default loginValidate