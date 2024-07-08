import NavigationBar from "@/components/NavigationBar/NavigationBar"

export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="bg-white border-gray-200 text-2xl font-semibold dark:bg-gray-900 dark:text-white">Pomodoro Timer</header>
      <main className="bg-stone-300 dark:bg-stone-800 h-full">{children}</main>
    </>
  )
}