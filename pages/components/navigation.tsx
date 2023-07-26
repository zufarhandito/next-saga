
import Link from 'next/link'
import React from 'react'
import { HiArrowLeft } from 'react-icons/hi'

export default function NavigationContent() {
    return (
        <div className='flex items-center gap-2 my-5'>
            <Link href={'/products'}>
                <HiArrowLeft className='w-5 h-5' />
            </Link>
            <p className='font-bold'>TAMBAH PRODUK</p>
        </div>
    )
}
