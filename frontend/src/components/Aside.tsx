'use client'

import {
    IoStatsChartSharp,
    IoSettings
} from "react-icons/io5";

import Image from "next/image";

import "@styles/components/aside.css"
import images from "@/public/images/gatoExample.jpg"
import {
    TbMessageShare,
    TbReorder
} from "react-icons/tb";

import { AiOutlineProduct } from "react-icons/ai";

import Link from "next/link";

const path = '/workspace/admin'

// https://moqups.com/es/templates/wireframes-mockups/admin-dashboards/ecommerce-dashboard/

export default function Aside() {

    return (
        <aside className="sidebar">
            <ul className="sidebar__list">
                <li className="sidebar__element">
                    <Image
                        className="sidebar__icon sidebar__icon--logo"
                        width={32}
                        height={32}
                        src={images} alt="" 
                    />

                    <p>Data4Life</p>

                </li>
                <li className="sidebar__element">
                    <IoStatsChartSharp className="sidebar__icon" width="24" height="24" />

                    <Link href={`${path}/overview`} className="sidebar__text">
                        Overview
                    </Link>

                </li>
                <li className="sidebar__element">
                    <TbMessageShare className="sidebar__icon" width="24" height="24" />

                    <Link href={`${path}/messages`} className="sidebar__text">
                        Messages
                    </Link>

                </li>
                <li className="sidebar__element">
                    <AiOutlineProduct className="sidebar__icon" width="24" height="24" />

                    <Link href={`${path}/users`} className="sidebar__text">
                        Users
                    </Link>

                </li>

                <li className="sidebar__element">
                    <TbReorder className="sidebar__icon" width="24" height="24" />

                    <a className="sidebar__text">
                        Orders
                    </a>

                </li>

                <li className="sidebar__element">
                    <IoSettings className="sidebar__icon" width="24" height="24" />

                    <a className="sidebar__text">
                        Customers
                    </a>

                </li>

                <li className="sidebar__element">
                    <IoSettings className="sidebar__icon" width="24" height="24" />

                    <Link href={`${path}/settings`} className="sidebar__text">
                        Configuración
                    </Link>

                </li>
            </ul>
        </aside>
    )
}