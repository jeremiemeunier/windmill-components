import { GroupProps } from "./Group.types";

const Group: React.FC<GroupProps> = ({ size, children, className }) => {
  return (
    <div className={`teaui form-group ${className} tc-${size}`}>{children}</div>
  );
};

export default Group;
