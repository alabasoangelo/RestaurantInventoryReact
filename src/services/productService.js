import {addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc} from "firebase/firestore";
import {db} from "../firebase/config";

const collectionName = 'products'

export const addProduct = async (products) => {
    const ref = collection(db, collectionName)
    try {
        await addDoc(ref,products)
    }catch (err) {
        throw err
    }
};

export const updateProduct = async (id, products) => {
    const ref = doc(db, collectionName, id);
    try {
        await updateDoc(ref, products)
    }catch (err) {
        throw err
    }
};

export const deleteProduct = async (id, products) => {
    const ref = doc(db, collectionName, id);
    try {
        await deleteDoc(ref)
    }catch (err) {
        throw err
    }
};

export const getProduct = async (id) => {
    const ref = doc(db, collectionName, id);
    try {
        return await getDoc(ref)
    }catch (err) {
        throw err
    }
};

export const getProducts = (callback) => {
    const ref = collection(db, collectionName);

    return onSnapshot(ref, (snapshot)=>{
        let results = []
        snapshot.docs.forEach(doc => {
            results.push({id: doc.id, ...doc.data()});
        });
        callback(results);
    })
};