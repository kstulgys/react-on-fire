import React, { useState } from 'react'
import { db } from './firebase'

export default function ChatInputBox({ user, channelId }) {
  const [input, setInput] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    db.collection(`channels/${channelId}/messages`).add({
      user: db.doc(`users/${user.uid}`),
      text: input,
      createdAt: new Date()
    })
    setInput('')
  }

  return (
    <form className="ChatInputBox" onSubmit={handleSubmit}>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        className="ChatInput"
        placeholder=""
      />
    </form>
  )
}
