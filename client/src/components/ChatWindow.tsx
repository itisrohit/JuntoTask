'use client';
import React, { useEffect, useRef, useState } from 'react'
import socket, {ChatMessage} from '@/lib/socket'
import { ChatMessage as ChatMesaageComponent} from './ChatMessage';


const ChatWindow = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const messageEndRef = useRef<HTMLDivElement>(null);
    
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }

    useEffect(() => {
        const handleMessage = (message: ChatMessage) => {
            setMessages(prev => [...prev, message]);
        };

        socket.on('receive_message', handleMessage);
        return () => {
            socket.off('receive_message', handleMessage);
        };
    }, []);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        socket.emit('send_message', { message: inputMessage });
        setInputMessage('');
    };
  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto border rounded-lg shadow-lg"
         style={{
             background: 'var(--background)',
             borderColor: 'var(--border)'
         }}>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index)=> (
                <ChatMesaageComponent key={index} message={msg} />
            ))}
            <div ref={messageEndRef}></div>
        </div>
        <form onSubmit={handleSubmit} className="border-t p-4" style={{ borderColor: 'var(--border)' }}>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{
                        background: 'var(--input)',
                        borderColor: 'var(--border)',
                        color: 'var(--foreground)'
                    }}
                    placeholder="Type a message..."
                />
                <button
                    type="submit"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Send
                </button>
            </div>
        </form>
    </div>
  )
}

export default ChatWindow
