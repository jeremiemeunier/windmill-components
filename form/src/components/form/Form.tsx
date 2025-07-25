import { FormProps } from "./Form.types";

const Form: React.FC<FormProps> = ({
  children,
  handler,
  encType,
  className,
}) => {
  return (
    <form
      onSubmit={handler}
      encType={encType && encType}
      className={`windmillui-form ${className}`}
    >
      {children}
    </form>
  );
};

export default Form;
