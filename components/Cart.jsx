import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/libs/client';
import getStripe from '@/libs/getStripe';
import Link from 'next/link';
import React, { useRef } from 'react'
import { toast } from 'react-hot-toast';
import { AiOutlineClose, AiOutlineLeft, AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

const Cart = () => {
  const cartRef = useRef();
  const {totalPrice, totalQuantities,cartItems,setShowCart, toggleCartItemsQuantity, onRemove} = useStateContext();
  
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(cartItems)
    });

    if(response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redireccionando...');
    stripe.redirectToCheckout({sessionId: data.id});
  }
  
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading'
        onClick={() => setShowCart(false)}>
          <AiOutlineClose color='gray' size={34} />
          <span className='heading'>Su pedido</span>
          <span className='cart-num-items'>({totalQuantities} productos)</span>
        </button>
        {cartItems.length <1 && (
          <div className='empty-cart'>
            <AiOutlineShopping color='#ccc' size={150}/>
            <h3>No hay productos en su pedido</h3>
            <Link href="/">
              <button type='button' className="btn"
              onClick={() => setShowCart(false)}>
                Seguir comprando
              </button>
            </Link>
          </div>
        )}

          <div className='product-container'>
            {cartItems.length>=1 && cartItems.map((item) => (
              <div className='product' key={item._id}>
                <img src={urlFor(item?.image[0])}
                className='cart-product-image' />
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                          <span className='minus' onClick={() => toggleCartItemsQuantity(item._id,'dec')}>
                                  <AiOutlineMinus />
                          </span>
                          <span className='num' onClick="">
                                  {item.quantity}
                          </span>
                          <span className='plus' onClick={() => toggleCartItemsQuantity(item._id,'inc')}>
                                  <AiOutlinePlus />
                          </span>
                      </p>
                    </div>
                    <button type='button' className='remove-item'
                    onClick={() => onRemove(item)}>
                      <TiDeleteOutline />
                    </button>

                  </div>
                </div>
              </div>
            ))}
          </div>

          {cartItems.length >= 1 && (
            <div className='cart-bottom'>
              <div className='total'>
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className='btn-container'>
                <button onClick={handleCheckout} type='button' className='btn'>Pagar ahora</button>
              </div>
            </div>
          )}

      </div>
    </div>
  )
}

export default Cart