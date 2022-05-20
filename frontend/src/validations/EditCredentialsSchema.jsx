import * as yup from "yup";

const EditCredentialsSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    newPassword: yup.string().min(5).max(20).required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});


export default EditCredentialsSchema