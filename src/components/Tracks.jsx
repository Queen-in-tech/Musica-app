const Tracks = ({tracks, album}) => {
  return (
    <>
    {tracks.map((track) => {
        const durationInMinutes = (track.duration_ms / 1000 / 60).toFixed(2);
        console.log(track)
        return <div className="w-full sm:w-[85vw]" key={track.id}>
        <div className="flex text-gray-300 bg-[#33373e42] px-3 py-2 items-center rounded-xl mb-3 sm:grid sm:grid-flow-col grid-cols-6 max-w-sm sm:max-w-none">
            <img src={album.images[2].url} alt="" className="mr-4" />
            <p className="hidden sm:block font-light text-sm mb-1 col-span-2">{`${track.name} - ${track.artists[0].name}`}</p>
            <p className="hidden sm:block font-light text-sm capitalize col-span-2">{`${track.type}`}</p>
            <p className="hidden sm:block font-light text-sm col-span-1">{`${durationInMinutes}`}</p>
            <i class="fa-solid fa-ellipsis-vertical text-[#FACD66] hidden sm:block text-sm col-span-1 text-right"></i>
            <div className="w-full sm:hidden">
                <p className="font-light text-sm mb-1">{`${track.name}`}</p>
                <p className="font-light text-sm capitalize">{`${track.type}`}</p>
            </div>
            <div className="flex flex-col items-end gap-2 sm:hidden">
                <i class="fa-solid fa-ellipsis-vertical text-[#FACD66]"></i>
                <p className="font-light text-sm">{`${durationInMinutes}`}</p>
            </div>
        </div>
    </div>
    })}
    </>
  )
}

export default Tracks
