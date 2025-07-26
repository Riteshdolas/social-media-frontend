import { useNavigate } from "react-router"
import { useUser } from "../context/UserContext"

function NavigateBtn({title, className='', navigateTo, token , ...props }) {
    const navigate = useNavigate()
    const {setUser} = useUser()
    const handler = () => {
        localStorage.removeItem(token)
        setUser(null)
        navigate(navigateTo)
    }
    return <button className={`p-2 border-solid border-2 border-[#e1306c] cursor-pointer transition-transform duration-200 hover:scale-105 rounded-md text-[#f5f5f5] ${className}`} onClick={handler}>{title}</button>
}

export default NavigateBtn