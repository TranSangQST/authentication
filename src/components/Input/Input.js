import "./Input.css";
import { forwardRef } from "react";

const Input = forwardRef(
    (
        {
            value,
            showLabel,
            label,
            placeholder,
            type,
            styleType,
            error,
            onChange,
            ...props
        },
        ref
    ) => {
        return (
            <div className="input-wrapper">
                {showLabel && <span className="input-label">{label}</span>}
                <input
                    className="input-field"
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required
                    {...props}
                    ref={ref}
                />
                {error && (
                    <span className="input-error">
                        {label} {error.message}
                    </span>
                )}
            </div>
        );
    }
);

export default Input;
