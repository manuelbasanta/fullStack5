import React from 'react'

const Notification = ({ notification }) => {
  const msgType = notification.type === 'error' ? 'red' : 'green'
  const style = {
    color: msgType,
    border: `3px solid ${msgType}`,
    display: 'inline-block',
    padding: 10,
    fontStyle: 'italic',
    fontSize: 16
  }
  let messege = notification.msg ? <div style={style}>{ notification.msg }</div> : null
  return messege
}

export default Notification