import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

export const getKoreanToday = () => {
  return dayjs().tz('Asia/Seoul').format('YYYY-MM-DD')
}
