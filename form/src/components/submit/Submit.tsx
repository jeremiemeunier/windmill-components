import { SubmitProps } from "./Submit.types";
import { Loader } from "@jeremiemeunier/core";

const Submit: React.FC<SubmitProps> = ({
  size,
  label,
  loading,
  locked,
  className,
  children,
}) => {
  return (
    <div
      className={
        size
          ? `windmillui windmillui grid cta-container ha-end size-${size}x ${className}`
          : `windmillui windmillui grid cta-container ha-end ${className}`
      }
    >
      {children}
      <button
        className="windmillui cta level-primary format-icon-right"
        disabled={loading || locked ? true : false}
      >
        <span>{label}</span>
        <i className="icon windmill-icon-arrow-right"></i>
        {loading && <Loader />}
      </button>
    </div>
  );
};

export default Submit;
