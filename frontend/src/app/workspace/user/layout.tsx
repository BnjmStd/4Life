export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <header>users</header>
            <main>{children}</main>
        </div>
    );
}