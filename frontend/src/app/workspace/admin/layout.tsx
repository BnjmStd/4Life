import Aside from "@/components/Aside";
import "@styles/pages/admin/layout.css"

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="custom-background">
                <div className="custom-gradient"></div>
            </div>

            <div className="container__layout">

                <Aside />

                {children}
            </div>
        </>
    );
}