import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CursoPage, {loader as loaderCurso} from "./pages/CursoPage";
import Layout from "./components/Layout";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage/>,
    },
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                element: <CursoPage/>,
                loader: loaderCurso,
                index: true
            }
        ]
    }
]);

export default router;