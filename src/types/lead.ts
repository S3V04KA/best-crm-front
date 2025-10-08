import { LeadResponseDto } from "@/api";

export const LeadStatus: Record<string, LeadResponseDto.status> = {
  "Отправили КП": LeadResponseDto.status._0,
  "Перезвонить": LeadResponseDto.status._1,
  "Подписание договора": LeadResponseDto.status._2,
  "Отклонили": LeadResponseDto.status._3,
}

export const CallType: Record<string, LeadResponseDto.callType> = {
  "Первичный созвон": LeadResponseDto.callType._0,
  "Подписание договора": LeadResponseDto.callType._1,
  "Отправили КП": LeadResponseDto.callType._2,
  "Без звонка": LeadResponseDto.callType._3,
}