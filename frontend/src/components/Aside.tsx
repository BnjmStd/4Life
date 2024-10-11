import { FaUserAlt } from "react-icons/fa";

import { 
    IoStatsChartSharp, 
    IoSettings 
} from "react-icons/io5";

import Image from "next/image";

import "@styles/components/aside.css"

export default function Aside() {
    return (
        <aside className="sidebar">
            <ul className="sidebar__list">
                <li className="sidebar__element">
                    <Image
                        className="sidebar__icon sidebar__icon--logo"
                        width={24}
                        height={24}
                        src="/images/gatoExample.jpg" alt="" />
                    <p>Data4Life</p>
                </li>
                <li className="sidebar__element">
                    <IoStatsChartSharp className="sidebar__icon" width="24" height="24" />
                    <p className="sidebar__text">
                        DashBoard
                    </p>
                </li>
                <li className="sidebar__element">
                    <FaUserAlt className="sidebar__icon" width="24" height="24" />
                    <p className="sidebar__text">
                        Usuarios
                    </p>
                </li>
                <li className="sidebar__element">
                    <IoSettings className="sidebar__icon" width="24" height="24" />
                    <p className="sidebar__text">
                        Configuración
                    </p>
                </li>
            </ul>
        </aside>
    )
}