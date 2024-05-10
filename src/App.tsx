import './App.css'
import {RouterComponent} from "./routes";
import {Navbar} from "./components/Navbar/Navbar.tsx";
import {useAuth} from "./hooks/useAuth.tsx";

function App() {
    const {user} = useAuth();

    return (
        <>
            {user && <Navbar />}
            <div className={`app-container${user ? ' sidebar-wrapper' :''}`}>
                <RouterComponent/>
            </div>
        </>
    )
}

export default App
