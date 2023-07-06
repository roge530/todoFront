import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@mui/material"
const DemoLogin = () => {
    const {data: session} = useSession();
    if (session && session.user) {
        return(
            <div className="flex flex-row align-center">
                <Button onClick={()=>signOut()} className="bg-rose-700 text-white mx-2 my-2">
                    Sign out +
                </Button>
            </div>
        )
    }
    return (
        <Button onClick={() => signIn()} className="bg-rose-700 text-white mx-2 my-2">
            Sign in +
        </Button>
    )
}

export default DemoLogin