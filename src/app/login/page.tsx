import MyLogin from "@/components/login"
import ButtonHome from "@/components/buttonHome"

export default function Home() {
  return (
    <section className="flex items-center justify-center h-screen">
      <div className="border-2 border-rose-500 p-4">
        <div className="flex flex-col items-center">
            <ButtonHome/>
        </div>
        <MyLogin/>
      </div>
    </section>
  )
}