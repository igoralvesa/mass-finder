export interface MassSchedule {
  id: number
  parish_id: number
  day_of_week: number
  time: string
  notes: string | null
}
