import { useNavigate } from "react-router"

function NavigateBtn({title, className='', navigateTo, token , ...props }) {
    const navigate = useNavigate()
    const handler = () => {
        localStorage.removeItem(token)
        navigate(navigateTo)
    }
    return <button className={`p-2 bg-red-700 rounded-md text-white ${className}`} onClick={handler}>{title}</button>
}

export default NavigateBtn