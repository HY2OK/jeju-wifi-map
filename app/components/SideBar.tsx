import wifiIcon from "@/asset/free-icon-wifi-signal.png";
import React from "react";
import Image from "next/image";
import AddressSearchForm from "./AddressSearchForm";

const SideBar = () => {
  return (
    <div className="h-full w-[300px] bg-background py-3 pl-3">
      <div className="relative flex h-full w-full flex-col rounded-lg border shadow-sm">
        <div className="w-full space-y-5 p-3">
          <h1 className="flex items-center gap-2 text-xl font-[700]">
            <Image src={wifiIcon} alt="logo" width={25} height={25} />
            제주 공공 와이파이
          </h1>
        </div>
        <AddressSearchForm />
      </div>
    </div>
  );
};

export default SideBar;
