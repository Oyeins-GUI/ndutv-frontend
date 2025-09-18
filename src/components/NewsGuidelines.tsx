import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function NewsGuidelines() {
   return (
      <Card>
         <CardHeader>
            <CardTitle className="text-lg">Writing Guidelines</CardTitle>
         </CardHeader>
         <CardContent className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start space-x-2">
               <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0"></div>
               <span>Use clear, concise headlines</span>
            </div>
            <div className="flex items-start space-x-2">
               <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0"></div>
               <span>Keep paragraphs short and readable</span>
            </div>
            <div className="flex items-start space-x-2">
               <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0"></div>
               <span>Include relevant keywords</span>
            </div>
            <div className="flex items-start space-x-2">
               <div className="w-2 h-2 bg-red-600 rounded-full mt-2 shrink-0"></div>
               <span>Verify facts before publishing</span>
            </div>
         </CardContent>
      </Card>
   );
}
