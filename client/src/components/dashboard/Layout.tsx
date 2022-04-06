import Navbar from "@/components/Navbar"
import Sidebar from "@/components/dashboard/Sidebar"
import MobileNav from "../MobileNav"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-auto">
      {/* topbar */}
      <Navbar />
      {/* sidebar */}
      <div className="flex">
        <Sidebar />
        {/* main content */}
        <div className="md:ml-[250px] bg-light w-full min-h-screen px-8 pt-12 pb-10">
          {children}
        </div>
      </div>
      <MobileNav></MobileNav>
    </div>
  )
}

export default Layout
