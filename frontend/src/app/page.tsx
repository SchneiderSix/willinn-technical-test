"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";

export default function Home() {

  const router = useRouter();
  const [storedSession, setStoredSession] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionData = sessionStorage.getItem("userSession");
      if (sessionData) {
        setStoredSession(JSON.parse(sessionData));
        router.push('/home');
      } else {
        router.push('/login');
      }
    }
  }, []);

  return (
    <>
    </>
  );
}
