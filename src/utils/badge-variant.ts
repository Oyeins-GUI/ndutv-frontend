export const getRoleBadgeVariant = (role: string) => {
   switch (role) {
      case "CENTRAL":
         return "destructive";
      case "FACULTY":
         return "default";
      default:
         return "secondary";
   }
};
