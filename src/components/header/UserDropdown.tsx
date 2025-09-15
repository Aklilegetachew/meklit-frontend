import { useState } from "react"

import { Dropdown } from "../ui/dropdown/Dropdown"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleDropdown() {
    setIsOpen(!isOpen)
  }

  function closeDropdown() {
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
      >
        <span className="mr-4 overflow-hidden rounded-full h-8 w-8">
          <img src="/images/user/test.png" alt="User" />
        </span>
        <span className="block mr-1 font-medium text-theme-sm">Abel</span>
        {isOpen ? (
          <ChevronUp className="stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200" />
        ) : (
          <ChevronDown className="stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200" />
        )}
        `
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        {/* User info */}
        <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            Abel
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            abel@meklit.life
          </span>
        </div>

        {/* Menu items */}
        <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <span className="flex items-center gap-3 px-3 py-2 font-medium text-gray-400 rounded-lg group text-theme-sm cursor-not-allowed opacity-50">
              Edit profile
            </span>
          </li>
          <li>
            <span className="flex items-center gap-3 px-3 py-2 font-medium text-gray-400 rounded-lg group text-theme-sm cursor-not-allowed opacity-50">
              Account settings
            </span>
          </li>
          <li>
            <span className="flex items-center gap-3 px-3 py-2 font-medium text-gray-400 rounded-lg group text-theme-sm cursor-not-allowed opacity-50">
              Support
            </span>
          </li>
        </ul>

        {/* Sign out (disabled too) */}
        <span
          onClick={closeDropdown}
          className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-400 rounded-lg group text-theme-sm cursor-not-allowed opacity-50"
        >
          Sign out
        </span>
      </Dropdown>
    </div>
  )
}
