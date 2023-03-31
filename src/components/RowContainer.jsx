import React from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { motion } from 'framer-motion'
import { useEffect,useRef } from 'react'


const RowContainer = ({flag ,data,ScrollValue}) => {
    const rowContainer = useRef()
    useEffect(()=>{
        rowContainer.current.scrollLeft += ScrollValue
    },[ScrollValue])
  return (
    <div
    ref={rowContainer}
    className={`w-full flex items-center gap-3 my-5 scroll-smooth
    ${flag ? 'overflow-x-scroll scrollbar-none' : "overflow-x-hidden flex-wrap"}`}>

        {data && data.map(item => (
            <div key={item.id} className='w-[275px] h-[220px] min-w-[275px] md:w-[300px] md:min-w-[300px]
            bg-gray-400  bg-opacity-10
            p-2  rounded-lg my-12 shadow-md hover:drop-shadow-lg
            backdrop-blur-lg flex flex-col items-center justify-between relative'>
                <div className='w-full flex items-center justify-between'>
                    <motion.img 
                    whileTap={{scale:1.2}} 
                    src={item?.imageURL}
                    className='w-40 -mt-8 drop-shadow-2xl' 
                    alt={item?.title}
                    />
    
                    <motion.div 
                    whileTap={{scale:0.75}}
                    className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center
                    hover:shadow-md'>
                        <MdShoppingBasket  className='text-white'/>
                    </motion.div>
                </div>
    
                <div className='w-full flex items-end justify-end flex-col'>
                    <p className='text-gray-500 font-semibold text-base md:text-lg'>
                        {item?.title}
                    </p>
                    <p className='mt-1 text-sm text-gray-500'>
                        {item?.calories} Calories
                    </p>
                    <div className='flex items-center gap-8'>
                        <p className='text-lg text-gray-700 font-semibold'>
                            <span className='text-sm text-red-500'>
                                $
                            </span>
                            {item?.price}
                        </p>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default RowContainer