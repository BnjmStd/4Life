import "@styles/pages/admin/settings/settingSection.css"

export default function SettingSection({
    Icon,
    title,
    children
}: {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    title: string,
    children: React.ReactNode
}) {
    return (
        <section className="setting__section">
            <header className="setting__header">
                <span className="setting__icon">
                    <Icon />
                </span>
                <h2 className="setting__title">
                    {title}
                </h2>
            </header>
            {children}
        </section>
    )
}