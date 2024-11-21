import {addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc} from "firebase/firestore";
import {db} from "../firebase/config";

const collectionName = 'users'

export const addEmployee = async (users) => {
    const ref = collection(db, collectionName)
    try {
        await addDoc(ref,users)
    }catch (err) {
        throw err
    }
};

export const updateEmployee = async (id, users) => {
    const ref = doc(db, collectionName, id);
    try {
        await updateDoc(ref, users)
    }catch (err) {
        throw err
    }
};

export const deleteEmployee = async (id, users) => {
    const ref = doc(db, collectionName, id);
    try {
        await deleteDoc(ref)
    }catch (err) {
        throw err
    }
};

export const getEmployee = async (id) => {
    const ref = doc(db, collectionName, id);
    try {
        return await getDoc(ref)
    }catch (err) {
        throw err
    }
};

export const getEmployees = (callback) => {
    const ref = collection(db, collectionName);

    return onSnapshot(ref, (snapshot)=>{
        let results = []
        snapshot.docs.forEach(doc => {
            results.push({id: doc.id, ...doc.data()});
        });
        callback(results);
    })
};