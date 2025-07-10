import { GroupProps } from "./Group.types";

const Group: React.FC<GroupProps> = ({ size, children, className }) => {
  return (
    <div
      className={
        size
          ? `infusedui-group ${className} tc-${size}`
          : `infusedui-group ${className}`
      }
    >
      {children}
    </div>
  );
};

export default Group;
