'use client'
import { ChatMessage as ChatMessageType } from "@/lib/socket"
import socket from "@/lib/socket"

type ChatMessageProps = {
    message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isOwnMessage = message.userId === socket.id;

  return (
      <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
          <div 
              className={`max-w-[70%] rounded-lg p-3`}
              style={{
                  background: isOwnMessage ? 'var(--primary)' : 'var(--secondary)',
                  color: isOwnMessage ? 'var(--primary-foreground)' : 'var(--secondary-foreground)'
              }}
          >
              <p className="break-words">{message.message}</p>
              <span className="text-xs opacity-70 block mt-1">
                  {new Date(message.timeStamp).toLocaleTimeString()}
              </span>
          </div>
      </div>
  );
}