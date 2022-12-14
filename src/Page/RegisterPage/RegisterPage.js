import { useForm } from "react-hook-form";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import { addAccount, checkExistEmail } from "../../services/accountService";

import AuthForm from "../../components/AuthForm";
import Input from "../../components/Input";
import "./RegisterPage.css";
import { toast } from "react-toastify";

function RegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        criteriaMode: "all",
    });

    const [success, setSuccess] = useState(false);

    const handleRegister = async ({ fullname, email, password }) => {
        const addNewAccount = await addAccount(fullname, email, password);
        if (addNewAccount) {
            setSuccess(true);
            toast("Register successfully");
        }
    };

    const requireErrorMessage = "field can not empty";

    if (success) {
        return <Navigate to={"/login"} />;
    }

    return (
        <AuthForm
            title="Register"
            btnTitle="Register"
            redirectMessage="Already have account"
            redirectTitle="Login"
            redirectLink="/login"
            handleAuthClick={handleSubmit(handleRegister)}
        >
            <Input
                placeholder="Fullname"
                label={"Fullname"}
                showLabel
                type={"text"}
                {...register("fullname", {
                    required: requireErrorMessage,
                })}
                error={errors.fullname}
            />
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
                        return !checkingExistEmail || "already exist";
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
            <Input
                placeholder="Confirm password"
                label={"Confirm password"}
                showLabel
                type={"password"}
                {...register("confirmPassword", {
                    validate: (value) =>
                        value === watch("password", "") || "do not match",
                })}
                error={errors.confirmPassword}
            />
        </AuthForm>
    );
}

export default RegisterPage;
