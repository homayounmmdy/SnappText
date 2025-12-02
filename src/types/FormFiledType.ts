export type InputType = {
} & React.InputHTMLAttributes<HTMLInputElement>;

export type BadgeType = {
  children: React.ReactNode;
  color: "blue" | "yellow";
  className?: string;
}