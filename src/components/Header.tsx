import { LuCheck, LuDownload, LuPrinter, LuScanBarcode } from "react-icons/lu";
import UserCard from "./UserCard";


export default function Header() {
  return (
    <div>
      <header className="flex h-auto w-full flex-col items-stretch gap-3 rounded-2xl bg-amber-50 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <label className="input flex h-[3.25rem] items-center rounded-3xl bg-amber-600 sm:h-[3.75rem] sm:flex-1">
          <svg
            className="h-5 w-5 opacity-50 sm:h-6 sm:w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search for products"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/70 sm:text-base"
          />
        </label>
        <div className="flex items-center gap-2 sm:gap-3">
          <LuScanBarcode className="h-[3.25rem] w-[3.25rem] rounded-2xl bg-amber-600 p-2 sm:h-[3.75rem] sm:w-[3.75rem]" />
          <UserCard
            name="MO-AZAB"
            role="Counter 1"
            avatarSrc="/avatar.jpeg"
            onClick={() => console.log("clicked")}
          />
        </div>
      </header>
    </div>
  );
}
