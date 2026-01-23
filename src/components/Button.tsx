import type {ButtonType} from "../types/FormFiledType.ts";

/**
 * A customizable button component
 *
 * The component renders a standard HTML `<button>` element with utility classes
 * for styling, commonly use Tailwind CSS. By default, it applies a base `btn`
 * class along with a color variant class (e.g., `btn-primary`).
 *
 * @param {React.ReactNode} children - The content to render inside the button (e.g., text, icons).
 * @param outline - Outline of button as default it's false;
 * @param className - Default button className
 * @param variant - The predefined badge style class.
 *   Must be one of the supported variants: `'badge-primary'` `'btn-danger'` `'btn-info'` `'btn-warning'` `'btn-success'`.
 * @param rest - All the default things from button (e.g , className , id , etc ...).
 */

const Button = ({children, outline = false, className, variant, ...rest}: ButtonType) => {
    return (
        <button
            className={`btn ${className} btn-${variant} ${outline ? 'btn-outline' : ''}`}
            {...rest}>
            {children}
        </button>
    );
};

export default Button;