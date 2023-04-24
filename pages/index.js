import React from 'react';
import {Product, FooterBanner, Banner} from '../components'
import { client } from '../libs/client'

const Index = ({ products, banners }) => {
  return (
    <>
    <Banner banners={banners.length && banners[0]} />
    {console.log(products)}
    <div className="products-heading">
      <h1>Productos Destacados</h1>
      <p>Parlantes de muchas variedades</p>
    </div>

    <div className="products-container">
      {products?.map((product) => 
        <Product key={product._id} product={product} />
      )}
    </div>

    <FooterBanner footerBanner={banners && banners[0]} />
    </>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const queryBanner = '*[_type == "banner"]';
  const banners = await client.fetch(queryBanner);

  return {
    props: { products, banners }
  }
}

export default Index