export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <header>Med header</header>
            <main>{children}</main>
        </div>
    );
}