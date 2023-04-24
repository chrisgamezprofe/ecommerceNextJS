import Link from 'next/link'
import React from 'react'
import { urlFor } from '@/libs/client'

const Banner = ({banners}) => {
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>
          {banners.smallText}
        </p>
        <h3>{banners.midText}</h3>
        <h3>{banners.largeText1}</h3>
        <img src={urlFor(banners.image)} alt='Audifonos' className="hero-banner-image" />
      </div>
      <Link href={`/product/${banners.slug}`}>
        <button type="button">{banners.buttonText}</button>
      </Link>
      <div className='desc'>
        <h5>Descripcion</h5>
        <p>{banners.desc}</p>
      </div>
    </div>
  )
}

export default Banner