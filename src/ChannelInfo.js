import React, { useState, useRef, useEffect } from "react"
import useDoc from "./useDoc"
import { db } from "./firebase"

function ChannelInfo({ channelId }) {
  const channel = useDoc(`channels/${channelId}`)
  const [topic, onTopicChange] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    db.doc(`channels/${channelId}`).set({ topic })
  }

  return (
    <div className="ChannelInfo">
      <div className="Topic">
        <p> Topic:</p>
        <form onSubmit={handleSubmit}>
          <input
            onChange={e => onTopicChange(e.target.value)}
            className="TopicInput"
            defaultValue={channel && channel.topic}
          />
        </form>
      </div>
      <div className="ChannelName">#{channelId}</div>
    </div>
  )
}

export default ChannelInfo
