export type InputType = {} & React.InputHTMLAttributes<HTMLInputElement>;

type badgeColor = "blue" | "yellow";

export type BadgeType = {
  children: React.ReactNode;
  color: `badge-${badgeColor}`;
  className?: string;
};
