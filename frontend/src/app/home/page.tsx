'use client'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { User } from "@/types";
import dynamic from "next/dynamic"

const ComponentSidebar = dynamic (() => import('@/app/components/Sidebar'))

export default function HomePage() {
  const router = useRouter();
  const [storedSession, setStoredSession] = useState<User | null>(null);
  const [activeItem, setActiveItem] = useState<string>('Inicio');

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

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <>
      <div
      className="absolute w-[227px] h-[972px] left-0 top-0 bg-white">
        <ComponentSidebar activeItem={activeItem} onItemClick={handleItemClick} ></ComponentSidebar>
      </div>

      <p className="absolute w-[120px] h-[34px] left-[272px] top-[99px] font-inter font-semibold text-[28px] leading-[34px] text-[#0C1646]">
        {activeItem}
      </p>
    </>
  );
}
