'use client'

import { useState } from "react";

import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { FaBell } from "react-icons/fa";

export default function Notifications() {
	const [notifications, setNotifications] = useState({
		push: true,
		email: false,
		sms: true,
	});

	return (
		<SettingSection Icon={FaBell} title={"Notifications"}>
			<ToggleSwitch
				label={"Push Notifications"}
				isOn={notifications.push}
				onToggle={() => setNotifications({ ...notifications, push: !notifications.push })}
			/>
			<ToggleSwitch
				label={"Email Notifications"}
				isOn={notifications.email}
				onToggle={() => setNotifications({ ...notifications, email: !notifications.email })}
			/>
			<ToggleSwitch
				label={"SMS Notifications"}
				isOn={notifications.sms}
				onToggle={() => setNotifications({ ...notifications, sms: !notifications.sms })}
			/>
		</SettingSection>
	);
}