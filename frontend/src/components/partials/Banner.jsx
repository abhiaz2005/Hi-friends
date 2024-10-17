import React from 'react'

const Banner = () => {
  return (
    <div className='flex flex-col-reverse md:flex-row justify-center items-center  w-full mx-14'>
        <div className='w-full md:w-1/2 md:h-full flex flex-col justify-center items-center'>
            <h1 className='text-5xl md:text-8xl font-bold font-serif'>Go Through Latest Trends & Explore more &#x2197;</h1>
            <p className='text-xl font-bold mt-5 text-justify'>Welcome to Hi-Friends, your ultimate online shopping companion! Discover the best deals on the latest fashion trends, top electronics, home and lifestyle essentials, sporting goods, books, and professional gear all in one place. With a wide selection of global brands and local favorites, we offer safe and secure payment options, fast and reliable delivery, and exclusive flash sales. At Hi-Friends, we’re more than just shopping , with 24/7 customer care, hassle-free returns, and personalized support. </p>
        </div>
        <div className='w-full h-full md:w-1/2 md:h-full'>
            <img className='h-full mx-auto' src="/trend.png" alt="" />
        </div>
    </div>
  )
}

export default Banner