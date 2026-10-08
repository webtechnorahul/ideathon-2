import {createBrowserRouter} from 'react-router';
import AppLayout from './AppLayout';
import Register from '../features/auth/pages/Register';
import Login from '../features/auth/pages/Login';
import Protected from '../features/auth/components/Protected';
import Home from '../shared/pages/Home';
import Create from '../features/ai/pages/Create';
import Roadmap from '../features/ai/pages/Roadmap';
import ContactPage from '../shared/pages/ContactPage';

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/create",
                element: <Protected><Create /></Protected>
            },
            {
                path: "/contact",
                element: <ContactPage />
            },
            {
                path: "/roadmaps",
                element: <Protected><Roadmap /></Protected>
            },
        ]
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
])