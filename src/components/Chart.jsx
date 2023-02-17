const Chart = ({image, title, artist, time}) => {
  return (
    <div className="bg-[#0505052c] flex text-white p-3 items-center shrink-0 rounded-3xl mb-5">
        <img src={image} alt="image" className="mr-5" />
        <div className="mr-24">
            <p className="text-lg w-44 text-gray-200">{title}</p>
            <p className="text-xs text-gray-400 mb-2">{artist}</p>
            <p className="text-xs text-gray-200">{time}</p>
        </div>
        <div className="relative ">
        <img src="Ellipse 9.svg" alt="" />
        <img src="Stroke-1.svg" alt="" className="absolute top-2.5 right-2.5 cursor-pointer hover:scale-110" />
        </div>
    </div>
  )
}

export default Chart
