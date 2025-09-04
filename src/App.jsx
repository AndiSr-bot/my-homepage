import "./App.css";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from "react-router-dom";
import Layout from "../src/components/Layouts";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import Message from "./pages/Dashboard/Portofolio/Message";
import DetailMessage from "./pages/Dashboard/Portofolio/Message/Detail";

import Service from "./pages/Dashboard/Portofolio/Service";
import EditService from "./pages/Dashboard/Portofolio/Service/Edit";
import CreateService from "./pages/Dashboard/Portofolio/Service/Create";

import Tool from "./pages/Dashboard/Portofolio/Tool";
import EditTool from "./pages/Dashboard/Portofolio/Tool/Edit";
import CreateTool from "./pages/Dashboard/Portofolio/Tool/Create";

import Language from "./pages/Dashboard/Portofolio/Language";
import EditLanguage from "./pages/Dashboard/Portofolio/Language/Edit";
import CreateLanguage from "./pages/Dashboard/Portofolio/Language/Create";

import Profile from "./pages/Dashboard/Portofolio/Profile";
import EditProfile from "./pages/Dashboard/Portofolio/Profile/Edit";

import Login from "./pages/Login";
import Otentikasi from "./middleware/Otentikasi";
import NotFound from "./pages/Dashboard/NotFound";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/"
                element={<Otentikasi />}>
                <Route
                    path="/"
                    element={<Layout />}>
                    <Route path="dashboard">
                        <Route
                            index
                            element={<Dashboard />}
                        />
                    </Route>
                    <Route path="message">
                        <Route
                            index
                            element={<Message />}
                        />
                        <Route
                            path="detail/:id"
                            element={<DetailMessage />}
                        />
                    </Route>
                    <Route path="service">
                        <Route
                            index
                            element={<Service />}
                        />
                        <Route
                            path="edit/:id"
                            element={<EditService />}
                        />
                        <Route
                            path="create"
                            element={<CreateService />}
                        />
                    </Route>
                    <Route path="tool">
                        <Route
                            index
                            element={<Tool />}
                        />
                        <Route
                            path="edit/:id"
                            element={<EditTool />}
                        />
                        <Route
                            path="create"
                            element={<CreateTool />}
                        />
                    </Route>
                    <Route path="language">
                        <Route
                            index
                            element={<Language />}
                        />
                        <Route
                            path="edit/:id"
                            element={<EditLanguage />}
                        />
                        <Route
                            path="create"
                            element={<CreateLanguage />}
                        />
                    </Route>
                    <Route path="profile">
                        <Route
                            index
                            element={<Profile />}
                        />
                        <Route
                            path="edit"
                            element={<EditProfile />}
                        />
                    </Route>
                </Route>
            </Route>
            <Route path="login">
                <Route
                    index
                    element={<Login />}
                />
            </Route>
            <Route
                path="*"
                element={
                    <Navigate
                        replace
                        to="/not-found"
                    />
                }
            />
            <Route path="not-found">
                <Route
                    index
                    element={<NotFound />}
                />
            </Route>
        </>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
