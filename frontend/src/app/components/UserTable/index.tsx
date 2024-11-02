'use client'
import { User } from "@/types";
import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import dynamic from "next/dynamic"

const ComponentSearchBar = dynamic (() => import('@/app/components/SearchBar'))

export default function UserTable() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8090/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users:', response.status);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  }

  return (
    <>
      {users?.filter((user) => user.isActive && (user.email.toLowerCase().includes(debouncedSearchValue.toLowerCase()) || user.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())))
      .map((user) => (
        <li key={user.id}>
        <p>Name: {user.name}</p>
        </li>
      ))}
      <div className="absolute w-[662px] h-[630px] left-[272px] top-[185px] bg-white rounded-2xl">
        <div className="flex justify-between items-center px-5 py-3 font-inter text-[16px] leading-[19px] text-[#343C6A] border-b-2 border-[#E6EFF5]">
          <p className="font-medium">
            Usuarios
          </p>
          <ComponentSearchBar onSearch={handleSearch} />
        </div>
        <div className="font-medium flex items-center px-5 py-5 font-inter text-[16px] leading-[19px] text-[#343C6A] border-b-2 border-[#E6EFF5]">
          <p className="flex-1 text-left">
            Nombre
          </p>
          <p className="text-center w-full">
            Correo
          </p>
          <div className="flex-1"></div>
        </div>
      </div>
    </>
  )
}
