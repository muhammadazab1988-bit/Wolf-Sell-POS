"use client";

import { LuChevronDown } from "react-icons/lu";
import Image from "next/image";
import avatar from './avatar.jpeg'

interface UserCardProps {
  name: string;
  role: string;
  avatarSrc: string;
  onClick?: () => void;
}

export default function UserCard({ name, role, avatarSrc, onClick }: UserCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl bg-black px-3 py-2 font-kameron transition-colors hover:bg-slate-800 sm:w-fit"
    >
      <Image
        src={avatar}
        alt={name}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full object-cover"
      />

      <div className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-white">{name}</span>
        <span className="text-xs text-slate-400">{role}</span>
      </div>

      <LuChevronDown className="ml-2 h-5 w-5 text-white" />
    </div>
  );
}