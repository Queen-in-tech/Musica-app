import Navigations from "./Navigations"

const MobileNav = ({handleClick}) => {
  return (
    <div className="h-full w-full z-50 bg-[#1E1E1E] fixed lg-hidden py-5">
      <i class="fa-solid fa-times text-icons text-3xl  mr-14 absolute right-0 md:text-4xl lg-hidden" onClick={handleClick}></i> 
      <div className="flex flex-col gap-10 text-2xl ml-6 mt-14 ease-in-out duration-300 md:text-3xl">
      <Navigations to="/" title="fa-solid fa-house " route="Home" onClick={handleClick}/>
      <Navigations to="" title="fa-solid fa-compact-disc " route="Playlists"/>
      <Navigations to="/Favourites" title="fa-solid fa-heart" route="Favourites" onClick={handleClick}/>
      <Navigations to="" title="fa-solid fa-video" route="Music video"/>
      <Navigations to="" title="fa-solid fa-user " route="Profile"/>
      <Navigations to="" title="fa-solid fa-right-from-bracket " route="Log out"/>
      </div>
    </div>
  )
}

export default MobileNav
