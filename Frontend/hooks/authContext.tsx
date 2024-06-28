import { auth } from "@/firebaseConfig";
import { GetTokensResponse } from "@react-native-google-signin/google-signin";
import { router, useRootNavigationState, useSegments } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
    uid: string,
    providerId: string,
    displayName: string,
    email: string,
    createdAt: string,
    lastLoginAt: string,
}

const initialState = {
    uid: "",
    providerId: "",
    displayName:"",
    email: "",
    createdAt: "",
    lastLoginAt: "",
}

const initialTokenState = {
    idToken: "",
    accessToken: "",
}

interface ContextInterface {
    user: User | null;
    token: any,
    signIn: React.Dispatch<React.SetStateAction<User>>;
    signOut: () => void;
    setTokens: React.Dispatch<React.SetStateAction<GetTokensResponse>>;
}

const contextDefaultState: ContextInterface = {
    user: initialState,
    token: initialTokenState,
    signIn: () => {},
    signOut: () => {},
    setTokens: () => {},
}



const AuthContext = createContext(contextDefaultState);


export function useAuth():ContextInterface {
    const context = useContext<ContextInterface>(AuthContext);
    if (context == undefined) {
        throw new Error("useAuth must be used within a Provider");
    }

    return context;
}

// Hook
function userProtectedRoute(user: User) {
    const segments = useSegments();
    const navigationState = useRootNavigationState();

    const [hasNavigated, setHasNavigated] = useState(false);

    useEffect(() => {
        //to handle the navigation before stuff gets mounted issue
        if (!navigationState.key || hasNavigated) return;
        const inAuthGroup = segments[0] === "/(auth)";
        
        if(!user.uid && !inAuthGroup) {
            router.replace("/(auth)");
            setHasNavigated(true);
        } else if (user.uid && inAuthGroup) {
            router.replace("/(screens)");
            setHasNavigated(true);
        }
    }, [user.uid, segments, navigationState, hasNavigated])
}

//Provider
export function AuthProvider({children}: React.PropsWithChildren):JSX.Element {
    const [user, setUser] = useState<User>(initialState);
    const [token, setToken] = useState<GetTokensResponse>(initialTokenState);

    userProtectedRoute(user);

    useEffect(() => {
        const unSubAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData: User ={
                    uid: user.providerData[0].uid,
                    providerId: user.providerData[0].providerId,
                    displayName: user.providerData[0].displayName ?? "",
                    email: user.providerData[0].email! ,
                    createdAt: user.metadata.creationTime!,
                    lastLoginAt: user.metadata.creationTime!,
                };
                setUser(userData);
                router.replace("/(screens)");
            } else {
                console.log("User is not authenticated");
                router.replace("/(auth)");
            }
        });
        return unSubAuth;
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                setTokens: setToken,
                signIn: setUser,
                signOut: () => {
                    setUser(initialState);
                    signOut(auth);
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}