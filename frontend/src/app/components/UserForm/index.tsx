import { UserFull } from "@/types";
import { FormEvent } from "react"

interface UserFormProps {
  reRender: () => void;
}

const UserForm: React.FC<UserFormProps> = ({reRender}) => {

  const createUser = async (user: UserFull) => {
    try {
      const response = await fetch('http://localhost:8090/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
      });

      if (response.status === 200) {
        alert(`Usuario creado a nombre de ${user.name}`);
        reRender();
      } else if (response.status === 409) {
        alert('E-mail en uso');
        return;
      } else {
        const contentType = response.headers.get("content-type");
        const errorMessage = contentType && contentType.includes("application/json")
          ? (await response.json()).message
          : await response.text();
    
        alert(errorMessage);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch(e) {
      console.error('Error during fetch:', e);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const user = {
      "id": "x",
      "name": formData.get('name')?.toString() + ' ' + formData.get('surname')?.toString(),
      "email": formData.get('email')?.toString() as string,
      "password": formData.get('password')?.toString() as string,
      "isActive": formData.get('isActive') === 'on'
    }

    if (user.email == null || user.password == null || user.email.length == 0 || user.password.length == 0) {
      alert('Credenciales invalidas');
      return;
    } else if (user.name.length > 30) {
      alert('Nombre demasiado largo, 30 caracteres como maximo');
      return;
    } else if (user.email.length > 100) {
      alert('E-mail demasiado largo, 100 caracteres como maximo');
      return;
    } else if (user.password.length > 100) {
      alert('Contraseña demasiada larga, 100 caracteres como maximo');
      return;
    } else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[\S]{8,}$/.test(user.password)) {
      alert('Contraseña debe contener al menos un caracter espacial, un numero, una letra en minuscula y otra letra en mayuscula');
      return;
    }

    createUser(user);

  }

  return (
    <>
      <div className="bg-white hidden 2xl:block absolute w-[413px] h-[632px] left-[calc(50%-206.5px+300.5px)] top-[184px] rounded-[25px]">
        <div className="p-10 flex flex-col w-full justify-center">
          <h1 className="font-bold border-b-2 border-gray-100 pb-3 text-left text-2xl text-[#343C6A] mb-4">Agregar usuario</h1>
          <form onSubmit={handleSubmit}>
            <div className="py-2 border-b-2 border-gray-100">
              <label className="font-bold block mb-2 text-sm text-[#343C6A]">Nombre</label>
              <input name="name" type="text" placeholder="Introduce el nombre" className="focus-within:border-purple-500 w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none placeholder:text-xs placeholder:font-medium" />

              <label className="font-bold block mb-2 text-sm text-[#343C6A]">Apellido</label>
              <input name="surname"  type="text" placeholder="Introduce el apellido" className="focus-within:border-purple-500 w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none placeholder:text-xs placeholder:font-medium" />
            </div>

            <div className="py-2">
              <label className="font-bold block mb-2 text-sm text-[#343C6A]">E-mail</label>
              <input name="email" type="email" placeholder="Introduce tu E-mail" className="focus-within:border-purple-500 w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none placeholder:text-xs placeholder:font-medium" />

              <label className="font-bold block mb-2 text-sm text-[#343C6A]">Contraseña</label>
              <input name="password" type="password" placeholder="Introduce tu contraseña" className="focus-within:border-purple-500 w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none placeholder:text-xs placeholder:font-medium" />
            </div>

            
            <div className="flex items-center mb-4">
              <label className="font-bold pr-4 block mb-2 text-sm text-[#343C6A]">Activar</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input name="isActive" type="checkbox" className="sr-only peer" title="active" />
                <div className="w-[43.74px] h-[26px] bg-gray-300 rounded-full peer-checked:bg-emerald-500  transition-colors"></div>
                <div className="absolute left-0 top-0 bottom-0 m-[3px] w-[20px] h-[20px] bg-white rounded-full transition-transform peer-checked:translate-x-[17px]"></div>
              </label>
            </div>

            <button type="submit" className="my-6 w-full p-2 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg">Guardar</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default UserForm;
