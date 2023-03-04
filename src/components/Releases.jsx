import { useRef } from "react"
import Release from "./Release"

const Releases = () => {
  const scrollRef = useRef(null);

  const handleScrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  }

  const handleScrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  }
  return (
    <div className="sm:ml-20 mt-10 relative">
      <p className="text-2xl font-bold text-white mb-4">New releases</p>
      <div ref={scrollRef} className="flex gap-4 sm:gap-4 shrink-0 overflow-x-scroll xl:overflow-hidden">
      <Release image="Rectangle 14.png" title="Golden age of 80s" artist="Sean Swadder" />
      <Release image="Rectangle 15.png" title="Reggae 'n' blues"  artist="Dj YK mule" />
      <Release image="Rectangle 16.png" title="Tomorrow's tunes" artist="Obi Datti" />
      <Release image="Rectangle cap.png" title="Tomorrow's tunes" artist="Obi Datti" />
      <Release image="Rectangle 19.png" title="Tomorrow's tunes" artist="Obi Datti" />
      <Release image="Rectangle 20.png" title="Tomorrow's tunes" artist="Obi Datti" />
      <Release image="Rectangle 14.png" title="Tomorrow's tunes" artist="Obi Datti" />
      </div>
      <i onClick={handleScrollRight} class="fa-solid fa-arrow-right text-gray-800 text-[40px] hidden absolute z-50 xl:block top-28 right-0 hover:scale-125 cursor-pointer"></i> 
      <i onClick={handleScrollLeft} class="fa-solid fa-arrow-left text-gray-800 text-[40px] hidden absolute z-50 xl:block top-28 left-0 hover:scale-125 cursor-pointer"></i>
    </div>
  )
}

export default Releases
