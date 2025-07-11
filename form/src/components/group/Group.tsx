import { GroupProps } from "./Group.types";

const Group: React.FC<GroupProps> = ({ size, children, className }) => {
  return (
    <div
      className={
        size
          ? `windmillui-group ${className} tc-${size}`
          : `windmillui-group ${className}`
      }
    >
      {children}
    </div>
  );
};

export default Group;
