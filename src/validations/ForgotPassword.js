  import  * as yup from 'yup';
  
  const forgotPasswordSchema = yup.object({
      email: yup.string().required("Email IS Required").min(3,"min length is 3"),
  })
  export default forgotPasswordSchema;