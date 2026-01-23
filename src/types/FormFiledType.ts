export type InputType = {} & React.InputHTMLAttributes<HTMLInputElement>;

type badgeVariant = "primary" | "warning";

export type BadgeType = {
  children: React.ReactNode;
  variant?: badgeVariant;
  className?: string;
};

export type ButtonType = {
  variant?: "btn-danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;