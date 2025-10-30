"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { useActiveAccount } from "thirdweb/react";
import { ConnectWalletButton } from "../auth/ConnectWalletButton";
import TopUp from "../Topup";

export default function Header() {
  const account = useActiveAccount();
  const router = useRouter();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip the check on initial mount to allow account to load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Only redirect if account is still undefined after initial load
    if (!account?.address) {
      router.push("/login");
    }
  }, [account, router]);

  return (
    <div className="w-full bg-[#050505]">
      {/* Header Content */}
      <div className="flex items-center justify-end px-8 py-5 h-[88px]">
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="flex items-center justify-center p-2.5 cursor-pointer hover:bg-[#191919] rounded-lg transition-colors">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.7936 16.4944C20.2733 15.5981 19.4999 13.0622 19.4999 9.75C19.4999 7.76088 18.7097 5.85322 17.3032 4.4467C15.8967 3.04018 13.989 2.25 11.9999 2.25C10.0108 2.25 8.10311 3.04018 6.69659 4.4467C5.29007 5.85322 4.49989 7.76088 4.49989 9.75C4.49989 13.0631 3.72551 15.5981 3.2052 16.4944C3.07233 16.7222 3.00189 16.9811 3.00099 17.2449C3.00008 17.5086 3.06874 17.768 3.20005 17.9967C3.33135 18.2255 3.52065 18.4156 3.74886 18.5478C3.97708 18.6801 4.23613 18.7498 4.49989 18.75H8.32583C8.49886 19.5967 8.95904 20.3577 9.62851 20.9042C10.298 21.4507 11.1357 21.7492 11.9999 21.7492C12.8641 21.7492 13.7018 21.4507 14.3713 20.9042C15.0407 20.3577 15.5009 19.5967 15.674 18.75H19.4999C19.7636 18.7496 20.0225 18.6798 20.2506 18.5475C20.4787 18.4151 20.6678 18.225 20.799 17.9963C20.9302 17.7676 20.9988 17.5083 20.9979 17.2446C20.9969 16.9809 20.9265 16.7222 20.7936 16.4944ZM11.9999 20.25C11.5347 20.2499 11.081 20.1055 10.7013 19.8369C10.3215 19.5683 10.0343 19.1886 9.87926 18.75H14.1205C13.9655 19.1886 13.6783 19.5683 13.2985 19.8369C12.9187 20.1055 12.4651 20.2499 11.9999 20.25ZM4.49989 17.25C5.22176 16.0087 5.99989 13.1325 5.99989 9.75C5.99989 8.1587 6.63203 6.63258 7.75725 5.50736C8.88247 4.38214 10.4086 3.75 11.9999 3.75C13.5912 3.75 15.1173 4.38214 16.2425 5.50736C17.3677 6.63258 17.9999 8.1587 17.9999 9.75C17.9999 13.1297 18.7761 16.0059 19.4999 17.25H4.49989Z"
                fill="#5D5D5D"
              />
            </svg>
          </div>

          {/* Top up Button */}

          <div>
            <div>
              <TopUp />
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 py-3 px-4 bg-[#191919] rounded-[20px] cursor-pointer hover:bg-[#2B2B2B] transition-colors">
            <div className="flex items-center gap-3">
              {/* User Avatar */}
              {/* <div className="w-6 h-6 rounded-full border border-[#5D5D5D] overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600"></div>
              </div> */}

              {/* User Name */}
              {/* <span className="text-[#C1C1C1] text-base font-normal leading-6">
                David
              </span> */}

              {/* Connect Button */}
              <ConnectWalletButton />
            </div>

            {/* Dropdown Arrow */}
            {/* <div className="w-5 h-5 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.192 13.3083C14.2502 13.3663 14.2963 13.4353 14.3277 13.5112C14.3592 13.587 14.3754 13.6684 14.3754 13.7505C14.3754 13.8326 14.3592 13.914 14.3277 13.9898C14.2963 14.0657 14.2502 14.1346 14.192 14.1927L10.442 17.9427C10.384 18.0008 10.3151 18.0469 10.2392 18.0783C10.1633 18.1098 10.082 18.126 9.99986 18.126C9.91773 18.126 9.8364 18.1098 9.76052 18.0783C9.68465 18.0469 9.61572 18.0008 9.55767 17.9427L5.80767 14.1927C5.6904 14.0754 5.62451 13.9163 5.62451 13.7505C5.62451 13.5846 5.6904 13.4256 5.80767 13.3083C5.92495 13.191 6.08401 13.1251 6.24986 13.1251C6.41571 13.1251 6.57477 13.191 6.69205 13.3083L9.99986 16.6169L13.3077 13.3083C13.3657 13.2502 13.4346 13.2041 13.5105 13.1726C13.5864 13.1412 13.6677 13.125 13.7499 13.125C13.832 13.125 13.9133 13.1412 13.9892 13.1726C14.0651 13.2041 14.134 13.2502 14.192 13.3083ZM6.69205 6.69268L9.99986 3.38409L13.3077 6.69268C13.4249 6.80996 13.584 6.87584 13.7499 6.87584C13.9157 6.87584 14.0748 6.80996 14.192 6.69268C14.3093 6.5754 14.3752 6.41634 14.3752 6.25049C14.3752 6.08464 14.3093 5.92558 14.192 5.8083L10.442 2.0583C10.384 2.00019 10.3151 1.95409 10.2392 1.92264C10.1633 1.89119 10.082 1.875 9.99986 1.875C9.91773 1.875 9.8364 1.89119 9.76052 1.92264C9.68465 1.95409 9.61572 2.00019 9.55767 2.0583L5.80767 5.8083C5.6904 5.92558 5.62451 6.08464 5.62451 6.25049C5.62451 6.41634 5.6904 6.5754 5.80767 6.69268C5.92495 6.80995 6.08401 6.87584 6.24986 6.87584C6.41571 6.87584 6.57477 6.80996 6.69205 6.69268Z" fill="#5D5D5D"/>
              </svg>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="w-full h-[1px] bg-[#191919]"></div>
    </div>
  );
}
