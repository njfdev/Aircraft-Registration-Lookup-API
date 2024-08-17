import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { ReactNode } from "react";

export function NavigationBar() {
  return (
    <NavigationMenu className="absolute">
      <NavigationMenuList className="w-screen flex items-center justify-center align-middle">
        <NavigationMenuItem>
          <NextNavigationLink href="/">Home</NextNavigationLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NextNavigationLink href="/docs">Docs</NextNavigationLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NextNavigationLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        {children}
      </NavigationMenuLink>
    </Link>
  );
}
