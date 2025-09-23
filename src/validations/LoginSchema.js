  import  * as yup from 'yup';
  
  const loginSchema = yup.object({
      email: yup.string().required("Email IS Required").min(3,"min length is 3"),
  password: yup.string().required("Password IS Required").min(3,"min length is 3")
  })
  export default loginSchema;