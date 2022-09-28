const FieldError = ({ message }) => {
  if (!message) return;
  return (
    <span className="validation-error pl-[40%] text-xs text-error">
      {message}
    </span>
  );
}

export default FieldError;
