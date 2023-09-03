"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

import AuthProviders from "./AuthProviders";

export default function Nav() {
  const { data: session, status } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProvider();
  }, []);

  async function onGoogleLogin(provider) {
    try {
      signIn(provider.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          className="object-contain"
          alt="prompttopia logo"
          width={30}
          height={30}
        />
        <p className="logo_text">Prompttopia</p>
      </Link>

      <div className="sm:flex hidden">
        {status === "authenticated" ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Prompt
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session.user.image}
                width="37"
                height="37"
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          providers && (
            <AuthProviders
              providers={providers}
              onGoogleLogin={onGoogleLogin}
            />
          )
        )}
      </div>

      <div className="sm:hidden flex relative">
        {status === "authenticated" ? (
          <div className="flex">
            <Image
              src={session.user.image}
              width="37"
              height="37"
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          providers && (
            <AuthProviders
              providers={providers}
              onGoogleLogin={onGoogleLogin}
            />
          )
        )}
      </div>
    </nav>
  );
}
