interface FormRowProps {
  type: string;
  name: string;
  labelText?: string;
  defaultValue?: string;
}

const FormRow = ({ type, name, labelText, defaultValue }: FormRowProps) => {
  return (
    <form>
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="form-input"
        defaultValue={defaultValue || ""}
        required
      />
    </form>
  );
};

export default FormRow;
