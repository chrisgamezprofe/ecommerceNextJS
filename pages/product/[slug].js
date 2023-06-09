import { Product } from '@/components';
import { client,urlFor } from '@/libs/client';
import React, { useState } from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai';
import { useStateContext } from '@/context/StateContext';


const ProductDetails = ({ products, product }) => {


    const {image, name, details, price } = product
    const [index,setIndex] = useState(0)
    const {qty, decQty, incQty, onAdd, setShowCart} = useStateContext()

    const handleBuyNow = () =>{
        onAdd(product,qty);
        setShowCart(true);
    }

  return (
    <div>
        <div className="product-detail-container">
            <div>
                <div className="image-container">
                    <img className='product-detail-image' 
                    src={urlFor(image && image[index])} />
                </div>
                <div className='small-images-container'>
                    {image?.map((item,i) => (
                        <img
                        key={i}
                        className={i === index ?'small-image selected-image' : 'small-image'} 
                        src={urlFor(item)}
                        onMouseEnter={() => setIndex(i)}
                        />
                    ))

                    }
                </div>
            </div>
            <div className='product-detail-desc'>
            <h1>{name}</h1>
            <div className='reviews'>
                <div>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiFillStar/>
                    <AiOutlineStar/>
                </div>
                <p>
                    (25)
                </p>
            </div>
            <h4>Detalles: </h4>
            <p>{details}</p>
            <p className='price'>${price}</p>
            <div className='quantity'>
                <h3>Cantidad:</h3>
                <p className='quantity-desc'>
                    <span className='minus' onClick={decQty}>
                            <AiOutlineMinus />
                    </span>
                    <span className='num'>
                            {qty}
                    </span>
                    <span className='plus' onClick={incQty}>
                            <AiOutlinePlus />
                    </span>
                </p>
            </div>
            <div className='buttons'>
                <button type='button' className='add-to-cart' onClick={()=> onAdd(product,qty)}>Agregar</button>
                <button type='button' className='buy-now' onClick={handleBuyNow}>Comprar ahora</button>
            </div>
            </div>
        </div>

        <div className='maylike-products-wrapper'>
            <h2>Productos relacionados</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                    {products.map((item) => (<Product key={item._id} product={item}/>) )}
                </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () =>{
    const query = `*[_type == "product"] {
        slug{
            current
        }
    }`;
    const products = await client.fetch(query);
    const paths = products.map((product) =>({
        params:{
            slug: product.slug.current
        }
    }));

    return {paths,fallback:'blocking'}
}



export const getStaticProps = async ({params:{slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';
  
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
    return {
      props: { products, product }
    }
  }

export default ProductDetails