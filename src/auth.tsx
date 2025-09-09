import { useState } from "react";
import {auth} from "./config/firebase";
import {createUserWithEmailAndPassword, signOut} from "firebase/auth";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    console.log(auth?.currentUser?.email);
    const signIn = async () => {
        try {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                // ...
            })
        } catch (error) {
            console.log(error);
        }
    }


        const logout = async () => {
        try {
        await signOut(auth)

        } catch (error) {
            console.log(error);
        }
    }
    return <div>
        <input type="email" placeholder="Email..."  onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password..."  onChange={(e) => setPassword(e.target.value)}/>

        <button onClick={signIn}>Sign In</button>
        <button onClick={logout}>Logout</button>

    </div>
}