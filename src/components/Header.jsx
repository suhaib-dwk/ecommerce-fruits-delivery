import React, { useState } from 'react'
import { MdShoppingBasket , MdAdd ,MdLogout } from "react-icons/md";
import { motion } from 'framer-motion';
import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from '../firebase.config'
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{user} ,dispatch] = useStateValue()

    const [isMenu , setIsMenu] = useState()

    

    const login = async () =>{
        if(!user){
            const {user : {refreshToken , providerData}} = await signInWithPopup(firebaseAuth,provider)
        dispatch({
            type: actionType.SET_USER,
            user : providerData[0],
        });
        localStorage.setItem('user' ,JSON.stringify(providerData[0]))
        }else {
            setIsMenu(!isMenu)
        }
    }

    const Logout = () => {
        setIsMenu(false)
        localStorage.clear()

        dispatch({
            type: actionType.SET_USER,
            user:null
        })
    }

  return (
    <header className='fixed z-50 w-screen p-3 px-4 md:p-6 bg-neutral-50'>
        {/* desktop and tablet */}
        <div className='hidden md:flex w-full h-full items-center justify-between'>
            <Link to={"/"} className='flex items-center gap-2'>
                <img className='w-10 object-cover' src={Logo} alt="Logo"/>
                <p className='text-headingColor text-xl font-bold'>City</p>
            </Link>
            <div className='flex items-center'>
                <motion.ul initial={{opacity:0 , x:200}}
                animate={{opacity:1 , x:0}}
                exit={{opacity:0 , x:200}}
                className='flex items-center gap-8 '>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-ou cursor-pointer'>Home</li>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-ou cursor-pointer'>Menu</li>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-ou cursor-pointer'>About Us</li>
                    <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-ou cursor-pointer'>Service</li>                
                </motion.ul>

                <div className='relative flex items-center justify-center'>
                    <MdShoppingBasket className='text-textColor text-2xl ml-8 cursor-pointer'/>
                    <div className=' absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center'>
                        <p className='text-xs text-white font-semibold'>2</p>
                    </div>
                </div>
                <div className='relative'>
                    <motion.img onClick={login} whileTap={{scale: 0.6}} className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-lg ml-6 cursor-pointer rounded-full' src={user ? user.photoURL : Avatar} alt='userProfile'/>
                    {
                        isMenu && (
                            <motion.div initial={{opacity: 0 , scale:0.6}} 
                            animate={{opacity: 1, scale:1}}
                            exit={{opacity: 0 , scale:0.6}}
                            className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 '>
                                {
                                    user && user.email === user.email && (
                                        <Link to={'/createItem'}>
                                            <p className='m-2 p-2 flex items-center justify-center rounded-md  px-4 py-2 flex items-center gap-3 cursor-pointer shadow-md hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base' onClick={() => setIsMenu(false)}>New Item <MdAdd/></p>
                                        </Link>
                                    )
                                }
                                <p className='m-2 p-2 flex items-center justify-center rounded-md  px-4 py-2 flex items-center gap-3 cursor-pointer shadow-md hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'  onClick={Logout}> Logout <MdLogout /></p>
                            </motion.div>
                        )
                    }
                </div>
            </div>
        </div>
        
        {/* mobile */}
        <div className='flex items-center justify-between md:hidden w-full h-full'>
                <div className='relative flex items-center justify-center'>
                    <MdShoppingBasket className='text-textColor text-2xl ml-8 cursor-pointer'/>
                    <div className=' absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center'>
                        <p className='text-xs text-white font-semibold'>2</p>
                    </div>
                </div>
            <Link to={"/"} className='flex items-center gap-2'>
                <img className='w-10 object-cover' src={Logo} alt="Logo"/>
                <p className='text-headingColor text-xl font-bold'>City</p>
            </Link>
            <div className='relative'>
                    <motion.img onClick={login} whileTap={{scale: 0.6}} className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-lg ml-6 cursor-pointer rounded-full' src={user ? user.photoURL : Avatar} alt='userProfile'/>
                    {
                        isMenu && (
                            <motion.div initial={{opacity: 0 , scale:0.6}} 
                            animate={{opacity: 1, scale:1}}
                            exit={{opacity: 0 , scale:0.6}}
                            className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 '>
                                {
                                    user && user.email === user.email && (
                                        <Link to={'/createItem'}>
                                            <p className='m-2 p-2 rounded-md shadow-md flex items-center justify-center px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'>New Item <MdAdd/></p>
                                        </Link>
                                    )
                                }
                                <ul 
                                    className='flex flex-col gap-1'>
                                        <li className='m-2 p-2 flex items-center justify-center rounded-md shadow-md text-textColor hover:text-headingColor  ease-in-ou cursor-pointer hover:bg-slate-100 px-4 py-2 transition-all duration-100 ease-in-out text-textColor text-base'  onClick={()=>setIsMenu(false)}>Home</li>
                                        <li className='m-2 p-2 flex items-center justify-center rounded-md shadow-md text-textColor hover:text-headingColor  ease-in-ou cursor-pointer hover:bg-slate-100 px-4 py-2 transition-all duration-100 ease-in-out text-textColor text-base'  onClick={()=>setIsMenu(false)}>Menu</li>
                                        <li className='m-2 p-2 flex items-center justify-center rounded-md shadow-md text-textColor hover:text-headingColor  ease-in-ou cursor-pointer hover:bg-slate-100 px-4 py-2 transition-all duration-100 ease-in-out text-textColor text-base'  onClick={()=>setIsMenu(false)}>About Us</li>
                                        <li className='m-2 p-2 flex items-center justify-center rounded-md shadow-md text-textColor hover:text-headingColor  ease-in-ou cursor-pointer hover:bg-slate-100 px-4 py-2 transition-all duration-100 ease-in-out text-textColor text-base'  onClick={()=>setIsMenu(false)}>Service</li>                
                                </ul>
                                <p className='m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base' onClick={Logout}> Logout <MdLogout /></p>
                            </motion.div>
                        )
                    }
                </div>
        </div>
    </header>
  )
}

export default Header