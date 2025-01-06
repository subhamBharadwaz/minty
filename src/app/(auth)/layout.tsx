import { LeafIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="https://images.pexels.com/photos/1755693/pexels-photo-1755693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Authentication background"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <Link
          href="/"
          className="z-30 flex absolute top-10 left-10 items-center gap-2"
        >
          <LeafIcon className="h-6 w-6 sm:h-8 sm:w-8 fill-primary stroke-black" />
          <span className="text-lg text-white sm:text-xl font-bold">Minty</span>
        </Link>

        <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-white">
          <h1 className="mt-8 text-4xl font-bold">Welcome to Minty</h1>
          <p className="mt-4 text-xl">
            Track your goals. Manage your money. Simplify your life.
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
