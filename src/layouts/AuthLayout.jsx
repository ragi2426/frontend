import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
//   const [bgImageLoaded, setBgImageLoaded] = useState(false);

//   useEffect(() => {
//     const img = new Image();
//     img.src = highResImage;
//     img.onload = () => setBgImageLoaded(true);
//   }, []);

  return (
    <div className="flex items-center justify-center h-screen authLayout-bg">
            <div className="flex bg-white rounded-lg drop-shadow-md" style={{ width: '68rem', background: 'rgb(255 255 255 / 20%)'}}>
                <div className="flex w-1/2 h-full flex flex-col"> 
                    <div className='flex h-1/4' >
                      <img src="/src/assets/c5i-logo.png" alt="" style={{ width: '7rem',marginLeft: '7%' , position: 'relative', top: '2rem'}}/>
                    </div>
                    <div className='flex h-3/4'>
                      <img src="/src/assets/auth-layout.png" alt="" />
                    </div>
                </div>
                <div className="flex w-1/2 rounded-r-lg p-4 bg-gray-100"> 
                    <Outlet />
                </div>
            </div>
    </div>
  );
};

export default AuthLayout;
