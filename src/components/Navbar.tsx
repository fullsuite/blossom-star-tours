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
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Icon on the left */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Laptop className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-semibold">Logo</span>
            </Link>
          </div>

          {/* Navigation links in the middle - hidden on mobile */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <MenuItems />
            </NavigationMenuList>
          </NavigationMenu>

          {/* Hamburger menu for mobile */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <NavigationMenu className="flex flex-col items-start mt-8">
                <NavigationMenuList className="flex-col items-start space-y-4">
                  <MenuItems />
                </NavigationMenuList>
              </NavigationMenu>
            </SheetContent>
          </Sheet>

          {/* CTA buttons on the right */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <Button variant="outline">Log In</Button> */}
            <Button>Book Your Tour With us</Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
