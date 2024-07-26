import React from 'react'
import Education from './Education'
import Experience from './Experience'
import Certification from './Certification'
import TechStack from './TechStack'
import DocSection from './DocSection'

function HomePage() {
  return (
    <div className='container mx-auto p-4 rounded-lg'>
      <Experience/>
      <Education/>
      <TechStack/>
      <Certification/>
      <DocSection/>
    </div>
  )
}

export default HomePage
