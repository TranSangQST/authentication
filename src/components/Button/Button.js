import "./Button.css";

function Button({ title, type, onClick, styleType }) {
    return (
        // <button className="button-wrapper"
        <button
            className={`button-wrapper ${styleType}`}
            type={type}
            onClick={onClick}
        >
            {title}
        </button>
    );
}

export default Button;
