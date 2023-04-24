import { useStateContext } from '@/context/StateContext'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { BsBagCheckFill } from 'react-icons/bs'

import { runConfetti } from '@/libs/utils'

const Success = () => {

const {setCartItems,setTotalPrice,setTotalQuantities} = useStateContext()

    useEffect(()=>{
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runConfetti();
    },[])

  return (

    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Gracias por su pedido!</h2>
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

export default Success