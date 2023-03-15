import Navigations from "./Navigations"

const DesktopNav = () => {
  return (
    <div className="hidden lg:flex flex-col gap-6 mr-6 ">
      <div className="iconStyle">
      <Navigations to="/" title="fa-solid fa-house "/>
      <Navigations to="/Playlists" title="fa-solid fa-compact-disc "/>
      <Navigations to="/Favourites" title="fa-solid fa-heart"/>
      <Navigations to="" title="fa-solid fa-video"/>
      </div>

      <div className="iconStyle">
      <Navigations to="" title="fa-solid fa-user "/>
      <Navigations to="" title="fa-solid fa-right-from-bracket "/>
      </div>
    </div>
  )
}

export default DesktopNav
