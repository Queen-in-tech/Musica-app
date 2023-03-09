import { Link, useLocation} from "react-router-dom"

const Navigations = ({to, title, route, onClick}) => {
    const location = useLocation()

    const isActive = location.pathname === to

    const activeIcon = isActive ? `scale-125 text-[#FACD66]` : `text-icons`

    const activeText = isActive? `text-white` : `text-icons`

  return (
    <Link to={to}>
    <div onClick={onClick}>
        <i class={`${title} ${activeIcon}`}></i>
        <span className={`${activeText} text-lg ml-10 lg:hidden`}>{route}</span>
    </div>
    </Link>
  )
}

export default Navigations
