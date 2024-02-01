import { Outlet, useOutletContext } from "react-router-dom";

export default function EditProductLayout(){
    const outlet = useOutletContext()
    return (
        <Outlet context = {outlet}/>
    )
}