import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, signIn, signOut } from "@/lib/auth";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

const UserMenu = async () => {
  const session = await auth();

  const handleAuth = async () => {
    "use server";
    if (session) {
      await signOut({ redirectTo: "/" });
    } else {
      await signIn("google");
    }
  };

  return (
    <div className="ml-auto flex h-[35px] w-[35px] select-none items-center justify-center rounded-full border border-gray-500">
      <DropdownMenu>
        <DropdownMenuTrigger>
          {session?.user?.image ? (
            <Image
              src={session?.user.image}
              alt="userImg"
              width={35}
              height={35}
              className="rounded-full"
            />
          ) : (
            <User />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {session ? session?.user?.name : "로그인 후 이용가능"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {session && (
            <DropdownMenuItem className="text-[12px] text-gray-400">
              {session?.user?.email}
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <form action={handleAuth} className="my-2 w-full px-2">
            <Button
              size={"sm"}
              variant={session ? "destructive" : "default"}
              className="h-7 w-full p-2 text-[12px]"
              type="submit"
            >
              {session ? "로그아웃" : "로그인"}
            </Button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
