import { api } from '@/utils/http/api'

export const useAvailability = () => {
  const updateAvailability = async (
    eventId: string,
    memberId: string,
    availabilities: { startDate: number; endDate: number }[]
  ) => {
    const response = await api.put('/availability/', {
      eventId,
      memberId,
      availabilities
    })

    return response.data
  }

  const getBestTime = async (eventId: string) => {
    const response = await api.post(`/availability/get_best_availability/`, {
      eventId
    })

    return response.data
  }

  return { updateAvailability, getBestTime }
}
