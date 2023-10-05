'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function RegisterForm(){

    const [name, setName]=useState("")
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [error, setError]=useState("")
    
    const router = useRouter()

    console.log("Name: ", name)
    const handlerSubmit= async (e)=>{
        e.preventDefault();

        if(!name || !email|| !password){
            setError("모든칸을 채워줘야 합니다.")
            return;
        }
        try{

            const resUserExists = await fetch('api/userExists', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email}),
            });

            const {user} = await resUserExists.json();
            if (user){
                setError("사용자가 이미 등록되었습니다.");
                return;
            }

            const res = await fetch('api/register',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name, email, password,
                }),
            })

            if (res.ok) {
                const form=e.target
                form.reset()
                router.push("/")
            } else {
                console.log("사용자 등록에 실패했습니다.")
            }

        } catch(error){

            console.log("등록중에 에러가 발생했습니다.: ", error)
        }
    }    


  return (
    <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
            <h1 className="text-xl font-bold my-4">회원가입</h1>

            <form className="flex flex-col gap-3" onSubmit={handlerSubmit}>
                <input type="text" placeholder="Full Name" onChange={(e)=>setName(e.target.value)}/>
                <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <button className=" bg-green-500 text-white py-2 px-6 font-bold cursor-pointer">회원가입</button>                                
                {error && (
                    <div className=" bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">{error}</div>
                )}
                
                <Link className=" mt-3 text-right text-sm" href={'/'}>
                    계정이 있으시나요? <span className=" underline">로그인</span>
                </Link>
            </form>
        </div>
    </div>
  )
}

