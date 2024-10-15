import { FaUser } from "react-icons/fa"
import SettingSection from "./SettingSection"
import Image from "next/image"

import x from "@/public/images/gatoExample.jpg"

import "@styles/pages/admin/settings/profile.css"

const name = {
    name: 'Benjamín',
    email: 'bn@admin.com'
}

export default function Profile() {
    return (
        <SettingSection Icon={FaUser} title="Profile">
            <div className="profile__container">
                <Image 
                    alt="imagen de usuario"
                    src={x}
                    width={100}
                    height={100}
                    className="profile__img"
                />
                <div>
                    <h3>{name.name}</h3>
                    <p>{name.email}</p>
                </div>
            </div>
            <button className="profile__button">
                Edit profile
            </button>
        </SettingSection>
    )
}