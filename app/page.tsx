import { ModeToggle } from "@/components/ModeToggle";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex h-full flex-col items-center justify-center">
        <ModeToggle />
      </div>
    </main>
  );
}
