import React from 'react'
import Image from "next/image";
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"

import { UserKey } from 'lucide-react';


const Header = () => {
  return (
    <header className='py-4 flex justify-between'>
      <div className="brand">
        <h4 className="font-bold text-sm uppercase">Expenses</h4>
      </div>
      <nav className="navbar">
        <div className="profile flex gap-2">

          {/* <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
          <Button variant="outline">
            <Link href="" className="flex gap-2 items-center font-semibold">
              <UserKey size={16} />
              Ingresa
            </Link>
          </Button>
        </div>
      </nav>


    </header>
  )
}

export default Header
