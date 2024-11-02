'use client'
import { User } from "@/types";
import { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import dynamic from "next/dynamic"

const ComponentSearchBar = dynamic (() => import('@/app/components/SearchBar'))
const ComponentTableRow = dynamic(() => import('@/app/components/TableRow'))
const ComponentPagination = dynamic(() => import('@/app/components/Pagination'))

export default function UserTable() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedSearchValue] = useDebounce(searchValue, 1000);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 9;

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
      } finally {
        setLoading(!loading);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  }

  const handleReRender = (user: string | User) => {
    if (typeof user == 'object') {
      setUsers((prevUsers) => prevUsers!.map((i) => i.id === user.id ? { ...i, ...user } : i));
    }
    if (typeof user == 'string') setUsers((prevUsers) => prevUsers!.filter((i) => i.id !== user));
  };

  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  }

  const filteredUsers = users?.filter((user) => 
    user.isActive && 
    (user.email.toLowerCase().includes(debouncedSearchValue.toLowerCase()) || 
    user.name.toLowerCase().includes(debouncedSearchValue.toLowerCase()))
  );

  const groupedUsers = filteredUsers ? filteredUsers.reduce<User[][]>((acc, user, index) => {
    if (index % usersPerPage === 0) {
      acc.push([]);
    }
    acc[acc.length - 1].push(user);
    return acc;
  }, []) : [];

  const currentUsers = groupedUsers[currentPage - 1] || [];

  return (
    <>
      <div className="absolute w-[662px] h-[630px] left-[272px] top-[185px] bg-white rounded-2xl">
        <div className="flex justify-between items-center px-5 py-3 font-inter text-[16px] leading-[19px] text-[#343C6A] border-b-2 border-[#E6EFF5]">
          <p className="font-medium">
            Usuarios
          </p>
          <ComponentSearchBar onSearch={handleSearch} />
        </div>
        <div className="font-medium flex px-5 py-5 font-inter text-[16px] leading-[19px] text-[#343C6A] border-b-2 border-[#E6EFF5]">
          <p className="w-1/3 text-left">
            Nombre
          </p>
          <p className="w-1/3 text-center">
            Correo
          </p>
          <div className="w-1/3 text-right"></div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p>Loading...</p>
          </div>
          ) : (
            currentUsers.map((user) => (
              <ComponentTableRow key={user.id} user={user} reRender={handleReRender}/>
            ))
        )}
      </div>
      <div className="absolute w-[333px] h-[40px] left-[599px] top-[862px]">
        <ComponentPagination pages={groupedUsers.length} currentPage={handleCurrentPage}></ComponentPagination>
      </div>
    </>
  )
}
