import { FormEvent } from "react";

export default function LoginForm() {

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:8090/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
  
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center p-10 gap-7 
            absolute w-[540px] h-[438px] 
            left-[calc(50%_-_270px_-_12px)] top-[197px] 
            bg-white shadow-[0px_4px_10px_rgba(138,142,148,0.05)] 
            rounded-lg">
        <h1 className="w-[150px] h-[36px] 
                font-medium text-[24px] leading-[36px] 
               text-[#282828]">
          Inicia sesión
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-start gap-6 w-full">
          <div className="w-full space-y-2">
            <label className=" font-medium  text-[#282828]">
              E-mail
            </label>
            <div className="box-border flex items-center p-4 gap-2 
                w-full h-[52px] 
                bg-white border border-[#E8E9EA] rounded-[6px] 
                focus-within:border-[#F72793]">
              <input 
                type="email" 
                placeholder="Introduce tu email" 
                className=" font-medium flex-grow border-none outline-none focus:outline-none focus:border-transparent"
              />
            </div>
          </div>
          <div className="w-full space-y-2">
            <label className="font-medium text-[#282828]">
              Contraseña
            </label>
            <div className="box-border flex items-center p-4 gap-2 
                w-full h-[52px] 
                bg-white border border-[#E8E9EA] rounded-[6px] 
                focus-within:border-[#F72793]">
              <input 
                type="password" 
                placeholder="Introduce tu contraseña" 
                className=" font-medium flex-grow border-none outline-none focus:outline-none focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex flex-col items-end w-full gap-3">
            <button type="submit" className="flex justify-center items-center 
               px-[49px] py-[14px] gap-2 
               w-full h-[52px] 
               bg-[#F72793] text-white rounded-[6px]
               hover:bg-[#d31e7d] transition-colors duration-200">
              Ingresar
            </button>
            <button type="button" className="text-[#263A66] text-sm truncate">
              Olvidaste la contraseña?
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
