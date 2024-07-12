import React from 'react'
import Education from './Education'
import Experience from './Experience'
import Certification from './Certification'
import TechStack from './TechStack'

function HomePage() {
  return (
    <div className='container mx-auto p-4 rounded-lg'>
      <Experience/>
      <Education/>
      <TechStack/>
      <Certification/>
    </div>
  )
}

export default HomePage
