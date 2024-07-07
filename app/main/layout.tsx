import NavigationBar from "@/components/NavigationBar/NavigationBar"

export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header><NavigationBar /></header>
      <main>{children}</main>
    </>
  )
}