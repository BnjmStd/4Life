import { FaTrashAlt } from "react-icons/fa";
import "@styles/pages/admin/settings/dangerZone.css"
export default function DangerZone() {
    return (
        <div className="zone__container">
            <div className="zone__header">
                <FaTrashAlt className="zone__icon" size={24} />
                <h2 className="zone__title">
                    Danger Zone
                </h2>
            </div>
            <p className="zone__description">
                Permanently delete your account and all of your content.
            </p>
            <button className="zone__button">
                Delete Account
            </button>
        </div>
    );
}