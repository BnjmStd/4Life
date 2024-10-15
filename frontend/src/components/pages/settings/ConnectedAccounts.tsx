'use client'

import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import SettingSection from "./SettingSection";

import "@styles/pages/admin/settings/connectedAccounts.css"
import Image from "next/image";

/*
    images
*/

import google from "@/public/images/assets/google.png"
import x from "@/public/images/assets/x.png"
import fb from "@/public/images/assets/fb.png"

export default function ConnectedAccounts() {
    const [connectedAccounts, setConnectedAccounts] = useState([
        {
            id: 1,
            name: "Google",
            connected: true,
            icon: google,
        },
        {
            id: 2,
            name: "Facebook",
            connected: false,
            icon: fb,
        },
        {
            id: 3,
            name: "Twitter",
            connected: true,
            icon: x,
        },
    ]);
    return (
        <SettingSection Icon={IoIosHelpCircle} title={"Connected Accounts"}>
            {connectedAccounts.map((account) => (
                <div key={account.id} className="account-container">
                    <div className="account-details">
                        <Image
                            src={account.icon}
                            alt="Social img"
                            className="account-image"
                            width={32}
                            height={32}
                        />
                        <span className="account-name">{account.name}</span>
                    </div>
                    <button
                        className={`account-button ${account.connected ? "connected" : "disconnected"
                            }`}
                        onClick={() => {
                            setConnectedAccounts(
                                connectedAccounts.map((acc) => {
                                    if (acc.id === account.id) {
                                        return {
                                            ...acc,
                                            connected: !acc.connected,
                                        };
                                    }
                                    return acc;
                                })
                            );
                        }}
                    >
                        {account.connected ? "Connected" : "Connect"}
                    </button>
                </div>
            ))}
            <button className="add-account-button">
                <FaPlusCircle size={18} className="icon-add-account" /> Add Account
            </button>
        </SettingSection>

    );
}