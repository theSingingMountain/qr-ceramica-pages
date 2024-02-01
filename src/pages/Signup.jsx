import { 
    Form, 
    useNavigation,
    redirect
} from 'react-router-dom';
import { 
    createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../../firebase';

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


export async function action({ request, params }){
    const formData = await request.formData()
    // const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")
    const password2 = formData.get("password2")
    let msg
    if(password !== password2)
    {
        msg = "PASSWORDS ARE DIFFERENT"
        return redirect(`/signup?msg=${msg}`)
    }
    else
    {
        msg = "PASSWORDS ARE SAME"
    }
    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/"

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return redirect("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error);
            return redirect("/signup");
        })
    return null;
}

export default function Signup() {
    const navigation = useNavigation()
    return (
        <div className="signup--container">
            <h3>SIGN UP</h3>
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
                <input 
                    className="form-control signup--input" 
                    type="password"
                    name="password2"
                    placeholder="Confirm Password..."
                    required
                ></input>
                <button
                    disabled={navigation.state === "submitting"}
                    className='submit--button'
                >
                    {navigation.state === "submitting"
                        ? "Signing up..."
                        : "Sign up"
                    }
                </button>            
            </Form>
        </div>
    )
}