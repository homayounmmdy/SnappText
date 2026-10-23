import { AlertTriangle, Check, Info, X } from "lucide-react";
import type { ReactNode } from "react";
import toast, { type Toast } from "react-hot-toast";

type Variant = "success" | "error" | "warning" | "info";

type Options = {
  title?: string;
  duration?: number;
  id?: string;
};

const ICONS: Record<Variant, ReactNode> = {
  success: <Check />,
  error: <X />,
  warning: <AlertTriangle />,
  info: <Info />,
};

const DEFAULT_TITLE: Record<Variant, string> = {
  success: "Nice!",
  error: "Oops!",
  warning: "Heads up",
  info: "FYI",
};

const DURATION = 4000;

function show(variant: Variant, message: ReactNode, opts: Options = {}) {
  const { title, duration = DURATION, id } = opts;

  return toast.custom(
    (t: Toast) => (
      <div className={`toast toast-${variant}`}>
        <div className="toast-icon">{ICONS[variant]}</div>

        <div className="min-w-0 flex-1">
          <p className="toast-title">{title ?? DEFAULT_TITLE[variant]}</p>
          <p className="toast-message">{message}</p>
        </div>

        <button
          type="button"
          aria-label="Dismiss"
          className="toast-close"
          onClick={() => toast.dismiss(t.id)}
        >
          <X className="w-3 h-3" strokeWidth={3} />
        </button>

        {duration !== Infinity && (
          <div className="toast-track">
            <div
              className="toast-progress"
              style={{ animationDuration: `${duration}ms` }}
            />
          </div>
        )}
      </div>
    ),
    { id, duration },
  );
}

export const notify = {
  success: (msg: ReactNode, opts?: Options) => show("success", msg, opts),
  error: (msg: ReactNode, opts?: Options) => show("error", msg, opts),
  warning: (msg: ReactNode, opts?: Options) => show("warning", msg, opts),
  info: (msg: ReactNode, opts?: Options) => show("info", msg, opts),
};
