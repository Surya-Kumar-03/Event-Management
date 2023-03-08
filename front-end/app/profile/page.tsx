'use client'
import Footer from '../footer'
import Navbar from '../navbar'
import Profile from './profile'
import TabsProfile from './tabsProfile'
import { useEffect, useState } from 'react'

export default function ProfilePage(): JSX.Element {
  const [role, setRole] = useState('')
  useEffect(() => {
    setRole(localStorage.getItem('role_name') || '')
  }, [])
  return (
    <div>
      <Navbar></Navbar>
      <div className='container mx-auto my-5 p-5'>
        <div className='md:flex no-wrap md:-mx-2 '>
          {role === 'Student' && (
            <>
              <Profile.Student></Profile.Student>
              <TabsProfile.Student></TabsProfile.Student>
            </>
          )}
          {role === 'Teacher' && (
            <>
              <Profile.Teacher></Profile.Teacher>
              <TabsProfile.Teacher></TabsProfile.Teacher>
            </>
          )}
          {role === 'HOD' && (
            <>
              <Profile.HOD></Profile.HOD>
              <TabsProfile.HOD></TabsProfile.HOD>
            </>
          )}
          {role === 'Vice-Chancellor' && (
            <>
              <Profile.VC></Profile.VC>
              <TabsProfile.VC></TabsProfile.VC>
            </>
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}
