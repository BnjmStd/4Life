import { IoIosNotifications } from "react-icons/io";

import Image from "next/image";

import "@styles/components/common/header.css"
import { FaSearch } from "react-icons/fa";
import SidebarMini from "../SidebarMini";

export default function Header({
    title
}: {
    title: string
}) {

    return (
        <header className="header">
            <SidebarMini />
            <main>
                <h1 className="header__logo">{title}</h1>
                <p className="header__description">
                    un sitio web empeznado
                </p>
            </main>
            <span className="search-bar">
                <input type="text" placeholder="Search..." />
                <FaSearch className="search-icon" />
            </span>
            <div className="header__right">
                <div className="header__notification">
                    <IoIosNotifications />
                </div>
                <div className="header__user">
                    <Image width={24}
                        height={24} src="" alt="User" className="header__user-img" />
                    <span className="header__user-name">John Doe</span>
                </div>
            </div>
        </header>
    );
}