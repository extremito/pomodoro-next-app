import NavigationBar from "@/components/NavigationBar/NavigationBar"

export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header><NavigationBar /></header>
      <main className="bg-stone-300 dark:bg-stone-800 h-full">{children}</main>
    </>
  )
}