import Aside from "@/components/Aside";
import "@styles/pages/admin/layout.css"

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container__layout">
            <Aside />
            {children}
        </div>
    );
}