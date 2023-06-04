import React from "react"
import { useNotificationValue } from "../NotificationContext"

const Notification = () => {

    const message = useNotificationValue()
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }
export default Notification