export type InputType = {} & React.InputHTMLAttributes<HTMLInputElement>;

type badgeVariant = "primary" | "warning";

export type BadgeType = {
  children: React.ReactNode;
  variant?: badgeVariant;
  className?: string;
};

type ButtonVariant = "primary" | "danger" | "info" | "warning" | "success";

export type ButtonType = {
  variant?: ButtonVariant;
  outline? : boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;