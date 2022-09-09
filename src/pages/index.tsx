import Head from "next/head";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../context/auth.context";

export default function LoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");

  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      router.push("/app");
    }
  }, [auth.user, router]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    auth.login({ name }).then((res) => {
      if (res === 200) {
        router.push("/app");
      }
    });
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Head>
        <title> Bem vindo! </title>
      </Head>

      <form onSubmit={handleSubmit} className="bg-black rounded-md w-72">
        <div className="px-6 py-4 border-b border-gray100">
          <h3> Fazer login </h3>
        </div>

        <div className="px-6 py-5 flex items-center">
          <FiUser size={24} className="text-weak" />

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-white bg-transparent outline-none pl-3"
            placeholder="Seu nome"
            required
          />
        </div>

        <div className="flex justify-center pb-4">
          <button className="bg-white text-black px-4 py-2 w-28 rounded-md font-bold">Entrar</button>
        </div>
      </form>
    </div>
  );
}
