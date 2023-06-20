import MyLogIn from "@/components/logIn"
import ButtonHome from "@/components/buttonHome"

export default function Home() {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="flex justify-between bg-slate-200 flex-col rounded-md items-center justify-center">
        <div className="p-4">
            <h1>Welcome</h1>
            <ButtonHome/>
        </div>
        <MyLogIn/>
      </div>
    </section>
  )
}
