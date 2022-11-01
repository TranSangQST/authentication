import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

import { checkExistEmail } from "../../services/accountService";

import AuthForm from "../../components/AuthForm";
import Input from "../../components/Input";
import "./LoginPage.css";
import { login } from "../../services/authService";
import { toast } from "react-toastify";
import { CurrentAccountContext } from "../../context/CurrentAccountContext";

function LoginPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
        criteriaMode: "all",
    });

    const currentAccountContext = useContext(CurrentAccountContext);
    const [success, setSuccess] = useState(false);

    const handleLogin = async ({ email, password }) => {
        const loginData = await login(email, password);
        if (loginData) {
            localStorage.setItem("token", loginData.accessToken);

            currentAccountContext.changeCurrentAccount(loginData.account);
            setSuccess(true);
            toast("Login successfully");
        } else {
            toast("Wrong email or password");
        }
    };

    const requireErrorMessage = "field can not empty";

    if (success) {
        return <Navigate to={"/"} />;
    }

    return (
        <AuthForm
            title="Login"
            btnTitle="Login"
            redirectMessage="No account"
            redirectTitle="Register"
            redirectLink="/register"
            handleAuthClick={handleSubmit(handleLogin)}
        >
            <Input
                placeholder="Email"
                label={"Email"}
                showLabel
                type={"email"}
                {...register("email", {
                    required: requireErrorMessage,
                    pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "is wrong format",
                    },
                    validate: async () => {
                        const checkingExistEmail = await checkExistEmail(
                            watch("email")
                        );
                        return checkingExistEmail || "does not exist";
                    },
                })}
                error={errors.email}
            />
            <Input
                placeholder="Password"
                label={"Password"}
                showLabel
                type={"password"}
                {...register("password", {
                    required: requireErrorMessage,
                })}
                error={errors.password}
            />
        </AuthForm>
    );
}

export default LoginPage;
