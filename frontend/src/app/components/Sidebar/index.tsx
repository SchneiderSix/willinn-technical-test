import dynamic from "next/dynamic"

const ComponentLogo = dynamic (() => import('@/app/components/Logo'))

export default function Sidebar() {
  return (
    <>
        <div className="flex justify-center mt-20">
        <ComponentLogo></ComponentLogo>
        </div>
        <div className="flex flex-col items-start gap-[40px] absolute w-[130px] h-[91px] left-[46px] top-[183px]">
          <div className="flex flex-row items-center px-6 gap-[26px] w-[95px] h-[23px] order-0 flex-grow-0">
          <svg 
          className="absolute left-0 right-[0.01%] top-0 bottom-0"
          width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.3794 10.0039C22.3788 10.0034 22.3783 10.0028 22.3778 10.0023L12.9956 0.620483C12.5957 0.220398 12.064 0 11.4984 0C10.9329 0 10.4012 0.220222 10.0011 0.620308L0.623841 9.9974C0.620682 10.0006 0.617524 10.0039 0.614365 10.007C-0.206863 10.833 -0.205459 12.1731 0.618401 12.997C0.994797 13.3736 1.49192 13.5917 2.02344 13.6145C2.04502 13.6166 2.06678 13.6176 2.08872 13.6176H2.46265V20.5221C2.46265 21.8884 3.5743 23 4.9409 23H8.61151C8.98352 23 9.28534 22.6984 9.28534 22.3262V16.9131C9.28534 16.2896 9.79247 15.7825 10.4159 15.7825H12.581C13.2044 15.7825 13.7115 16.2896 13.7115 16.9131V22.3262C13.7115 22.6984 14.0132 23 14.3854 23H18.056C19.4226 23 20.5342 21.8884 20.5342 20.5221V13.6176H20.881C21.4464 13.6176 21.978 13.3974 22.3783 12.9973C23.203 12.1721 23.2034 10.8297 22.3794 10.0039Z" fill="#CECDCD"/>
          </svg>
          <p
          className="w-[46px] h-[22px] px-6 font-medium text-[18px] leading-[22px] text-[#CECDCD] flex-none order-1 flex-grow-0"
          >Inicio</p>
          </div>
          <div className="flex flex-row items-center p-0 gap-6 w-[130px] h-[28px] flex-none order-1 flex-grow-0">
          <svg 
          className="w-7 h-7 flex-none order-0 flex-grow-0"
          width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9.33301 4.6666C8.09533 4.6666 6.90835 5.15827 6.03318 6.03344C5.15801 6.90861 4.66634 8.09559 4.66634 9.33327C4.66634 10.5709 5.15801 11.7579 6.03318 12.6331C6.90835 13.5083 8.09533 13.9999 9.33301 13.9999C10.5707 13.9999 11.7577 13.5083 12.6328 12.6331C13.508 11.7579 13.9997 10.5709 13.9997 9.33327C13.9997 8.09559 13.508 6.90861 12.6328 6.03344C11.7577 5.15827 10.5707 4.6666 9.33301 4.6666ZM6.99967 15.1666C5.762 15.1666 4.57501 15.6583 3.69984 16.5334C2.82467 17.4086 2.33301 18.5956 2.33301 19.8333V20.9999C2.33301 21.6188 2.57884 22.2123 3.01643 22.6498C3.45401 23.0874 4.0475 23.3333 4.66634 23.3333H13.9997C14.6185 23.3333 15.212 23.0874 15.6496 22.6498C16.0872 22.2123 16.333 21.6188 16.333 20.9999V19.8333C16.333 18.5956 15.8413 17.4086 14.9662 16.5334C14.091 15.6583 12.904 15.1666 11.6663 15.1666H6.99967ZM15.458 12.7224C16.0157 11.7191 16.333 10.5641 16.333 9.33327C16.3333 8.14728 16.0322 6.98067 15.458 5.94293C16.1205 5.31612 16.9521 4.89715 17.85 4.7378C18.748 4.57846 19.673 4.68572 20.5107 5.04633C21.3483 5.40695 22.062 6.00511 22.5634 6.76689C23.0648 7.52867 23.3321 8.42069 23.3321 9.33268C23.3321 10.2447 23.0648 11.1367 22.5634 11.8985C22.062 12.6603 21.3483 13.2584 20.5107 13.619C19.673 13.9797 18.748 14.0869 17.85 13.9276C16.9521 13.7682 16.1205 13.3492 15.458 12.7224ZM18.0433 23.3333C18.44 22.6473 18.6675 21.8504 18.6675 20.9999V19.8333C18.6697 18.111 18.0347 16.4488 16.8848 15.1666H20.9997C22.2374 15.1666 23.4243 15.6583 24.2995 16.5334C25.1747 17.4086 25.6663 18.5956 25.6663 19.8333V20.9999C25.6663 21.6188 25.4205 22.2123 24.9829 22.6498C24.5453 23.0874 23.9518 23.3333 23.333 23.3333H18.0433Z" fill="#F72793"/>
          </svg>
          <p
          className="w-[76px] h-[22px] font-inter font-medium text-[18px] leading-[22px] text-[#F72793] flex-none order-1 flex-grow-0"
          >Usuarios</p>
          </div>
        </div>
    </>
  )
}