import Navigations from "./Navigations"

const MobileNav = ({handleClick}) => {
  return (
    <div className="h-full w-full z-50 bg-[#1E1E1E] fixed sm-hidden py-5">
      <i class="fa-solid fa-times text-icons text-3xl  mr-14 absolute right-0 sm-hidden" onClick={handleClick}></i> 
      <div className="flex flex-col gap-10 text-2xl ml-6 mt-14">
      <Navigations to="/" title="fa-solid fa-house " route="Home" onClick={handleClick}/>
      <Navigations to="/Album" title="fa-solid fa-compact-disc " route="My collections"/>
      <Navigations to="/Collections" title="fa-solid fa-radio" route="Radio"/>
      <Navigations to="" title="fa-solid fa-video" route="Music video"/>
      <Navigations to="" title="fa-solid fa-user " route="Profile"/>
      <Navigations to="" title="fa-solid fa-right-from-bracket " route="Log out"/>
      </div>
    </div>
  )
}

export default MobileNav
