import "./App.css";
import RegisterPage from "./Page/RegisterPage";
import GlobalStyles from "./components/GlobalStyles";

function App() {
    return (
        <GlobalStyles>
            <div className="App">
                <RegisterPage />
            </div>
        </GlobalStyles>
    );
}

export default App;
