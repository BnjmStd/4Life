/* components */
import Header from "@/components/common/Header"
import Profile from "@/components/pages/settings/Profile"
import Notifications from "@/components/pages/settings/Notification"
import Security from "@/components/pages/settings/Security"
import ConnectedAccounts from "@/components/pages/settings/ConnectedAccounts"
import DangerZone from "@/components/pages/settings/DangerZone"

/* styles  */
import "@styles/pages/admin/settings/settings.css"

export default function page() {
    return (
        <div className="setting">
            <Header title="setting" />
            <main className="setting__main">
                <Profile />
                <Notifications />
                <Security />
                <ConnectedAccounts />
                <DangerZone />
            </main>
        </div>
    )
}