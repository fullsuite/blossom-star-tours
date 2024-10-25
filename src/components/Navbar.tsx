"use client";

import { useState } from "react";
import Link from "next/link";
import { Laptop, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from 'next/image'

import logoHeader from '@/assets/logo-header.png';

export default function ResponsiveNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const MenuItems = () => (
    <>
      <NavigationMenuItem>
        <Link href="/" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <Link href="/about" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            About Us
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/tours" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Tours
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/packages" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Packages
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/contact" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Contact
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </>
  );

  return (
    <header className="border-b fixed w-full z-50 bg-wild-sand-50">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 xl:px-10">
        <nav className="flex items-center justify-between h-auto py-7">
          {/* Icon on the left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image src={logoHeader} alt="logo" width={314} height={52} className="aspect-[314/52] object-contain w-auto h-10 xl:h-11 2xl:h-[3.25rem]" />
            </Link>
          </div>

          {/* Navigation links in the middle - hidden on mobile */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <MenuItems />
            </NavigationMenuList>
          </NavigationMenu>

          {/* Hamburger menu for mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden !outline-none !shadow-none">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <NavigationMenu className="flex flex-col justify-start items-stretch mt-8 w-full max-w-full">
                <NavigationMenuList className="flex-col items-stretch space-y-4">
                  <MenuItems />
                </NavigationMenuList>
                <div className="flex flex-col space-x-0 space-y-4 items-stretch justify-start w-full mt-auto pt-10 justify-center items-stretch xs:space-x-4 xs:flex-row xs:space-y-0 xs:items-center xs:center">
                  <Button className="rounded bg-primary text-base text-white py-2.5 px-5">Login</Button>
                  <Button className="rounded bg-primary text-base text-white py-2.5 px-5">Book your Tour</Button>
                </div>
              </NavigationMenu>
            </SheetContent>
          </Sheet>

          {/* CTA buttons on the right */}
          <div className="hidden lg:flex items-center gap-x-2 xl:gap-x-4">
            <Button className="rounded bg-primary text-base text-white py-2.5 px-5">Book your Tour</Button>
            <Button className="rounded bg-primary text-base text-white py-2.5 px-5">Login</Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
