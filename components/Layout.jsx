import Head from 'next/head'
import React from 'react'
import { NavBar } from '.'
import { Footer } from '.'


const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>eCommerce NextJS</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout