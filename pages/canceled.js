import { useStateContext } from '@/context/StateContext'
import Link from 'next/link'
import React, { useEffect } from 'react'
import {  BsBagX } from 'react-icons/bs'

const Canceled = () => {


  return (

    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagX color='red' />
            </p>
            <h2>Pago cancelado!</h2>
            <p className='email.msg'>
                Verifique el pedido en su email
            </p>
            <p className='description'>
                Si tiene alguna pregunta, por favor contactenos a:
                <a className='email' href='mailto:ventas@example.com'>
                ventas@example.com
                </a>
            </p>
            <Link href="/">
                <button type='button' className='btn'>
                    Continuar comprando
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Canceled