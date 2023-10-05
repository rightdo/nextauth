'use client'

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const router =useRouter()
    const homeUrl=process.env.NEXTAUTH_URL
  

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn('credentials', {
                email, password, redirect : false,
            })

            if (res.error) {
                setError('유효한 아이디가 아닙니다.')
                return
            }

            router.replace("https://nextauth-eta.vercel.app/dashboard")
        } catch (error) {
            console.log(error)
        }

    }

    return (
    <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4">이메일과 패스워드를 입력하세요.</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input onChange={(e)=> setEmail(e.target.value)} type="text" placeholder="Email"/>
                <input onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password"/>
                <button className=" bg-green-500 text-white py-2 px-6 font-bold cursor-pointer">로그인</button>
                {error  && 
                (<div className=" bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>)}                
                <Link className=" mt-3 text-right text-sm" href={'/register'}>
                    계정이 없으시나요? <span className=" underline">회원가입</span>
                </Link>
            </form>
        </div>
    </div>
    );
} 