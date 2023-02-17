import DesktopNav from "../components/DesktopNav"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Charts from "../components/Charts"

const Home = () => {
  return (
    <div className="bg-[#1E1E1E] p-5 h-auto sm:py-6 sm:px-8 font-body">
    <Header />
    <div className="md:flex">
    <DesktopNav />
    <Hero />
    <Charts />
    </div>
    </div>
  )
}

export default Home
