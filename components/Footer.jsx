import Link from 'next/link'
import React from 'react'
import { AiOutlineInstagram, AiOutlineTwitter} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>
        2025 Tienda NextJS All rights reserved
      </p>
      <p className='icons'>
        <Link target='_blank' href="https://www.instagram.com/chrisgamezprofe">
         <AiOutlineInstagram />
        </Link>
        <AiOutlineTwitter />
      </p>
    </div>
  )
}

export default Footer