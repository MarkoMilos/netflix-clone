"use client";

import Image from "next/image";
import Input from "@/components/Input";
import {useCallback, useState} from "react";
import axios from "axios";
import {signIn} from "next-auth/react";

import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";


export default function Auth() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [variant, setVariant] = useState("login");

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === "login" ? "register" : "login");
    }, [])

    const login = useCallback(async () => {
        try {
            // Call `signIn` and capture the result
            const result = await signIn("credentials", {
                email,
                password,
                callbackUrl: "/profiles"
            });

            // Check if `signIn` was successful
            if (result?.error) {
                console.error("Failed to login:", result.error);
            } else {
                console.log("Logged in successfully!");
            }
        } catch (error) {
            console.error("Unexpected error during login!");
            console.error(error);
        }
    }, [email, password]);

    const register = useCallback(async () => {
        try {
            await axios.post("/api/auth/register", {
                email,
                name,
                password
            });

            await login();
        } catch (error) {
            console.error(error);
        }
    }, [email, name, password, login]);

    return (
        <div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
            <div className="bg-black w-full h-full lg:bg-opacity-50">

                <nav className="px-12 py-5">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width="150"
                        height="50"
                    />
                </nav>

                <div className="flex justify-center">
                    <div
                        className="bg-black bg-opacity-70 px-16 py-16 mt-2 self-center w-full lg:w-2/5 lg:max-w-md rounded-md ">

                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === "login" ? "Sign in" : "Register"}
                        </h2>

                        <div className="flex flex-col gap-4">
                            {variant === "register" && (
                                <Input
                                    id="name"
                                    label="Username"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            )}

                            <Input
                                id="email"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                id="password"
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
                            onClick={variant === "login" ? login : register}>
                            {variant === "login" ? "Sign in" : "Register"}
                        </button>

                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={30}/>
                            </div>
                            <div
                                onClick={() => signIn("github", {callbackUrl: "/profiles"})}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={30}/>
                            </div>
                        </div>

                        <p className="text-neutral-500 mt-12">
                            {variant === "login" ? "First time using Netflix?" : "Already have an account?"}
                            <span className="text-white cursor-pointer ml-1 hover:underline" onClick={toggleVariant}>
                                {variant === "login" ? "Create an account." : "Sign in."}
                            </span>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    )
}
