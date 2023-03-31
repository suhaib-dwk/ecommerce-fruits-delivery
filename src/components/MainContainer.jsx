import React, { useState } from 'react'
import HomeContainer from './HomeContainer'
import RowContainer from './RowContainer'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {MdChevronLeft,MdChevronRight} from 'react-icons/md'
import {useStateValue} from "../context/StateProvider"
import { getAllFoodItems } from '../utils/FiredbaseFunction'; 
import { actionType } from '../context/reducer';

const MainContainer = () => {
  const [{foodItems},dispatch] = useStateValue()
  const [scrollValue, setScrollValue] = useState(0)
  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      })
    })
  }
  useEffect(() => {
    fetchData()
  }, [scrollValue])

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer />

      <section className='w-full my-6'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-2xl font-semibold capitalize text-gray-700 uppercase relative before:absolute 
          before:rounded-lg before:content before:w-32 before:h-1
          before:-bottom-4 before:left-0 before:bg-gradient-to-tr
          from-orange-400 to-orange-600 transition-all
          ease-in-out duration-100'>
            Our fresh & healthy fruits
          </p>
          <div className='hidden md:flex gap-3 items-center'> 
            <motion.div whileTap={{
              scale:0.75
            }} 
            className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer 
            transition-all flex items-center justify-center'
            onClick={()=> setScrollValue(-500)}>
              <MdChevronLeft className='text-lg text-white'/>
            </motion.div>
            <motion.div whileTap={{
              scale:0.75
            }} 
            className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer 
            transition-all flex items-center justify-center'
            onClick={() => setScrollValue(500)}>
              <MdChevronRight className='text-lg text-white'/>
            </motion.div>
          </div>
        </div>
        <RowContainer
        ScrollValue = {scrollValue}
        flag={true} 
        data={foodItems ?.filter(n => n.category === 'Fruit')}/>
      </section>
    </div>
  )
}

export default MainContainer