import Header from "@/components/common/Header"
import StatCard from "@/components/common/StatCard"
import Graph from "@/components/dashboard/Graph";

import "@styles/pages/admin/admin.css"

import { FaUserAlt } from "react-icons/fa";

const salesStats = {
    totalRevenue: "$1,234,567",
    averageOrderValue: "$78.90",
    conversionRate: "3.45%",
    salesGrowth: "12.3%",
};

export default function page() {
    return ( 
        <div className="overview">
            <Header title="Overview" />
            <main className="overview-page__main">

                {/* STATS */}
                <div className="overview-page__stats">
                    <StatCard
                        name='Total Revenue'
                        Icon={FaUserAlt}
                        value={salesStats.totalRevenue}
                        color='#6366F1'
                    />
                    <StatCard
                        name='Avg. Order Value'
                        Icon={FaUserAlt}
                        value={salesStats.averageOrderValue}
                        color='#10B981'
                    />
                    <StatCard
                        name='Conversion Rate'
                        Icon={FaUserAlt}
                        value={salesStats.conversionRate}
                        color='#F59E0B'
                    />
                    <StatCard
                        name='Sales Growth'
                        Icon={FaUserAlt}
                        value={salesStats.salesGrowth}
                        color='#EF4444'
                    />

                </div>

                {/* CHARTS */}
                <div className="overview-page__charts">
                    <Graph />
                    <Graph />
                    <Graph />
                    <Graph />
                </div>
            </main>
        </div>
    );
}
