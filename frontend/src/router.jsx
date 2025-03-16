import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CursoPage, {loader as loaderCurso} from "./pages/CursoPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage/>,
    },
    {
        path: '/curso',
        element: <CursoPage/>,
        loader: loaderCurso,
    }
]);

export default router;