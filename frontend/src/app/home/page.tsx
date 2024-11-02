'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { User } from "@/types";

export default function HomePage() {
  const router = useRouter();
  const [storedSession, setStoredSession] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionData = sessionStorage.getItem("userSession");
      if (sessionData) {
        setStoredSession(JSON.parse(sessionData));
      } else {
        router.push('/');
      }
    }
  }, []);

  return (
    <>
      {storedSession ? (
        <h1>Nice, {storedSession.email}</h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}
