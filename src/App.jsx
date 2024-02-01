import React, { useEffect } from 'react';
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";
import HomeLayout, { loader as homeLayoutLoader } from './components/HomeLayout';
import AddProducts, { action as addProductAction } from './pages/AddProducts'
import EditProducts, { action as editProductAction, loader as editProductLoader} from './pages/EditProducts'
import Login, { loader as loginLoader, action as loginAction } from './pages/Login'
import Signup, { loader as signUpLoader, action as signUpAction } from './pages/Signup'
import NotFound from './components/NotFound'
import Layout from './components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import ExportQR from './pages/Export'
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import DeleteProducts, {loader as deleteProductLoader, action as deleteProductAction} from './pages/DeleteProduct';
import ImagesDisplay, {loader as imagesDisplayLoader} from './pages/ImagesDisplay';
import ErrorComponent from './components/ErrorComponent';
function App() {
    // const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(!user){
                localStorage.clear()
            }else {
                localStorage.setItem("loggedIn", true)
            }
        })
        return unsubscribe;
    },[])
    // useEffect(() => {
    //     if(loggedIn != undefined){

    //     }
    // })
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout/>}>
                <Route 
                    element={<HomeLayout />}
                    loader={homeLayoutLoader}
                    errorElement={<NotFound />}
                >
                    {/* <Route 
                        element={ <Home/> }
                    /> */}
                    <Route
                        index
                        element={<AddProducts/>}
                        // loader={addProductLoader}
                        action={addProductAction}
                    />
                    <Route
                        path="delete"
                        element={<DeleteProducts/>}
                        loader={deleteProductLoader}
                        action={deleteProductAction}
                        // loader={addProductLoader}
                        // action={addProductAction}
                    />
                    <Route
                        path="edit/:id"
                        element={<EditProducts/>}
                        loader={editProductLoader}
                        action={editProductAction}
                    />
                </Route>
                <Route path="*" element={ <NotFound /> } />
                <Route path="images" loader={imagesDisplayLoader} element={<ImagesDisplay />}/>
                <Route 
                    path="login"
                    element={<Login/>}
                    loader={loginLoader}
                    // loader={async () => { requireAuth() }}
                    action={loginAction}
                />
                {/* <Route 
                    path="signup"
                    element={<Signup/>}
                    loader={signUpLoader}
                    action={signUpAction}
                /> */}
                <Route
                    path="export"
                    element={ <ExportQR /> }
                />
            </Route>
        )
    )

    return (
        <RouterProvider router={router} />
    )
}
export default App;
