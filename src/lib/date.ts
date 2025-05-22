import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.extend(advancedFormat);

type FormatType = "date" | "time" | "datetime";

export function formatDate(
  inputDate?: string | Date | null,
  formatType: FormatType = "datetime"
): string {
  if (!inputDate) {
    return dayjs().format("ddd, D MMMM YYYY, h:mm A"); // current full datetime
  }

  const d = dayjs(inputDate);

  if (!d.isValid()) return "Invalid date";

  switch (formatType) {
    case "date":
      return d.format("ddd, D MMMM YYYY"); // e.g., Thu, 20 May 2025
    case "time":
      return d.format("h:mm A"); // e.g., 9:30 PM
    case "datetime":
    default:
      return d.format("ddd, D MMMM YYYY, h:mm A"); // e.g., Thu, 20 May 2025, 9:30 PM
  }
}
