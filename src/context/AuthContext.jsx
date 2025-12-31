import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved user in localStorage on load
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const fakeUser = { name: "Karthik User", email };
                    setUser(fakeUser);
                    localStorage.setItem('user', JSON.stringify(fakeUser));
                    resolve(fakeUser);
                } else {
                    reject(new Error("Invalid credentials"));
                }
            }, 800);
        });
    };

    const signup = async (name, email, password) => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const fakeUser = { name, email };
                    setUser(fakeUser);
                    localStorage.setItem('user', JSON.stringify(fakeUser));
                    resolve(fakeUser);
                } else {
                    reject(new Error("Failed to sign up"));
                }
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
