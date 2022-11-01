import { Link } from "react-router-dom";
import "./Button.css";

function Button({ title, type, onClick, styleType, className, to }) {
    let Comp = "button";

    if (to) {
        Comp = Link;
    }

    return (
        <Comp
            className={`button-wrapper ${styleType} ${className}`}
            type={type}
            onClick={onClick}
            to={to}
        >
            {title}
        </Comp>
    );
}

export default Button;
