import React from 'react'
import FirstPage from '../components/FirstPage'
import SecondPage from '../components/SecondPage'

const HomeView = () => {
  const test = 'oujee'

  // console.log('From dotenv: ', process.env.TEST)

  const sendNotification = () => {
    // alert('oujee')
    electron.notificationApi.sendNotification('testiotsikko', 'Testii tekstii')
  }

  return (
    <div className="main-wrapper">
      <h1>we are alive jee, {test}</h1>
      <button onClick={sendNotification}>notify</button>
      <FirstPage />
      <SecondPage />
    </div>
  )
}

export default HomeView
