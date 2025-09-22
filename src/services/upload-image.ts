export default async function uploadImage(file: File): Promise<string | null> {
   if (!file) return null;

   const formData = new FormData();
   formData.append("file", file);
   formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
   formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

   const res = await fetch(
      `https://api.cloudinary.com/v1_1/${
         import.meta.env.VITE_CLOUD_NAME
      }/image/upload`,
      { method: "POST", body: formData }
   );

   if (!res.ok) throw new Error("Failed to upload image");
   const data = await res.json();
   return data.secure_url;
}
