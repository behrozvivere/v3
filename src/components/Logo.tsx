import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="https://raw.githubusercontent.com/behrozvivere/faveicon.svg/a95d717df1f7c219739fcd7fbe8f5da713cdbcb0/faveicon.svg" // Replace this with your image URL
      alt="QR NG Logo"
      width={32}
      height={32}
      className={cn(className)}
      priority
    />
  );
}
