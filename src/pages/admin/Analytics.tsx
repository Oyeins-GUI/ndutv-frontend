import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Eye, Clock, Users } from "lucide-react";

const Analytics = () => {
   const topArticles = [
      { title: "Campus Event Highlights", views: 1234, engagement: "85%" },
   ];

   const categories = [{ name: "SUG", articles: 45, views: 12345 }];

   return (
      <div className="p-6 space-y-6">
         <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-2">
               Track your platform's performance and user engagement.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                     Total Views
                  </CardTitle>
                  <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold"></div>
                  <p className="text-xs text-muted-foreground mt-1">
                     <span className="text-green-600 dark:text-green-400"></span>{" "}
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                     Avg. Read Time
                  </CardTitle>
                  <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold"></div>
                  <p className="text-xs text-muted-foreground mt-1">
                     <span className="text-green-600 dark:text-green-400"></span>{" "}
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                     Active Readers
                  </CardTitle>
                  <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold"></div>
                  <p className="text-xs text-muted-foreground mt-1">
                     <span className="text-green-600 dark:text-green-400"></span>{" "}
                  </p>
               </CardContent>
            </Card>

            <Card>
               <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                     Engagement Rate
                  </CardTitle>
                  <TrendingUp className="w-4 h-4 text-orange-600 dark:text-orange-400" />
               </CardHeader>
               <CardContent>
                  <div className="text-2xl font-bold"></div>
                  <p className="text-xs text-muted-foreground mt-1">
                     <span className="text-green-600 dark:text-green-400">
                        ={" "}
                     </span>{" "}
                  </p>
               </CardContent>
            </Card>
         </div>

         <Tabs defaultValue="articles" className="w-full">
            <TabsList>
               <TabsTrigger value="articles">Top Articles</TabsTrigger>
               <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            <TabsContent value="articles">
               <Card>
                  <CardHeader>
                     <CardTitle>Top Performing Articles</CardTitle>
                     <CardDescription>
                        Most viewed and engaged articles this month
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                        {topArticles.map((article, index) => (
                           <div
                              key={index}
                              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                           >
                              <div className="flex-1">
                                 <h3 className="font-semibold">
                                    {article.title}
                                 </h3>
                                 <p className="text-sm text-muted-foreground mt-1">
                                    {article.views.toLocaleString()} views
                                 </p>
                              </div>
                              <div className="text-right">
                                 <p className="font-semibold text-green-600 dark:text-green-400">
                                    {article.engagement}
                                 </p>
                                 <p className="text-xs text-muted-foreground">
                                    engagement
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>

            <TabsContent value="categories">
               <Card>
                  <CardHeader>
                     <CardTitle>Category Performance</CardTitle>
                     <CardDescription>
                        Article and view statistics by category
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <div className="space-y-4">
                        {categories.map((category, index) => (
                           <div
                              key={index}
                              className="flex items-center justify-between p-4 border rounded-lg"
                           >
                              <div className="flex-1">
                                 <h3 className="font-semibold">
                                    {category.name}
                                 </h3>
                                 <p className="text-sm text-muted-foreground mt-1">
                                    {category.articles} articles
                                 </p>
                              </div>
                              <div className="text-right">
                                 <p className="font-semibold">
                                    {category.views.toLocaleString()}
                                 </p>
                                 <p className="text-xs text-muted-foreground">
                                    total views
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </CardContent>
               </Card>
            </TabsContent>
         </Tabs>
      </div>
   );
};

export default Analytics;
