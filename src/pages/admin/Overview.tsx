import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, TrendingUp } from "lucide-react";
import { Link } from "react-router";

const Overview = () => {
   // const stats = [
   //    // {
   //    //    title: "Total Users",
   //    //    value: "2,543",
   //    //    change: "+12.5%",
   //    //    icon: Users,
   //    //    color: "text-blue-600 dark:text-blue-400",
   //    // },
   //    {
   //       title: "Published Articles",
   //       value: "487",
   //       change: "+8.2%",
   //       icon: FileText,
   //       color: "text-green-600 dark:text-green-400",
   //    },
   //    // {
   //    //    title: "Total Views",
   //    //    value: "124.5K",
   //    //    change: "+23.1%",
   //    //    icon: Eye,
   //    //    color: "text-purple-600 dark:text-purple-400",
   //    // },
   //    // {
   //    //    title: "Engagement Rate",
   //    //    value: "68.4%",
   //    //    change: "+5.3%",
   //    //    icon: TrendingUp,
   //    //    color: "text-orange-600 dark:text-orange-400",
   //    // },
   // ];

   return (
      <div className="p-6 space-y-6">
         <div>
            <h1 className="text-3xl font-bold text-foreground">Overview</h1>
            <p className="text-muted-foreground mt-2">
               Welcome to the NDUtv admin dashboard. Here's a quick overview of
               your platform.
            </p>
         </div>

         {/* Stats Grid */}
         {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
               <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                     </CardTitle>
                     <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                     <div className="text-2xl font-bold">{stat.value}</div>
                     <p className="text-xs text-muted-foreground mt-1">
                        <span className="text-green-600 dark:text-green-400">
                           {stat.change}
                        </span>{" "}
                        from last month
                     </p>
                  </CardContent>
               </Card>
            ))}
         </div> */}

         {/* Recent Activity */}
         {/* <Card>
            <CardHeader>
               <CardTitle>Platform Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                     <p className="text-sm font-medium text-muted-foreground">
                        Platform Status
                     </p>
                     <p className="text-lg font-semibold text-foreground">
                        All Systems Operational
                     </p>
                  </div>
                  <div>
                     <p className="text-sm font-medium text-muted-foreground">
                        Last Deployment
                     </p>
                     <p className="text-lg font-semibold text-foreground">
                        {new Date().toLocaleDateString()}
                     </p>
                  </div>
                  <div>
                     <p className="text-sm font-medium text-muted-foreground">
                        Active Sessions
                     </p>
                     <p className="text-lg font-semibold text-foreground">
                        342 Users Online
                     </p>
                  </div>
                  <div>
                     <p className="text-sm font-medium text-muted-foreground">
                        Server Response Time
                     </p>
                     <p className="text-lg font-semibold text-foreground">
                        124ms Average
                     </p>
                  </div>
               </div>
            </CardContent>
         </Card> */}

         {/* Quick Actions */}
         <Card>
            <CardHeader>
               <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                     to="/admin/content"
                     className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  >
                     <FileText className="w-6 h-6 mb-2 text-primary" />
                     <h3 className="font-semibold">Create Content</h3>
                     <p className="text-sm text-muted-foreground mt-1">
                        Publish new article
                     </p>
                  </Link>
                  <Link
                     to="/admin/users"
                     className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  >
                     <Users className="w-6 h-6 mb-2 text-primary" />
                     <h3 className="font-semibold">Manage Users</h3>
                     <p className="text-sm text-muted-foreground mt-1">
                        View and edit users
                     </p>
                  </Link>
                  <Link
                     to="/admin/analytics"
                     className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  >
                     <TrendingUp className="w-6 h-6 mb-2 text-primary" />
                     <h3 className="font-semibold">View Analytics</h3>
                     <p className="text-sm text-muted-foreground mt-1">
                        Track performance
                     </p>
                  </Link>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default Overview;
