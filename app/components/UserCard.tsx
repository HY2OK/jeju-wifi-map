import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { auth, signIn, signOut } from "@/lib/auth";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

const UserCard = async () => {
  const session = await auth();

  console.log(session);

  return (
    <Card className="flex items-center justify-between p-4">
      <div className="flex items-center justify-center gap-3">
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-gray-500">
          {session?.user?.image ? (
            <Image
              src={session?.user.image}
              alt="userImg"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <User />
          )}
        </div>

        {session && <div>{session?.user?.name}</div>}
      </div>

      {session ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button
            size={"sm"}
            variant={"destructive"}
            className="h-7 p-2 text-[12px]"
            type="submit"
          >
            로그아웃
          </Button>
        </form>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button size={"sm"} className="h-7 p-2 text-[12px]" type="submit">
            로그인
          </Button>
        </form>
      )}
    </Card>
  );
};

export default UserCard;
