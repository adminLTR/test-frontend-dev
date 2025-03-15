import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CursoPage from "./pages/CursoPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage/>,
    },
    {
        path: '/curso',
        element: <CursoPage/>
    }
]);

export default router;