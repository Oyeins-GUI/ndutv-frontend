import { Save, SendHorizontalIcon, Tag, Upload, UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import ReactQuill from "react-quill-new";
import { Button } from "./ui/button";
import PublishingInfo from "./PublishingInfo";
import NewsGuidelines from "./NewsGuidelines";
import { useAuth } from "@/hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse } from "./AuthProvider";
import { Article } from "./ArticleProvider";
import { useToast } from "@/hooks/use-toast";
import { createArticle } from "@/services/articles";

export type NewsData = {
   author_name: string;
   content: string;
   summary: string;
   title: string;
   category: "ZONAL" | "NATIONAL";
   is_featured: boolean;
   image_url: File[] | "";
};

const modules = {
   toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
   ],
};

export default function Create() {
   const categories = ["ZONAL", "NATIONAL"];
   const { user } = useAuth();
   const queryClient = useQueryClient();
   const { toast } = useToast();

   const {
      register,
      control,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
   } = useForm<NewsData>({
      defaultValues: {
         title: "",
         category: "ZONAL",
         author_name: user?.name || "",
         summary: "",
         content: "",
         is_featured: false,
         image_url: [],
      },
   });
   const values = watch();

   const createArticleMutation = useMutation({
      mutationFn: createArticle,
      onSuccess: (data: ApiResponse<Article[]>) => {
         queryClient.invalidateQueries({ queryKey: ["articles"] });

         toast({
            title: "Successfully sent for approval",
            description: data.message,
         });

         reset();
      },
      onError: (error: ApiResponse<Error>) => {
         toast({
            title: "Failed to send for approval",
            description: error.message || "Something went wrong",
            variant: "error",
         });
      },
   });

   const onSubmit: SubmitHandler<NewsData> = async ({
      category,
      content,
      image_url,
      is_featured,
      summary,
      title,
   }) => {
      // console.log(data);
      createArticleMutation.mutate({
         category,
         content,
         image_url,
         is_featured,
         summary,
         title,
      });
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
                                 required: "Title is required",
                              })}
                              placeholder="Enter news title"
                              className=""
                           />

                           {errors.title && (
                              <p className="text-label_small text-red-500">
                                 {errors.title.message}
                              </p>
                           )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="author_name">Author *</Label>
                              <div className="relative">
                                 <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                 <Input
                                    id="author_name"
                                    {...register("author_name")}
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

                              {errors.category && (
                                 <p className="text-label_small text-red-500">
                                    {errors.category.message}
                                 </p>
                              )}
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor="image_url">
                                 Featured Image URL *
                              </Label>
                              <div className="relative">
                                 <Upload className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                 <Input
                                    type="file"
                                    accept="image/*"
                                    {...register("image_url", {
                                       required: "Image is required",
                                    })}
                                    className="pl-10"
                                 />
                              </div>

                              {errors.image_url && (
                                 <p className="text-label_small text-red-500">
                                    {errors.image_url.message}
                                 </p>
                              )}
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="flex items-center">
                              <input
                                 type="checkbox"
                                 {...register("is_featured")}
                                 className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                              />
                              <span className="ml-2 text-gray-400">
                                 Is Featured?
                              </span>
                           </label>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="summary">Article Summary *</Label>
                           <Textarea
                              id="summary"
                              {...register("summary", {
                                 required: "Summary is required",
                              })}
                              placeholder="Brief summary of the article (2-3 sentences)..."
                              rows={3}
                              className="resize-none"
                           />
                           {errors.summary && (
                              <p className="text-label_small text-red-500">
                                 {errors.summary.message}
                              </p>
                           )}
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="content">Article Content *</Label>
                           <Controller
                              name="content"
                              control={control}
                              rules={{
                                 required: "Content is required",
                                 minLength: {
                                    value: 100,
                                    message:
                                       "Content too short. 100 words minimum",
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
                           {errors.content && (
                              <p className="text-label_small text-red-500">
                                 {errors.content.message}
                              </p>
                           )}
                        </div>

                        <div className="flex items-center space-x-4 pt-4">
                           <Button
                              type="submit"
                              disabled={createArticleMutation.isPending}
                              className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-medium transition-all"
                           >
                              {createArticleMutation.isPending ? (
                                 <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Sending...</span>
                                 </div>
                              ) : (
                                 <>
                                    <SendHorizontalIcon className="w-4 h-4" />
                                    Send for Approval
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
               <PublishingInfo category={values.category} user={user} />
               <NewsGuidelines />
            </div>
         </div>
      </>
   );
}
