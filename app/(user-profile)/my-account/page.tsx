import { auth } from "@/auth"
const MyAccout = async () => {
    const session = await auth()
    await new Promise((res) => {
        setTimeout(() => {
            res(100)
        }, 3000)
    })
    return (
        <main className="flex justify-center items-center h-screen">
            <div className="text-3xl text-primary">{session?.user?.email}</div>
        </main>
    )
}
export default MyAccout