import React, { useEffect } from "react"
// import useCollection from './useCollection'
import { db } from "./firebase"
import useCollection from "./useCollection"

function Members({ channelId }) {
  const members = useCollection("users")

  // const members = useCollection('users', undefined, [
  //   `channels.${channelId}`,
  //   '==',
  //   true
  // ])

  return (
    <div className="Members">
      <div>
        {members.map(member => (
          <div key={member.id} className="Member">
            <div />
            {member.displayName}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Members
