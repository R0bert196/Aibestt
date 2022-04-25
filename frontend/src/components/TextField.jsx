import { useField, ErrorMessage } from "formik"

function TextField({ label, ...props }) {
    const [field, meta] = useField(props);
    return (
        <div>
            <input type="text" placeholder={label}
                className={`w-full py-4 rounded-3xl my-4 px-4 border-solid border ${meta.touched && meta.error && 'invalid-input'}`}
            {...field} {...props}
            />
            <ErrorMessage component="div" className="error" name={ field.name }/>
        </div>
    )
}

export default TextField