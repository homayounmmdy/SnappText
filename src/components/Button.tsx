import type {ButtonType} from "../types/FormFiledType.ts";

/**
 * A customizable button component
 *
 * @param {React.ReactNode} children - The content to render inside the button (e.g., text, icons).
 * @param className - Default button className
 * @param variant - List of variant (e.g , danger )
 * @param rest - All the default things from button (e.g , className , id , etc ...).
 */

const Button = ({children,className,variant, ...rest} : ButtonType) => {
    return (
        <button
            className={`btn ${className} ${variant}`}
            {...rest}>
            {children}
        </button>
    );
};

export default Button;