const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="input-container">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input {...rest} name={name} className="input-field" id={name} />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Input;
