import {
    browserSessionPersistence,
    createUserWithEmailAndPassword,
    setPersistence,
    signInWithEmailAndPassword, updateProfile
} from "firebase/auth";

import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const login = async (email, password) => {
    try{
        await setPersistence(auth, browserSessionPersistence);
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        return userCredentials;
    }catch(err){
        throw err;
    }
};

export const logout = async () => {
    try{
        auth.signOut();
    }catch(err){
        throw err
    }
};

export const create_user = async (email, username, role, password) => {
    try{
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user 
        await updateProfile(user, { displayName: username })
        await setDoc(doc(db, "users", user.uid), {
            email,
            username,
            role, // Role can be 'admin' or 'employee'
        });

        return user

    }catch(err){
        throw err
    }
};