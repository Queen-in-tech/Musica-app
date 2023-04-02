import { useRef } from "react"
import Release from "./Release"

const Releases = ({albums}) => {
  const scrollRef = useRef(null);

  const handleScrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -500,
      behavior: "smooth",
    });
  }

  const handleScrollRight = () => {
    scrollRef.current.scrollBy({
      left: 500,
      behavior: "smooth",
    });
  }
  return (
      <div className="lg:ml-20 mt-10 pb-20 relative">
      <p className="text-2xl font-bold text-white mb-4">New releases</p>
      <div ref={scrollRef} className="flex gap-4 sm:gap-4 shrink-0 overflow-x-scroll xl:overflow-hidden">
      { albums.map((album)=> {
        return <Release album={album} key={album.id} />
      })
      }
      </div>
      <i onClick={handleScrollRight} class="fa-solid fa-arrow-right text-gray-800 text-[40px] hidden absolute z-50 xl:block top-28 right-1 hover:scale-125 cursor-pointer"></i> 
      <i onClick={handleScrollLeft} class="fa-solid fa-arrow-left text-gray-800 text-[40px] hidden absolute z-50 xl:block top-28 left-1 hover:scale-125 cursor-pointer"></i>
    </div>
  )
}

export default Releases
