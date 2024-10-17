import wifiIcon from "@/asset/free-icon-wifi-4852997.png";
import Image from "next/image";
import SearchForm from "./SearchForm";
import UserMenu from "./UserMenu";
import LikedTab from "./LikedTab";

const SideBar = async () => {
  return (
    <div className="relative flex h-full w-full flex-col rounded-lg border bg-accent shadow-sm">
      <div className="w-full space-y-4 p-3">
        <h1 className="flex items-center gap-2 text-xl font-[700]">
          <Image src={wifiIcon} alt="logo" width={40} height={40} />
          제주 공공 와이파이
          <UserMenu />
        </h1>
        <LikedTab />
      </div>
      <SearchForm />
    </div>
  );
};

export default SideBar;
