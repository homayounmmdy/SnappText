interface Props {
  children: React.ReactNode;
  color: "blue" | "yellow";
  className?: string;
}
const Badge = ({ children, color, className = "" }: Props) => {
  return (
    <span className={`badge badge-${color} ${className}`}>{children}</span>
  );
};

export default Badge;
