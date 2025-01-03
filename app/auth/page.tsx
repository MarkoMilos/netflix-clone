"use client";

import axios from "axios";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import Input from "@/components/Input";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant(currentVariant => (currentVariant === "login" ? "register" : "login"));
  }, []);

  /* eslint-disable no-console */
  const login = useCallback(async () => {
    try {
      // Call `signIn` and capture the result
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });

      // TODO handle here rendering of error message to the user
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
        password,
      });

      await login();
    } catch (error) {
      console.error(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative size-full bg-[url('/images/hero.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="size-full bg-black lg:bg-black/50">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" alt="logo" width="150" height="50" />
        </nav>

        <div className="flex justify-center">
          <div className="bg-opacity/70 mt-2 w-full self-center rounded-md bg-black p-16 lg:w-2/5 lg:max-w-md">
            <h2 className="mb-8 text-4xl font-semibold text-white">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>

            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="name"
                  label="Username"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              )}

              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />

              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="mt-10 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700"
              onClick={variant === "login" ? login : register}
            >
              {variant === "login" ? "Sign in" : "Register"}
            </button>

            <div className="mt-8 flex flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {}}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80"
                aria-label="Sign in with Google"
              >
                <FcGoogle size={30} />
              </button>
              <button
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80"
                aria-label="Sign in with GitHub"
              >
                <FaGithub size={30} />
              </button>
            </div>

            <p className="mt-12 text-neutral-500">
              {variant === "login" ? "First time using Netflix?" : "Already have an account?"}
              <button
                type="button"
                className="ml-1 cursor-pointer text-white hover:underline"
                onClick={toggleVariant}
              >
                {variant === "login" ? "Create an account." : "Sign in."}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
