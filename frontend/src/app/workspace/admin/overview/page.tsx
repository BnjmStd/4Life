import { FaUserAlt } from "react-icons/fa";

import ChannelPerformance from "@/components/graphic/ChannelPerformance";
import Header from "@/components/common/Header";
import StatCard from "@/components/common/StatCard";
import Graph from "@/components/graphic/Graph";

import "@styles/pages/admin/overview/overview.css"

const salesStats = {
  totalRevenue: "$1,234,567",
  averageOrderValue: "$78.90",
  conversionRate: "3.45%",
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
            color='#FFF'
          />
          <StatCard
            name='Avg. Order Value'
            Icon={FaUserAlt}
            value={salesStats.averageOrderValue}
            color='#FFF'
          />
          <StatCard
            name='Conversion Rate'
            Icon={FaUserAlt}
            value={salesStats.conversionRate}
            color='#FFF'
          />
        </div>

        <div className="overview-page__charts">
          <Graph />
          <ChannelPerformance />
        </div>
        
      </main>
    </div>
  )
}