import "@styles/pages/admin/settings/toggleSwitch.css"

export default function ToggleSwitch({
    label,
    isOn,
    onToggle
}: {
    label: string;
    isOn: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="toggle-switch">
            <span className="toggle-switch__label">{label}</span>
            <button
                className={`toggle-switch__button ${isOn ? "toggle-switch__button--on" : "toggle-switch__button--off"}`}
                onClick={onToggle}
            >
                <span
                    className={`toggle-switch__circle ${isOn ? "toggle-switch__circle--on" : "toggle-switch__circle--off"}`}
                />
            </button>
        </div>
    );
}