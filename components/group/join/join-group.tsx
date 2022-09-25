import Button from "components/buttons"
import { RootContext } from "context"
import { useRouter } from "next/router"
import React, { useContext, useState } from "react"

interface IProps {
  joined: boolean
  setJoined: React.Dispatch<React.SetStateAction<boolean>>
  setUsersCount: React.Dispatch<React.SetStateAction<number>>
}

const JoinGroup = ({ joined, setJoined, setUsersCount }: IProps) => {
  const {
    state: { token },
  } = useContext(RootContext)
  const router = useRouter()
  const { name } = router.query
  const [inButton, setInButton] = useState(false)

  async function handleClick() {
    try {
      let res
      if (joined) {
        res = await fetch(`/api/group/${name}/leave`, {
          method: "POST",
          body: JSON.stringify({ token }),
          headers: {
            "Content-Type": "application/json",
          },
        })
      } else {
        res = await fetch(`/api/group/${name}/join`, {
          method: "POST",
          body: JSON.stringify({ token }),
          headers: {
            "Content-Type": "application/json",
          },
        })
      }

      const data = await res.json()
      setJoined(!joined && data.name === name)
      setUsersCount(data._count.users || 0)
    } catch (e) {}
  }

  return (
    <div className="flex-1 flex flex-col">
      <Button
        size="sm"
        variant={joined ? "outlined" : "primary"}
        onClick={handleClick}
        onMouseEnter={() => setInButton(true)}
        onMouseLeave={() => setInButton(false)}
        color={inButton && joined ? "red" : "purple"}
      >
        {inButton ? (joined ? "Leave" : "Join") : joined ? "Joined" : "Join"}
      </Button>
    </div>
  )
}

export default JoinGroup
