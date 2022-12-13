//funcion para retornar vista de dashboard
import { useNavigate } from "react-router-dom";
function Dashboard() {
    const Navigator = useNavigate();
    function logout() {
        localStorage.removeItem('Id-ref');
        Navigator('/login');
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <p>Esta es la vista de dashboard</p>

            <button onClick={logout}>Cerrar Sesión</button>
        </div> 
        )
}
export default Dashboard