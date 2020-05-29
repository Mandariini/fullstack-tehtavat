import React from 'react'

const Notification = ({ message, messageType }) => {
    if (message === null) {
        return null
    }

    if (messageType === 'info') {
        return (
            <div className="message">
                {message}
            </div>
        )
    }

    if (messageType === 'error')
        return (
            <div className="error">
                {message}
            </div>
        )
}

export default Notification