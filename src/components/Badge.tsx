import type { BadgeType } from "../types/FormFiledType";
import React from "react";

/**
 * A customizable badge component
 *
 * @param {React.ReactNode} children - The content to render inside the badge (e.g., text, icons).
 * @param variant - The predefined badge style class.
 *   Must be one of the supported variants: `'badge-primary'` `'btn-warning'`.
 * @param {string} className - Additional CSS classes to apply to the button.
 *
 * @returns {JSX.Element} A styled badge element based on the provided props.
 */
const Badge = ({ children, variant = 'primary', className = "" }: BadgeType): React.JSX.Element => {
  return (
    <span className={`badge badge-${variant} ${className}`}>{children}</span>
  );
};

export default Badge;
