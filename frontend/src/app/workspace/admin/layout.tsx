import "@styles/pages/admin/layout.css"
import Image from "next/image";
import { FaUserAlt } from "react-icons/fa";

/* icons */
import { IoSettings, IoStatsChartSharp } from "react-icons/io5";

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="custom-background">
                <div className="custom-gradient"></div>
            </div>

            <div className="layout__container">
                
                <aside className="sidebar">
                    <ul className="sidebar__list">

                        <li className="sidebar__element">

                            <Image
                                className="sidebar__icon sidebar__icon--logo"
                                width={24}
                                height={24}
                                src="/images/gatoExample.jpg" alt="" />

                            <div className="sidebar__hide">
                                <p>Data4Life</p>
                            </div>

                        </li>

                        <li className="sidebar__element">

                            <IoStatsChartSharp className="sidebar__icon" width="24" height="24" />

                            <div className="sidebar__hide">
                                <p className="sidebar__text">
                                    DashBoard
                                </p>
                            </div>

                        </li>

                        <li className="sidebar__element">

                            <FaUserAlt className="sidebar__icon" width="24" height="24"/>
                            <div className="sidebar__hide">
                                <p className="sidebar__text">
                                    Usuarios
                                </p>
                            </div>

                        </li>

                        <li className="sidebar__element sidebar__element--conf">

                            <IoSettings className="sidebar__icon" width="24" height="24"/>

                            <div className="sidebar__hide">
                                <p className="sidebar__text">
                                    Configuraciones
                                </p>
                            </div>

                        </li>

                    </ul>

                </aside>

                <main className="main">{children}</main>
            </div>
        </>
    );
}