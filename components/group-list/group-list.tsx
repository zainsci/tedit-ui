import React, { useEffect, useState } from "react"
import Link from "next/link"

import { IGroup } from "lib/types"
import SideBox from "components/side-box"
import CreateGroup from "components/create-group"

const GroupList = () => {
  const [groupList, setGroupList] = useState<IGroup[]>([])

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await fetch("/api/group/list")
        const data = await res.json()

        if (res.status !== 200) return
        console.log(data)

        setGroupList(data)
      } catch (e) {
        console.log(e)
      }
    }
    fetchList()
  }, [])

  function handleClick() {}

  return (
    <div className="flex flex-col gap-2">
      <SideBox>
        <h3 className="text-sm font-bold mb-2">Latest Groups</h3>
        <div>
          {groupList &&
            groupList.map((item: IGroup) => (
              <Link key={item.id} href={`/group/${item.name}`}>
                <a className="block text-sm hover:underline">{item.name}</a>
              </Link>
            ))}
        </div>
      </SideBox>
      <CreateGroup />
    </div>
  )
}

export default GroupList
