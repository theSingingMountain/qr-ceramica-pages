import { useRouteError } from "react-router-dom";

export default function ErrorComponent(){
    let error = useRouteError();
    console.log(error)
    if(error.status === 404){
        return (
            <div>This page doesn't exist! Please go back to the Home Page and try again.</div>
        )
    }
}