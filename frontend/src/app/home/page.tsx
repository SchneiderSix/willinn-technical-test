'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { User } from "@/types";
import dynamic from "next/dynamic"

const ComponentSidebar = dynamic (() => import('@/app/components/Sidebar'))

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
      <div
      className="absolute w-[227px] h-[972px] left-0 top-0 bg-white">
        <ComponentSidebar></ComponentSidebar>
      </div>
    </>
  );
}
