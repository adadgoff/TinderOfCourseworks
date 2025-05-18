import { GreyP } from "@/shared/ui/p";
import { formatDateTimeByLocale } from "@/shared/lib/date";

export function DateTime({ datetime }: { datetime: Date }) {
  return <GreyP>{formatDateTimeByLocale(datetime)}</GreyP>;
}
