'use client'
import { User } from "@/types"
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation';

interface TableRowProprs {
  user: User;
  reRender: (user: string | User ) => void;
}

const TableRow: React.FC<TableRowProprs> = ({ user, reRender }) => {

  const [more, setMore] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const router = useRouter()

  const currentUser: User = JSON.parse(sessionStorage.getItem("userSession") as string);

  const deleteUser = async(id: string, name: string) => {
    try {
      const response = await fetch(`http://localhost:8090/api/users/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status == 204) {
        alert(`Usuario a nombre de ${name} fue borrado`);
      } else {
        console.error('Failed to delete users:', response.status);
      }
    } catch(e) {
      console.error('Error during fetch:',e)
    }
  }

  const editUser = async(user : User) => {
    try {
      const response = await fetch(`http://localhost:8090/api/users/${user.id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });

      if (response.status == 204) {
        alert(`Usuario a nombre de ${user.name} fue editado`);
      } else {
        console.error('Failed to delete users:', response.status);
      }
    } catch(e) {
      console.error('Error during fetch:',e)
    }
  }

  const handleDelete = async () => {

    if(currentUser.id != user.id) {
      const confirmDelete = window.confirm(`Estas seguro de que quieres borrar al usuario ${user.email}?`);

      if(confirmDelete) {
        // Delete user
        await deleteUser(user.id, user.name);
        // Re render
        reRender(user.id);
      }
    } else {
      const confirmDelete = window.confirm(`Estas seguro de que quieres borrar tu usuario?`);
      if (confirmDelete) {
        // Delete own user
        await deleteUser(currentUser.id, currentUser.name);
        // Delete session
        sessionStorage.removeItem("userSession");
        // Redirect to home
        router.push('/');
      }
    }
  }

  const handleEdit = () => {
    if (edit == false) {
      // Show name and email inputs
      setEdit(!edit);
      return;
    } else {
      // Work as a submit button

      if (
        nameRef.current?.value == null || 
        emailRef.current?.value == null ||
        nameRef.current.value.length == 0 ||
        emailRef.current.value.length == 0
      ) {
        alert('Credenciales invalidas');
        return;
      } else if (
        nameRef.current.value.length > 30
      ) {
        alert('Nombre demasiado largo, 30 caracteres como maximo');
        return;
      } else if (
        emailRef.current.value.length > 100
      ) {
        alert('E-mail demasiado largo, 100 caracteres como maximo');
        return;
      }
      
      const selectedUser = {
        id: user.id,
        password: '',
        name: nameRef.current?.value,
        email: emailRef.current?.value
      }
      editUser(selectedUser);
      setEdit(!edit);
      reRender(selectedUser);
    }
  }

  return (
    <div className="flex flex-row px-5">
      <div className="py-3 border-b-2 border-[#E6EFF5] flex flex-row w-full">
        {edit? (
          <>
            <input ref={nameRef} title="name" type="text" defaultValue={user.name} className="p-1 m-2 rounded-md bg-[#e0e2e6] w-1/3 text-left overflow-hidden text-ellipsis whitespace-nowrap"/>
          </>
        ) : (
          <>
            <p className="w-1/3 text-left overflow-hidden text-ellipsis whitespace-nowrap">
              {user.name}
            </p>
          </>
        )}
        {edit? (
          <>
            <input ref={emailRef} title="email" type="text" defaultValue={user.email} className="p-1 m-2 rounded-md bg-[#e0e2e6] w-1/3 text-left overflow-hidden text-ellipsis whitespace-nowrap"/>
          </>
        ) : (
          <>
            <p className="w-1/3 text-left overflow-hidden text-ellipsis whitespace-nowrap">
              {user.email}
            </p>
          </>
        )}
        <div className="w-1/3 flex justify-end">
          {!more ? (
            <>
              <svg 
              className="cursor-pointer"
              onClick={(() => setMore(!more))}
              width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#F5F7FA"/>
              <path d="M21.6078 16.8672C21.3625 16.8673 21.1196 16.819 20.893 16.7252C20.6663 16.6315 20.4604 16.4939 20.2869 16.3205C20.1134 16.1472 19.9757 15.9413 19.8818 15.7147C19.7878 15.4881 19.7395 15.2453 19.7394 15C19.7393 14.7547 19.7875 14.5118 19.8813 14.2852C19.9751 14.0585 20.1126 13.8526 20.286 13.6791C20.4594 13.5056 20.6653 13.3679 20.8918 13.274C21.1184 13.1801 21.3613 13.1317 21.6066 13.1316C22.102 13.1314 22.5771 13.3281 22.9275 13.6782C23.2779 14.0284 23.4748 14.5034 23.475 14.9988C23.4751 15.4942 23.2785 15.9693 22.9283 16.3197C22.5782 16.6701 22.1032 16.867 21.6078 16.8672Z" fill="#0C1646"/>
              <path d="M15.1974 16.8672C16.2286 16.8672 17.0646 16.0312 17.0646 15C17.0646 13.9688 16.2286 13.1328 15.1974 13.1328C14.1662 13.1328 13.3302 13.9688 13.3302 15C13.3302 16.0312 14.1662 16.8672 15.1974 16.8672Z" fill="#0C1646"/>
              <path d="M8.78578 16.8672C9.817 16.8672 10.653 16.0312 10.653 15C10.653 13.9688 9.817 13.1328 8.78578 13.1328C7.75455 13.1328 6.91858 13.9688 6.91858 15C6.91858 16.0312 7.75455 16.8672 8.78578 16.8672Z" fill="#0C1646"/>
              </svg>

            </>
          ) :  (
            <>
              <div
              className="flex justify-between px-3 absolute w-[102px] bg-[#F5F7FA] rounded-[26px]">
                <svg 
                className="cursor-pointer"
                onClick={handleDelete}
                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.19667 20.0217 5.00067 19.5507 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8043 20.021 18.413 20.413C18.0217 20.805 17.5507 21.0007 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" 
                  fill={`${currentUser.id != user.id ? '#F72793' : '#0C1646'}`}/>
                </svg>
                <svg 
                onClick={handleEdit}
                className="cursor-pointer"
                width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 19H6.425L16.2 9.225L14.775 7.8L5 17.575V19ZM3 21V16.75L16.2 3.575C16.4 3.39167 16.621 3.25 16.863 3.15C17.105 3.05 17.359 3 17.625 3C17.891 3 18.1493 3.05 18.4 3.15C18.6507 3.25 18.8673 3.4 19.05 3.6L20.425 5C20.625 5.18333 20.771 5.4 20.863 5.65C20.955 5.9 21.0007 6.15 21 6.4C21 6.66667 20.9543 6.921 20.863 7.163C20.7717 7.405 20.6257 7.62567 20.425 7.825L7.25 21H3ZM15.475 8.525L14.775 7.8L16.2 9.225L15.475 8.525Z" 
                  fill={`${edit ? '#28A745' : '#0C1646'}`}/>
                </svg>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default TableRow;
