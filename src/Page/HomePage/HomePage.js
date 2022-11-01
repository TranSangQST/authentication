import { useContext } from "react";
import { toast } from "react-toastify";

import Button from "../../components/Button";
import { CurrentAccountContext } from "../../context/CurrentAccountContext";
import { logout } from "../../services/authService";

import "./HomePage.css";

function HomePage() {
    const currentAccountContext = useContext(CurrentAccountContext);

    const handleLogout = async () => {
        const isLogout = await logout();
        if (isLogout) {
            localStorage.removeItem("token");
            currentAccountContext.changeCurrentAccount(null);
            toast("Logout successfully");
        }
    };

    return (
        <div className="homepage-wrapper">
            {currentAccountContext.currentAccount ? (
                <Button
                    title={"Log out"}
                    className="homepage-btn-logout"
                    onClick={handleLogout}
                />
            ) : (
                <>
                    <div className="homepage-title-wrapper">
                        <span className="homepage-title">
                            No account yet, login or register to continue
                        </span>
                    </div>
                    <div className="homepage-group-btn">
                        <Button
                            title={"Login"}
                            to={"/login"}
                            className="homepage-btn"
                        />
                        <Button
                            title={"Register"}
                            to={"/register"}
                            className="homepage-btn"
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default HomePage;
