"use client"

import { useEffect } from "react"

interface SectionIdSetterProps {
  sectionId: number
}

export function SectionIdSetter({ sectionId }: SectionIdSetterProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sectionId', sectionId.toString())
    }
  }, [sectionId])

  return null
}