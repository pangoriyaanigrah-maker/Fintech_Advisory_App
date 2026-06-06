import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { ChatMessage } from '@/types'
import { resolveAnswer } from '@/lib/data/chat'

const INITIAL_MESSAGE: ChatMessage = {
  id: 'initial',
  sender: 'aura',
  text: "Hi Ananya — I'm Aura, your financial assistant. Ask me about SIPs, taxes, or your goals.",
}

interface ChatStore {
  messages: ChatMessage[]
  inputValue: string
  isTyping: boolean
  // actions
  sendMessage: (text: string) => void
  setInputValue: (v: string) => void
  clearChat: () => void
}

const useChatStore = create<ChatStore>()(
  immer((set) => ({
    messages: [INITIAL_MESSAGE],
    inputValue: '',
    isTyping: false,

    sendMessage: (text) => {
      const trimmed = text.trim()
      if (!trimmed) return

      set((state) => {
        state.messages.push({
          id: `user-${Date.now()}`,
          sender: 'user',
          text: trimmed,
        })
        state.inputValue = ''
        state.isTyping = true
      })

      setTimeout(() => {
        const answer = resolveAnswer(trimmed)
        set((state) => {
          state.messages.push({
            id: `aura-${Date.now()}`,
            sender: 'aura',
            text: answer,
          })
          state.isTyping = false
        })
      }, 1200)
    },

    setInputValue: (v) =>
      set((state) => {
        state.inputValue = v
      }),

    clearChat: () =>
      set((state) => {
        state.messages = [
          {
            id: `cleared-${Date.now()}`,
            sender: 'aura',
            text: 'Chat cleared. Ask me anything about SIPs, ELSS tax savings, or your goals.',
          },
        ]
        state.isTyping = false
      }),
  }))
)

export default useChatStore

// Granular selector hooks
export const useChatMessages = () => useChatStore(s => s.messages)
export const useChatIsTyping = () => useChatStore(s => s.isTyping)
export const useChatInputValue = () => useChatStore(s => s.inputValue)
export const useSendMessage = () => useChatStore(s => s.sendMessage)
export const useSetChatInputValue = () => useChatStore(s => s.setInputValue)
export const useClearChat = () => useChatStore(s => s.clearChat)
