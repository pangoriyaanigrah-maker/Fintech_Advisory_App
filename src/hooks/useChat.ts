'use client'

export {
  useChatMessages,
  useChatIsTyping,
  useChatInputValue,
  useSendMessage,
  useSetChatInputValue,
  useClearChat,
} from '@/stores/chat-store'

import {
  useChatMessages,
  useChatIsTyping,
  useChatInputValue,
  useSendMessage,
  useSetChatInputValue,
  useClearChat,
} from '@/stores/chat-store'

// Backward-compatible wrapper — keeps existing consumers working without changes
export function useChat() {
  const messages = useChatMessages()
  const isTyping = useChatIsTyping()
  const inputValue = useChatInputValue()
  const sendMessage = useSendMessage()
  const setInputValue = useSetChatInputValue()
  const clearChat = useClearChat()

  return { messages, inputValue, setInputValue, sendMessage, clearChat, isTyping }
}
