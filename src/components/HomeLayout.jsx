import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SidebarNav from "./SidebarNav";
import { db } from "../../firebase";
import { requireAuth } from "../utils";
import { Fragment, useEffect, useState } from "react";
import Home from "./Home";
import { collection, onSnapshot, query } from "firebase/firestore";

export async function loader({ request }){
    requireAuth(request)
    return null
}

export default function HomeLayout() {
    const [products, setProducts] = useState()
    const [show, setShow] = useState(false)
    const location = useLocation()
    const onChangeState = (newState) => {
        setShow(newState)
    }
    useEffect(() => {
        const q = query(collection(db, "products"))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setProducts(querySnapshot.docs.map(
                (doc) => ({
                ...doc.data(),
                id: doc.id
            })))
        })
        return unsubscribe
    }, [])
    if(products?.length === 0){

    }
    const productRender = () => {
            if((products?.length === 0 && location.pathname.includes("edit") && location.pathname.includes("delete"))){
                return (
                    <Navigate to = "/" />
                )
            }
            else if(typeof products === "undefined")    
            return (
                <div>Loading, please wait...</div>
            )
            else {
                return (
                    <Outlet context={products} />
                )
            }
        }
    const productDOM = productRender()
    const disabled = products?.length === 0
    return (
        <>
        {
            <Fragment>
                <Header show={show} disabled={disabled} onChangeState={onChangeState}/>
                <div className='main--content'>
                    <div className="row">
                        <div className="p-5 col-9 main-column">
                        {
                            productDOM
                        }
                        {
                            show && products.length > 0 &&
                            <Home products={products}/>
                        }
                        </div>
                        <div className="col-3 sidebar-column">
                            <SidebarNav products = {products}/>
                        </div>                        
                    </div>
                </div>
            </Fragment>
        }
        </>
    )
}