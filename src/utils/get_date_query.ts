export function getGteDate(dateRange: string): Date {
  switch (dateRange) {
    case "today":
      return new Date();
    case "last-7-days":
      return new Date(new Date().setDate(new Date().getDate() - 7));
    case "last-30-days":
      return new Date(new Date().setDate(new Date().getDate() - 30));
    default:
      return new Date();
  }
}
