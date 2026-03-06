import { Calendar, User as UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { User } from "./AuthProvider";

export default function PublishingInfo({
   category,
   user,
}: {
   category: "zonal" | "national";
   user: User | null;
}) {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">Publishing Info</CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
               <Calendar className="w-4 h-4" />
               <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
               <UserIcon className="w-4 h-4" />
               <span>Admin - {user?.name || ""}</span>
            </div>
            {category && (
               <Badge variant="default" className="capitalize">
                  {category}
               </Badge>
            )}
         </CardContent>
      </Card>
   );
}
