import React from 'react'
import Image from "next/image";
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"
import { UserKey } from 'lucide-react';


interface HeaderProps {

  user: {
    name: string
    lastName: string
    email: string
  }
}

const Header = ({ user }: HeaderProps) => {


  return (
    <header className='py-4 flex justify-between container mx-auto'>
      <div className="brand">
        <h4 className="font-bold text-sm uppercase">Expenses</h4>
      </div>
      <nav className="navbar">
        <div className="profile flex gap-2">
          {
            user ?
              <div className="flex items-center gap-2">
                <h3 className="font-bold">{`${user.name} ${user.lastName ? user.lastName : ''}`}</h3>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              :
              <Button variant="outline">
                <Link href="/login" className="flex gap-2 items-center font-semibold">
                  <UserKey size={16} />


                </Link>
              </Button>
          }



        </div>
      </nav>


    </header>
  )
}

export default Header
