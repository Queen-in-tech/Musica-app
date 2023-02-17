import Navigations from "./Navigations"

const DesktopNav = () => {
  return (
    <div className="hidden md:flex flex-col gap-10 mr-6 ">
      <div className="iconStyle">
      <Navigations to="/" title="fa-solid fa-house "/>
      <Navigations to="/Album" title="fa-solid fa-compact-disc "/>
      <Navigations to="/Collections" title="fa-solid fa-radio"/>
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
