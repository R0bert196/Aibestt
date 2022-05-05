import * as yup from "yup";

const CompanyRegistrationSchema = yup.object().shape({
    deni: yup.string(),
    cui: yup.number(),
    caen: yup.number()
});
export default CompanyRegistrationSchema