import React from "react"
import {
    useLoaderData,
    useNavigation,
    Form,
    redirect,
    useActionData,
    useRouteError,
    isRouteErrorResponse
} from "react-router-dom"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

// export function loader({ request }) {
//     return new URL(request.url).searchParams.get("message")
// }

export async function loader({ request }) {
    loginCheck(request)
    return null;
}

function loginCheck() {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if(isLoggedIn){
        throw redirect("/")
    }
    return isLoggedIn
}


export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/"
    try {
        const signin = await signInWithEmailAndPassword(auth, email, password)
        return redirect("/")
    }
    catch(error){
        if(error.message.includes("too-many-requests")){
            return { message: "Too many failed login attempts. Please try again later.", error: error }
        }
        else if(error.message.includes("invalid-credential")){
            return { message: "Incorrect email/password. Please check and try again.", error: error }
        }
    }
    return null;
    // if(signin)
    // {
    //     return redirect("/")
    // }
}

export default function Login() {
    const errorMessage = useActionData()
    const message = useLoaderData()
    const action = useActionData()
    const navigation = useNavigation()
    return (
        <div className="signup--container">
            <div className="text-center">
                <h3>LOGIN</h3>
                <div>
                    <p style={{color: "red", fontSize: "12px", width: "inherit"}}>{action?.error && action.message}</p>
                </div>
                <Form
                    method="post"
                    className="signup-form"
                    replace
                >
                    <input 
                        className="form-control signup--input" 
                        type="text" 
                        name="email" 
                        placeholder="Email Address..."
                        required
                    ></input>
                    <input 
                        className="form-control signup--input" 
                        type="password" 
                        name="password" 
                        placeholder="Password..."
                        required
                    ></input>
                    <button
                        disabled={navigation.state === "submitting"}
                        className='submit--button login-button'
                    >
                        {navigation.state === "submitting"
                            ? "Logging in..."
                            : "Login"
                        }
                    </button>            
                </Form>
            </div>
            <>
                <img src="../../login-page.jpg" style={{maxHeight: "70vh"}}></img>
            </>
        </div>
    )
}