import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
   Play,
   LogOut,
   Upload,
   Save,
   Eye,
   Calendar,
   User,
   Tag,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ThemeToggle from "@/components/ThemeToggle";

const AdminDashboard = () => {
   const [newsData, setNewsData] = useState({
      title: "",
      content: "",
      category: "general",
      author: "",
      imageUrl: "",
      summary: "",
   });
   const [isLoading, setIsLoading] = useState(false);
   const [previewMode, setPreviewMode] = useState(false);
   const { toast } = useToast();
   const navigate = useNavigate();

   const categories = [
      "general",
      "sug",
      "faculty",
      "department",
      "state",
      "national",
      "sports",
      "academics",
      "events",
   ];

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
         toast({
            title: "News Published Successfully!",
            description: "Your news article has been published to NDUtv",
         });
         setIsLoading(false);
         // Reset form
         setNewsData({
            title: "",
            content: "",
            category: "general",
            author: "",
            imageUrl: "",
            summary: "",
         });
      }, 1500);
   };

   const handleLogout = () => {
      toast({
         title: "Logged Out",
         description: "You have been successfully logged out",
      });
      navigate("/admin/login");
   };

   const handleInputChange = (field: string, value: string) => {
      setNewsData((prev) => ({ ...prev, [field]: value }));
   };

   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
         {/* Header */}
         <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
               <div className="flex items-center justify-between">
                  <Link to="/" className="flex items-center space-x-3 group">
                     <div className="bg-red-600 p-2 rounded group-hover:bg-red-700 transition-all duration-300">
                        <Play className="w-6 h-6 text-white" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                           NDUtv
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 -mt-1">
                           Admin Dashboard
                        </span>
                     </div>
                  </Link>

                  <div className="flex items-center space-x-4">
                     <ThemeToggle />
                     <Button
                        onClick={handleLogout}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2"
                     >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                     </Button>
                  </div>
               </div>
            </div>
         </header>

         <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
               <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                     Create News Article
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                     Publish news and updates for the NDUtv platform
                  </p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Form */}
                  <div className="lg:col-span-2">
                     <Card className="shadow-lg">
                        <CardHeader>
                           <CardTitle className="flex items-center space-x-2">
                              <Save className="w-5 h-5" />
                              <span>Article Details</span>
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <form onSubmit={handleSubmit} className="space-y-6">
                              <div className="space-y-2">
                                 <Label htmlFor="title">Article Title *</Label>
                                 <Input
                                    id="title"
                                    value={newsData.title}
                                    onChange={(e) =>
                                       handleInputChange(
                                          "title",
                                          e.target.value
                                       )
                                    }
                                    placeholder="Enter compelling news title..."
                                    required
                                    className="text-lg font-medium"
                                 />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                    <Label htmlFor="author">Author *</Label>
                                    <div className="relative">
                                       <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                       <Input
                                          id="author"
                                          value={newsData.author}
                                          onChange={(e) =>
                                             handleInputChange(
                                                "author",
                                                e.target.value
                                             )
                                          }
                                          placeholder="Author name"
                                          required
                                          className="pl-10"
                                       />
                                    </div>
                                 </div>

                                 <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <div className="relative">
                                       <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                       <select
                                          id="category"
                                          value={newsData.category}
                                          onChange={(e) =>
                                             handleInputChange(
                                                "category",
                                                e.target.value
                                             )
                                          }
                                          className="w-full h-10 pl-10 pr-3 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                          required
                                       >
                                          {categories.map((cat) => (
                                             <option key={cat} value={cat}>
                                                {cat.charAt(0).toUpperCase() +
                                                   cat.slice(1)}
                                             </option>
                                          ))}
                                       </select>
                                    </div>
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="imageUrl">
                                    Featured Image URL
                                 </Label>
                                 <div className="relative">
                                    <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                       id="imageUrl"
                                       value={newsData.imageUrl}
                                       onChange={(e) =>
                                          handleInputChange(
                                             "imageUrl",
                                             e.target.value
                                          )
                                       }
                                       placeholder="https://example.com/image.jpg"
                                       className="pl-10"
                                    />
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="summary">
                                    Article Summary *
                                 </Label>
                                 <Textarea
                                    id="summary"
                                    value={newsData.summary}
                                    onChange={(e) =>
                                       handleInputChange(
                                          "summary",
                                          e.target.value
                                       )
                                    }
                                    placeholder="Brief summary of the article (2-3 sentences)..."
                                    required
                                    rows={3}
                                    className="resize-none"
                                 />
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="content">
                                    Article Content *
                                 </Label>
                                 <Textarea
                                    id="content"
                                    value={newsData.content}
                                    onChange={(e) =>
                                       handleInputChange(
                                          "content",
                                          e.target.value
                                       )
                                    }
                                    placeholder="Write your full article content here..."
                                    required
                                    rows={12}
                                    className="resize-none"
                                 />
                              </div>

                              <div className="flex items-center space-x-4 pt-4">
                                 <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-300"
                                 >
                                    {isLoading ? (
                                       <div className="flex items-center space-x-2">
                                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                          <span>Publishing...</span>
                                       </div>
                                    ) : (
                                       <>
                                          <Save className="w-4 h-4 mr-2" />
                                          Publish Article
                                       </>
                                    )}
                                 </Button>

                                 <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setPreviewMode(!previewMode)}
                                 >
                                    <Eye className="w-4 h-4 mr-2" />
                                    {previewMode ? "Edit Mode" : "Preview"}
                                 </Button>
                              </div>
                           </form>
                        </CardContent>
                     </Card>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                     {/* Quick Stats */}
                     <Card>
                        <CardHeader>
                           <CardTitle className="text-lg">
                              Publishing Info
                           </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date().toLocaleDateString()}</span>
                           </div>
                           <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <User className="w-4 h-4" />
                              <span>Admin User</span>
                           </div>
                           {newsData.category && (
                              <Badge variant="secondary" className="capitalize">
                                 {newsData.category}
                              </Badge>
                           )}
                        </CardContent>
                     </Card>

                     {/* Guidelines */}
                     <Card>
                        <CardHeader>
                           <CardTitle className="text-lg">
                              Writing Guidelines
                           </CardTitle>
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
                  </div>
               </div>

               {/* Preview Mode */}
               {previewMode && newsData.title && (
                  <Card className="mt-8 shadow-lg">
                     <CardHeader>
                        <CardTitle>Article Preview</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                           <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                              {newsData.title}
                           </h1>
                           <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                              <span>By {newsData.author || "Author Name"}</span>
                              <span>•</span>
                              <span>{new Date().toLocaleDateString()}</span>
                              <Badge variant="secondary" className="capitalize">
                                 {newsData.category}
                              </Badge>
                           </div>
                           {newsData.imageUrl && (
                              <img
                                 src={newsData.imageUrl}
                                 alt={newsData.title}
                                 className="w-full h-64 object-cover rounded-lg mb-6"
                              />
                           )}
                           {newsData.summary && (
                              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6 italic">
                                 {newsData.summary}
                              </div>
                           )}
                           <div className="whitespace-pre-wrap">
                              {newsData.content ||
                                 "Article content will appear here..."}
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               )}
            </div>
         </div>
      </div>
   );
};

export default AdminDashboard;
