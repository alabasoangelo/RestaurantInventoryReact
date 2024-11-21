import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db} from "../firebase/config";


const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Holds Firebase Auth user object
    const [userRole, setUserRole] = useState(null); // Holds role: 'admin' or 'employee'
    const [loading, setLoading] = useState(true); // To track loading state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                try {
                    // Fetch role from Firestore
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        setUserRole(userDoc.data().role); // Save role in state
                    } else {
                        console.error("No role found for this user.");
                        setUserRole(null);
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setUserRole(null);
                }
            } else {
                // Reset states if user logs out
                setUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, userRole, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };