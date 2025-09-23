  import  * as yup from 'yup';
  
  const registerSchema = yup.object({
      email: yup.string().required("Email IS Required").min(3,"min length is 3"),
  userName: yup.string().required("User Name IS Required").min(3,"min length is 3"),
  fullName: yup.string().required("Full Name IS Required").min(3,"min length is 3"),
  phoneNumber: yup.string().required("Phone Number IS Required").min(3,"min length is 3"),
  password: yup.string().required("Password IS Required").min(3,"min length is 3")
  })
  export default registerSchema;