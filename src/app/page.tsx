import Link from "next/link"

export default function Home() {
  return (
    <>
      <h1>Welcome</h1>
      <button><Link href="/dashboard">Dashboard</Link></button>
      <button><Link href="/logIn">Log In</Link></button>
      <button><Link href="/register">Register</Link></button>
    </>
  )
}
