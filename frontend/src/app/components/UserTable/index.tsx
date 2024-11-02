'use client'
import { User } from "@/types";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic"

const ComponentSearchBar = dynamic (() => import('@/app/components/SearchBar'))

export default function UserTable() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');

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
      {users?.filter((user) => user.isActive && (user.email.toLowerCase().includes(searchValue.toLowerCase()) || user.name.toLowerCase().includes(searchValue.toLowerCase())))
      .map((user) => (
        <li key={user.id}>
        <p>Name: {user.name}</p>
        </li>
      ))}
      <div className="absolute w-[662px] h-[630px] left-[272px] top-[185px] bg-white rounded-2xl">
        <div className="p-5 font-inter font-medium text-[16px] leading-[19px] text-[#343C6A] border-b-2 border-[#E6EFF5]">
          <p>
            Usuarios
          </p>
          <ComponentSearchBar onSearch={handleSearch} />
        </div>
      </div>
    </>
  )
}
