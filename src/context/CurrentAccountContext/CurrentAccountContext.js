import { createContext, useState } from "react";

const CurrentAccountContext = createContext();

function CurrentAccountProvider({ children }) {
    const [currentAccount, setCurrentAccount] = useState(null);

    const changeCurrentAccount = (newCurrentAccount) => {
        setCurrentAccount(newCurrentAccount);
    };

    const value = { currentAccount, changeCurrentAccount };

    return (
        <CurrentAccountContext.Provider value={value}>
            {children}
        </CurrentAccountContext.Provider>
    );
}

export { CurrentAccountContext, CurrentAccountProvider };
