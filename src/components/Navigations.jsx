import { Link, useLocation} from "react-router-dom"

const Navigations = ({to, title}) => {
    const location = useLocation()

    const isActive = location.pathname === to

    const activeClass = isActive ? `scale-125 text-[#FACD66]` : `text-icons`

  return (
    <Link to={to}>
    <div>
        <i class={`${title} ${activeClass}`}></i> 
    </div>
    </Link>
  )
}

export default Navigations
