import { useField, ErrorMessage } from "formik"

function TextField({ label, ...props }) {
    const [field, meta] = useField(props);
    // console.log(field.checked != undefined)
    let className = (field.checked == undefined) ? 'w-full py-4 rounded-3xl my-4 px-4 border-solid border' : '';
    return (
        <div>
            <input type="text" placeholder={label}
                className={`${className} ${meta.touched && meta.error && 'invalid-input'}`}
            {...field} {...props}
            />
            <ErrorMessage component="div" className="error" name={ field.name }/>
        </div>
    )
}

export default TextField