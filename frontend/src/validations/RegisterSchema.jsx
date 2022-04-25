import * as yup from "yup";

const RegisterSchema = yup.object().shape({
    firstName: yup.string().max(20, "Must be 20 characters or less").required("First Name is required"),
    lastName: yup.string().max(20, "Must be 20 characters or less").required("Last Name is required"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    password: yup.string().min(5).max(20).required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
    group: yup.string().required("Group is required"),
    cui: yup.string().required("Please enter your CUI").matches("^[A-Z]{2}[0-9]{8}$", "Invalid CUI"),
});


export default RegisterSchema;