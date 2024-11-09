import { Member } from '@/types/member'
import { createContext, ReactNode, useState } from 'react'

type MemberContext = {
  member?: Member
  setMember: React.Dispatch<React.SetStateAction<Member | undefined>>
}

export const MemberContext = createContext<MemberContext | undefined>(undefined)

export const MemberProvider = ({ children }: { children: ReactNode }) => {
  const [member, setMember] = useState<Member>()

  return (
    <MemberContext.Provider
      value={{
        member,
        setMember
      }}
    >
      {children}
    </MemberContext.Provider>
  )
}
