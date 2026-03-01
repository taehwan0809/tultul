import { Suspense } from "react";
import ChatClient from "./ChatClient"

export const dynamic = 'force-dynamic'


export default function Page(){
  return(
    <Suspense>
      <ChatClient/>
    </Suspense>
  )
}