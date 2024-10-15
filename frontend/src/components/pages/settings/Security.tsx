'use client'

import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import "@styles/pages/admin/settings/security.css"

export default function Security() {
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <SettingSection Icon={FaLock} title={"Security"}>
            <ToggleSwitch
                label={"Two-Factor Authentication"}
                isOn={twoFactor}
                onToggle={() => setTwoFactor(!twoFactor)}
            />
            <div className="button__container">
                <button className="button__change-password">
                    Change Password
                </button>
            </div>

        </SettingSection>
    );
}