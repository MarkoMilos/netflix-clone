"use client";

import Image from "next/image";
import useCurrentUser from "@/hooks/useCurrentUser";
import {useRouter} from "next/navigation";

export default function Profiles() {
    const {data: user} = useCurrentUser()
    const router = useRouter()

    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col">

                <h1 className="text-white text-3xl md:text-6xl text-center">Who is watching?</h1>

                <div className="flex items-center justify-center gap-8 mt-10">

                    <div
                        className="group"
                        onClick={() => {
                            router.push("/")
                        }}>
                        <div className="
                                w-44
                                h-44
                                rounded-md
                                flex
                                items-center
                                justify-center
                                border-2
                                border-transparent
                                group-hover:cursor-pointer
                                group-hover:border-white
                                overflow-hidden
                            ">
                            <Image src="/images/profile.png" alt="profile" width={176} height={176}/>
                        </div>

                        <div className="
                                mt-4
                                text-gray-400
                                text-2xl
                                text-center
                                group-hover:text-white
                            ">
                            {user?.name}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
