import Image from "next/image";
import React from "react";

import editIconUrl from "@/assets/icons/edit.svg?url";
import Icon from "@/components/Icons";

export default async function TestPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Icon name="transfer" className="size-12 text-white" />
      <Image src={editIconUrl} alt="Edit Icon" width={24} height={24} className="text-white" />
      <p className="text-white text-[20px] font-light">Netflix font - My profile</p>
      <p className="text-white text-[20px]">Netflix font - My profile</p>
      <p className="text-white text-[20px] font-sans">Netflix font - My profile</p>
      <p className="text-white text-[20px] font-medium">Netflix font - My profile</p>
      <p className="text-white text-[20px] font-bold">Netflix font - My profile</p>
    </div>
  );
}
