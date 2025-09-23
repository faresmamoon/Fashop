  import  * as yup from 'yup';
  
  const resetPasswordSchema = yup.object({
      email: yup.string().required("Email IS Required").min(3,"min length is 3"),
  newPassword: yup.string().required("Password IS Required").min(3,"min length is 3"),
    code: yup.string().required("code IS Required").min(3,"min length is 3")

  })
  export default resetPasswordSchema;