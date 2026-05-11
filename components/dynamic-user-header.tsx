"use client"

import { useEffect, useState } from "react"
import { UserHeader } from "@/components/user-header"
import { getUserName } from "@/lib/questionnaire-storage"

export function DynamicUserHeader() {
  const [userName, setUserName] = useState("")

  useEffect(() => {
    setUserName(getUserName() || "Usuario")
  }, [])

  return <UserHeader userName={userName} />
}
