import Header from "@/components/common/Header";
import StatCard from "@/components/common/StatCard";
import TableUser from "@/components/pages/users/table/TableUser";


import { FaUserAlt } from "react-icons/fa";

const userStats = {
	totalUsers: 152845,
	newUsersToday: 243,
	activeUsers: 98520,
	churnRate: "2.4%",
};

export default function page() {
    return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Users' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
				>
					<StatCard
						name='Total Users'
						Icon={FaUserAlt}
						value={userStats.totalUsers.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard name='New Users Today' Icon={FaUserAlt} value={userStats.newUsersToday} color='#10B981' />
					<StatCard
						name='Active Users'
						Icon={FaUserAlt}
						value={userStats.activeUsers.toLocaleString()}
						color='#F59E0B'
					/>
					<StatCard name='Churn Rate' Icon={FaUserAlt} value={userStats.churnRate} color='#EF4444' />
				</div>

				<TableUser />

				{/* USER CHARTS 
                
                
                
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
					<UserGrowthChart />
					<UserActivityHeatmap />
					<UserDemographicsChart />
				</div>
                
                
                */}

			</main>
		</div>
    )
}
