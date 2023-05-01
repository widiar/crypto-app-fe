import { useCookies } from "react-cookie";


const Logout = () => {
    const [, ,removeCookie] = useCookies(['user'])
    removeCookie("session", { path: '/' })

    window.location.href = '/'
    
}

export default Logout;