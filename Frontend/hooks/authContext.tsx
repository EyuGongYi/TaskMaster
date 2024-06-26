import { auth } from "@/firebaseConfig";
import { createUserCalendar, setOfflineToken } from "@/scripts/googleApi";
import { EventList, Events, GoogleEventType } from "@/types/event";
import User from "@/types/user";
import { GetTokensResponse, GoogleSignin } from "@react-native-google-signin/google-signin";
import { router, useRootNavigationState, useSegments } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";


// Initial Variable States
const initialState = {
    uid: "",
    providerId: "",
    displayName:"",
    email: "",
    createdAt: "",
    lastLoginAt: "",
}


// For creating  Context
interface ContextInterface {
    user: User | null;
    eventList: Events | undefined,
    setEventList: React.Dispatch<React.SetStateAction<Events| undefined>>;
    signIn: React.Dispatch<React.SetStateAction<User>>;
    signOut: () => void;
}

//Initial Context States
const contextDefaultState: ContextInterface = {
    user: initialState,
    eventList: {},
    setEventList: () => {},
    signIn: () => {},
    signOut: () => {},
}


//Create Context
const AuthContext = createContext(contextDefaultState);

//To get Context variables
export function useAuth():ContextInterface {
    const context = useContext<ContextInterface>(AuthContext);
    if (context == undefined) {
        throw new Error("useAuth must be used within a Provider");
    }

    return context;
}

// Hook For initial rendering
function userProtectedRoute(user: User) {
    const segments = useSegments();
    const navigationState = useRootNavigationState();

    const [hasNavigated, setHasNavigated] = useState(false);

    useEffect(() => {
        //to handle the navigation before stuff gets mounted issue
        if (!navigationState.key || hasNavigated) {
            return;
        }
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
    const [eventList, setEventList] = useState<Events>();

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
                await GoogleSignin.signInSilently();
                createUserCalendar(userData);
                setOfflineToken(userData);
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
                eventList,
                setEventList: setEventList,
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