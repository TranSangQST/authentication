import { useForm } from "react-hook-form";

import Button from "../Button";
import Input from "../Input";
import "./RegisterForm.css";
import { addAccount, checkExistEmail } from "../../services/accountService";
import { useState } from "react";

function RegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        reset,
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

    const [errorRegister, setErrorRegister] = useState(false);

    const [success, setSuccess] = useState(false);

    const handleRegister = async ({ fullname, email, password }) => {
        const addNewAccount = await addAccount(fullname, email, password);
        if (addNewAccount) {
            setErrorRegister(false);
            setSuccess(true);
        } else {
            setErrorRegister(true);
        }
    };

    const handleBack = () => {
        reset();
        setSuccess(false);
    };

    const requireErrorMessage = "field can not empty";

    return (
        <div className="register-form-wrapper">
            {success ? (
                <h1 className="register-form-title register-form-title--success">
                    Register Success
                </h1>
            ) : (
                <h1 className="register-form-title">Register</h1>
            )}

            {errorRegister && (
                <span className="register-form-error">
                    ERROR, PLEASE TRY AGAIN
                </span>
            )}

            <div className="register-form">
                <div className="register-form-group-input">
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
                                value: /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/,
                                message: "is wrong format",
                            },
                            validate: async () => {
                                const checkingExistEmail =
                                    await checkExistEmail(watch("email"));
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
                                value === watch("password", "") ||
                                "do not match",
                        })}
                        error={errors.confirmPassword}
                    />
                </div>

                <div>
                    {success ? (
                        <Button
                            title={"Back"}
                            type={"button"}
                            styleType={"back"}
                            onClick={handleBack}
                        ></Button>
                    ) : (
                        <Button
                            title={"Register"}
                            type={"submit"}
                            styleType={"register"}
                            onClick={handleSubmit(handleRegister)}
                        ></Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
