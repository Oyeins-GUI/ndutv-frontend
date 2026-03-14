import {
   formatDistanceToNowStrict,
   format,
   differenceInDays,
   differenceInSeconds,
} from "date-fns";

export function formatArticleDate(dateString: string) {
   const date = new Date(dateString);

   if (differenceInSeconds(new Date(), date) < 60) {
      return "Just now";
   }

   if (differenceInDays(new Date(), date) < 3) {
      return formatDistanceToNowStrict(date, { addSuffix: true });
   }

   return format(date, "MMM d, yyyy");
}
