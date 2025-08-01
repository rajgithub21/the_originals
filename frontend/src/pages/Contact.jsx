import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
        <div className='text-center text-2xl pt-10 border-t'>
            <Title text1={"CONTACT"} text2={"US"}></Title>
        </div>
        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
            <img src={assets.contact_img} alt="" className='w-full md:max-w-[480px]' />
            <div className='flex flex-col justify-center items-start gap-6'>
                <p className='font-semibold text-xl text-gray-600'>Our Store</p>
                <p className='text-gray-500'>A-21 Cannaught Place <br />New Delhi ,India </p>
                <p className='text-gray-500'>Tel: (415) 555-0132 <br />Email    : contact@originals.com</p>
                <p className='font-semibold text-xl text-gray-600'>Careers at ORIGINALS</p>
                <p className='text-gray-500'>Learn more about our teams and job openings  </p>
                <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-200'>Explore Jobs</button>

            </div>

        </div>
        <NewsletterBox></NewsletterBox>
    </div>
  )
}

export default Contact