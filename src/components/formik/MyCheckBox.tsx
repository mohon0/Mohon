import { useField } from "formik";

interface MyCheckboxProps {
  name: string;
  children: React.ReactNode;
}

const MyCheckbox: React.FC<MyCheckboxProps> = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default MyCheckbox;
