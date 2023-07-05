import { signIn, signOut, useSession } from "next-auth/react"
const DemoLogin = () => {
    const {data: session} = useSession();
    if (session && session.user) {
        return(
            <div>
                <p>{session.user.name}</p>
                <button onClick={()=>signOut()} className="text-red-600">
                    Sign out +
                </button>
            </div>
        )
    }
    return (
        <button onClick={() => signIn()} className="text-green-600">
            Sign in +
        </button>
    )
}

export default DemoLogin