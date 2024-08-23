import { CredentialResponse, googleLogout } from "@react-oauth/google";
import { jwtDecode, JwtPayload } from 'jwt-decode';
import React, { useEffect, useState, createContext, useContext, ReactNode } from "react";

export interface GoogleJwtPayload extends JwtPayload {
    given_name: string;
    family_name: string;
    name: string;
    picture: string;
    email: string;
    sub: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    login: (credentialResponse: CredentialResponse) => void;
    logout: () => void;
    userData: GoogleJwtPayload | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState<GoogleJwtPayload | null>(null);

    const login = (credentialResponse: CredentialResponse) => {
        accountService.signin(credentialResponse);
        const jwt = accountService.jwt;
        if (jwt) {
            setIsAuthenticated(true);
            setUserData(jwt);
        }
    };

    const logout = () => {
        accountService.signout();
        setIsAuthenticated(false);
        setUserData(null);
    };

    useEffect(() => {
        async function checkAuth() {
            const isSignedIn = await accountService.testSignedInAsync();
            if (isSignedIn) {
                setIsAuthenticated(true);
                setUserData(accountService.jwt);
            }
        }
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, userData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

class AccountService {
    clientId: string;

    private get credentialString(): string | null {
        return localStorage.getItem("credential");
    }

    public get credential(): CredentialResponse | null {
        const credential = this.credentialString;
        if (!credential) {
            return null;
        }
        return JSON.parse(credential);
    }

    public get jwt(): GoogleJwtPayload | null {
        const credential = this.credential;
        if (!credential?.credential) {
            return null;
        }
        const jwt = jwtDecode<GoogleJwtPayload>(credential.credential);
        const expiration = jwt.exp || 0;
        const now = Date.now() / 1000;
        if (expiration <= now) {
            return null;
        }
        return jwt;
    }

    constructor() {
        this.clientId = "238260495393-eefdr8rlaip1ckd4omve4ptf1m0c1bbn.apps.googleusercontent.com";
    }

    public async getUserIdAsync(): Promise<string | null> {
        const credential = this.credentialString;
        if (!credential) {
            return null;
        }
        try {
            const response = await fetch("http://localhost:3001/googleauth/account", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ credential: JSON.parse(credential).credential })
            });
            return await response.text();
        } catch (ex) {
            return null;
        }
    }

    public async verifyTokenAsync(): Promise<boolean> {
        const credential = this.credentialString;
        if (!credential) {
            return false;
        }
        console.log('Sending token for verification:', credential);
        try {
            const response = await fetch("http://localhost:3001/googleauth/account", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ credential: JSON.parse(credential).credential })
            });
            console.log('Response from server:', response);
            return response.ok;
        } catch (ex) {
            console.error('Error verifying token:', ex);
            return false;
        }
    }

    public signin(credentialResponse: CredentialResponse) {
        localStorage.setItem("credential", JSON.stringify(credentialResponse));
    }

    public signout() {
        localStorage.removeItem("credential");
        googleLogout();
    }

    public async testSignedInAsync(): Promise<boolean> {
        const jwt = this.jwt;
        if (!jwt) {
            return false;
        }
        return await this.verifyAsync();
    }

    public async verifyAsync() {
        const userid = await this.getUserIdAsync();
        return !!userid;
    }
}

export const accountService = new AccountService();
export default accountService;