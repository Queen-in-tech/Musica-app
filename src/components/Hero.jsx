const Hero = () => {
  return (
    <div className="flex bg-[#609EAF]  rounded-[40px] px-10 relative overflow-hidden mr-3 shrink-0">
      <div className="text-white py-10">
      <p className="mb-56 text-sm sm:mb-24">Currated playlist</p>
      <p className="text-3xl font-bold mb-2">R & B Hits</p>
      <p className="mb-12 text-sm sm:mb-20 w-72">
        All mine, Lie again, Petty call me everyday, <br />
        Out of time, No love, Bad habit, <br />
        and so much more
      </p>
      <img src="Frame 5.png" alt="" className="w-64 sm:w-auto"/>
      </div>
        <img src="Pexels Photo by Eric Esma.png" alt="" className="hidden sm:block object-cover z-50" />
        <img src="Vector.png" alt="" className="hidden sm:block sm:absolute sm:right-0 sm:bottom-0 sm:top-0 sm:h-full" />
        <img src="Vectorsmall.png" alt="" className="absolute right-0 sm:hidden"/>
    </div>
  )
}

export default Hero
