import { Link } from "react-router-dom";
import Button from "../Button";

import "./AuthForm.css";

function AuthForm({
    title,
    btnTitle,
    redirectMessage,
    redirectTitle,
    redirectLink,
    handleAuthClick,
    children,
}) {
    return (
        <div className="auth-form-wrapper">
            <h1 className="auth-form-title">{title}</h1>

            <div className="auth-form">
                <div className="auth-form-group-input"></div>
                {children}
                <div>
                    <Button
                        title={btnTitle}
                        type={"submit"}
                        styleType={"auth"}
                        onClick={handleAuthClick}
                    ></Button>
                </div>

                <div>
                    <p className="auth-form-redirect">
                        <span className="auth-form-redirect-message"></span>
                        {redirectMessage}
                        <Link
                            to={redirectLink}
                            className="auth-form-redirect-link"
                        >
                            {redirectTitle}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
