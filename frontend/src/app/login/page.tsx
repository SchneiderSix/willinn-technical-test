'use client'

import dynamic from "next/dynamic"

const ComponentLogo = dynamic (() => import('@/app/components/Logo'))
const ComponentLoginForm = dynamic(() => import('@/app/components/LoginForm'))

export default function LoginPage() {
  return (
    <>
      <div className="absolute top-[135px] left-1/2" style={{ transform: 'translateX(-50%)' }}>
        <ComponentLogo></ComponentLogo>
      </div>
      <ComponentLoginForm></ComponentLoginForm>
    </>
  )
}