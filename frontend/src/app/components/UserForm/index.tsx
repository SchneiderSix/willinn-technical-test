


export default function UserForm() {
  return (
    <>
      <div className="font-bold bg-white hidden 2xl:block absolute w-[413px] h-[632px] left-[calc(50%-206.5px+300.5px)] top-[184px] rounded-[25px]">
        <div className="p-10 flex flex-col w-full justify-center">
          <h1 className="border-b-2 border-gray-100 pb-3 text-left text-2xl text-[#343C6A] mb-4">Agregar usuario</h1>
          <form>
            <div className="py-2 border-b-2 border-gray-100">
              <label className="block mb-2 text-sm text-[#343C6A]">Nombre</label>
              <input type="text" placeholder="Introduce el nombre" className="focus-within:border-purple-500 w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none placeholder:text-xs placeholder:font-medium" />

              <label className="block mb-2 text-sm text-[#343C6A]">Apellido</label>
              <input type="text" placeholder="Introduce el apellido" className="focus-within:border-purple-500 w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none placeholder:text-xs placeholder:font-medium" />
            </div>

            <div className="py-2">
              <label className="block mb-2 text-sm text-[#343C6A]">E-mail</label>
              <input type="email" placeholder="Introduce tu E-mail" className="focus-within:border-purple-500 w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none placeholder:text-xs placeholder:font-medium" />

              <label className="block mb-2 text-sm text-[#343C6A]">Contraseña</label>
              <input type="password" placeholder="Introduce tu contraseña" className="focus-within:border-purple-500 w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none placeholder:text-xs placeholder:font-medium" />
            </div>

            
            <div className="flex items-center mb-4">
              <label className="pr-4 block mb-2 text-sm text-[#343C6A]">Activar</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" title="active" />
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
