export function formatPhoneNumber(phoneNumber: string) {
   if (!phoneNumber) return "";

   const cleanedNumber = phoneNumber.replace(/\D/g, "");

   if (cleanedNumber.length === 11 && cleanedNumber.startsWith("0"))
      return phoneNumber.replace(/^0/, "+234");

   if (cleanedNumber.length === 13 && cleanedNumber.startsWith("234"))
      return `+${phoneNumber}`;

   if (cleanedNumber.length === 14 && cleanedNumber.startsWith("+234"))
      return phoneNumber;

   return "";
}
