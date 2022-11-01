import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import RegisterPage from "./Page/RegisterPage";
import GlobalStyles from "./components/GlobalStyles";
import LoginPage from "./Page/LoginPage";
import HomePage from "./Page/HomePage";
import AuthLayout from "./Layouts/AuthLayout";

import { getCurrentAccount } from "./services/authService";
import { useContext, useEffect } from "react";
import { CurrentAccountContext } from "./context/CurrentAccountContext";
import MainLayout from "./Layouts/MainLayout";

function App() {
    const currentAccountContext = useContext(CurrentAccountContext);

    useEffect(() => {
        const createCurrentAccount = async () => {
            const currentAccount = await getCurrentAccount();
            currentAccountContext.changeCurrentAccount(currentAccount);
        };
        createCurrentAccount();
    }, []);

    return (
        <GlobalStyles>
            <Router>
                <div className="App">
                    <Routes>
                        <Route
                            path={"/"}
                            element={
                                <MainLayout>
                                    <HomePage />
                                </MainLayout>
                            }
                        />
                        <Route
                            path={"/login"}
                            element={
                                <AuthLayout>
                                    <LoginPage />
                                </AuthLayout>
                            }
                        />
                        <Route
                            path={"/register"}
                            element={
                                <AuthLayout>
                                    <RegisterPage />
                                </AuthLayout>
                            }
                        />
                    </Routes>
                    <ToastContainer />
                </div>
            </Router>
        </GlobalStyles>
    );
}

export default App;
