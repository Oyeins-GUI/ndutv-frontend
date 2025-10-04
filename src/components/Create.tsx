import { Save, Tag, Upload, UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import ReactQuill from "react-quill-new";
import { Button } from "./ui/button";
import PublishingInfo from "./PublishingInfo";
import NewsGuidelines from "./NewsGuidelines";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

type NewsData = {
   title: string;
   content: string;
   category: string;
   author: string;
   coverImage: File[];
   summary: string;
};

const modules = {
   toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
   ],
};

export default function Create() {
   const [isLoading] = useState(false);

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

   const { user } = useAuth();

   const { register, control, handleSubmit, watch } = useForm<NewsData>({
      defaultValues: {
         title: "",
         category: "general",
         author: user?.name || "",
         summary: "",
         content: "",
         coverImage: undefined,
      },
   });
   const values = watch();

   const onSubmit: SubmitHandler<NewsData> = async (data) => {
      console.log(data);
   };

   return (
      <>
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
                     <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                     >
                        <div className="space-y-2">
                           <Label htmlFor="title">Article Title *</Label>
                           <Input
                              id="title"
                              {...register("title", {
                                 required: true,
                              })}
                              placeholder="Enter news title"
                              required
                              className="text-lg font-medium"
                           />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="author">Author *</Label>
                              <div className="relative">
                                 <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                 <Input
                                    id="author"
                                    {...register("author")}
                                    disabled
                                    className="pl-10"
                                 />
                              </div>
                           </div>

                           <div className="space-y-2">
                              <Label htmlFor="category">Category *</Label>
                              <div className="relative">
                                 <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                 <Controller
                                    name="category"
                                    control={control}
                                    render={({
                                       field: { value, onChange },
                                    }) => (
                                       <select
                                          id="category"
                                          className="w-full h-10 pl-10 pr-3 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                          required
                                          value={value}
                                          onChange={onChange}
                                       >
                                          {categories.map((category) => (
                                             <option key={category}>
                                                {category
                                                   .charAt(0)
                                                   .toUpperCase() +
                                                   category.slice(1)}
                                             </option>
                                          ))}
                                       </select>
                                    )}
                                 />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="imageUrl">Featured Image URL</Label>
                           <div className="relative">
                              <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <Input
                                 type="file"
                                 accept="image/*"
                                 {...register("coverImage", {
                                    required: true,
                                 })}
                                 className="pl-10"
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="summary">Article Summary *</Label>
                           <Textarea
                              id="summary"
                              {...register("summary", {
                                 required: true,
                              })}
                              placeholder="Brief summary of the article (2-3 sentences)..."
                              required
                              rows={3}
                              className="resize-none"
                           />
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="content">Article Content *</Label>
                           <Controller
                              name="content"
                              control={control}
                              rules={{
                                 required: true,
                                 minLength: {
                                    value: 100,
                                    message: "Content too short",
                                 },
                              }}
                              render={({ field: { value, onChange } }) => (
                                 <ReactQuill
                                    theme="snow"
                                    value={value}
                                    onChange={onChange}
                                    modules={modules}
                                    placeholder="Write something..."
                                    style={{
                                       color: "black",
                                       background: "white",
                                       border: "1px solid transparent",
                                       borderRadius: "6px",
                                    }}
                                 />
                              )}
                           />
                        </div>

                        <div className="flex items-center space-x-4 pt-4">
                           <Button
                              type="submit"
                              disabled={isLoading}
                              className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-medium transition-all"
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
                        </div>
                     </form>
                  </CardContent>
               </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
               <PublishingInfo
                  category={values.category}
                  faculty={user?.scope || ""}
               />
               <NewsGuidelines />
            </div>
         </div>
      </>
   );
}
