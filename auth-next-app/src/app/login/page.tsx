"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function SignUpPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-slate-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl flex flex-col p-8">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Log In
        </h1>

        <label
          htmlFor="email"
          className="text-sm font-semibold text-slate-600 mb-1.5"
        >
          Email
        </label>
        <input
          id="email"
          className="p-3 mb-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400 text-slate-800"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        />

        <label
          htmlFor="password"
          className="text-sm font-semibold text-slate-600 mb-1.5"
        >
          Password
        </label>
        <input
          id="password"
          className="p-3 mb-6 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400 text-slate-800"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />

        <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.99] transition-all cursor-pointer">
          Log In
        </button>
        <Link className="mt-2 text-blue-500 font-semibold" href="/signup">
          Not logged in yet?
        </Link>
      </div>
    </div>
  );
}
