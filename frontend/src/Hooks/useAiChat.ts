import axios from 'axios'
import { useMutation } from '@tanstack/react-query'

export const useAiChat = () => {
  return useMutation({
    mutationFn: async (query: string) => {
      const response = await axios.post("/api/v1/retrive/response/chat", {
    query
  })

  return response;
    }
   })
}