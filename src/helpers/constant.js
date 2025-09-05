import { AiFillDashboard, AiFillHome, AiFillMessage } from "react-icons/ai";
import { FaCode, FaTools } from "react-icons/fa";
import { MdOutlineMiscellaneousServices, MdSettings } from "react-icons/md";

export const BASE_API = "https://my-portofolio-production.up.railway.app";
export const SECRET_DECRYPT_KEY = "Zc3R84Jkphx8Yps";

export const NavMenu = [
    {
        label: "Dashboard",
        link: "/dashboard",
        icon: AiFillDashboard,
        badge: false,
    },
    {
        label: "Home",
        link: "/",
        icon: AiFillHome,
        badge: false,
    },
    {
        text: "Manajemen Portofolio",
    },
    {
        label: "Message",
        link: "/message",
        icon: AiFillMessage,
        badge: 0,
    },
    {
        label: "Service",
        link: "/service",
        icon: MdOutlineMiscellaneousServices,
        badge: false,
    },
    {
        label: "Tool",
        link: "/tool",
        icon: FaTools,
        badge: false,
    },
    {
        label: "Language",
        link: "/language",
        icon: FaCode,
        badge: false,
    },
    {
        text: "Other",
    },
    {
        label: "Pengaturan",
        link: "/pengaturan",
        icon: MdSettings,
        badge: false,
    },
];
