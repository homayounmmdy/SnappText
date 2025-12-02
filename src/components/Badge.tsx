import type { BadgeType } from "../types/FormFiledType";

const Badge = ({ children, color, className = "" }: BadgeType) => {
  return (
    <span className={`badge ${color} ${className}`}>{children}</span>
  );
};

export default Badge;
