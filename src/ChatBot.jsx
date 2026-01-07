import React, { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `You are AriBot, a sharp assistant on Ariel McNichol's portfolio website.

TONE: Concise, witty, zero fluff. Use bullets, **bold**, emojis for scanning. 2-5 sentences unless detail requested.

NEVER mention: years of experience, "since the 90s," specific early dates. Focus on WHAT she built and results.

KEY INFO:
- CURRENT: YesCraft.ai founder, AI Strategy Consultant, Techstars Mentor
- EMAIL: arielmcnichol@gmail.com

CVS HEALTH (UX Lead → Product Lead):
Built proactive digital onboarding reaching patients BEFORE plan changes.
• NPS +3 points • Digital registrations +5% • Call-ins -8%
• Scale: 50K → 110M+ members • Impact: $300M+ cost avoidance
More: arielmcnichol.com/portfolio/item/pilots/

MOTISPARK (Co-founder):
AI-powered personalized video nudges for patient engagement.
• 94% engagement rate • 3x provider revenues • Patent: US20170193851A1
More: arielmcnichol.com/portfolio/item/motispark/

mEGO (Founder): Portable avatar platform. 12M+ users, $7M raised, TechCrunch40.

OTHER: PCCW Global Creative Director, Lotus Interworks (grew 3→50+), Apple, Disney, Yahoo clients.`

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm AriBot. Ask me anything about Ariel's work, case studies, or experience." }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return
    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          systemPrompt: SYSTEM_PROMPT
        })
      })
      if (!response.ok) throw new Error('Failed')
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Connection hiccup. Try again or email arielmcnichol@gmail.com"
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const suggestions = [
    "What did Ariel build at CVS?",
    "MotiSpark results?",
    "Why hire Ariel?"
  ]

  const formatMessage = (text) => {
    return text.split('\n').map((line, i, arr) => {
      const parts = []
      let lastIndex = 0
      const regex = /(\*\*(.+?)\*\*)|(https?:\/\/[^\s\]]+)|(arielmcnichol\.com[^\s\]]*)/g
      let match
      
      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(<span key={`t${lastIndex}`}>{line.slice(lastIndex, match.index)}</span>)
        }
        if (match[1]) {
          parts.push(<strong key={`b${match.index}`}>{match[2]}</strong>)
        } else {
          const url = match[3] || match[4]
          const href = url.startsWith('http') ? url : `https://${url}`
          parts.push(
            <a key={`a${match.index}`} href={href} target="_blank" rel="noopener noreferrer" className="chat-link">
              {url.replace('https://', '').replace('http://', '')}
            </a>
          )
        }
        lastIndex = regex.lastIndex
      }
      
      if (lastIndex < line.length) {
        parts.push(<span key={`e${lastIndex}`}>{line.slice(lastIndex)}</span>)
      }
      
      return (
        <React.Fragment key={i}>
          {parts.length > 0 ? parts : line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      )
    })
  }

  return (
    <>
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        html, body, #root {
          width: 100%;
          height: 100%;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
          font-size: 15px;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }
        
        .chat-container {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #111118;
          border-radius: 16px;
          overflow: hidden;
        }
        
        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          flex-shrink: 0;
        }
        
        .chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }
        
        .chat-header-text h1 {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          margin: 0;
        }
        
        .chat-header-text p {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          margin: 2px 0 0 0;
        }
        
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15);
          border-radius: 3px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.25);
        }
        
        .message {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 15px;
          line-height: 1.5;
        }
        
        .message-user {
          align-self: flex-end;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        
        .message-assistant {
          align-self: flex-start;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.92);
          border-bottom-left-radius: 4px;
        }
        
        .chat-link {
          color: #a5b4fc;
          text-decoration: none;
        }
        
        .chat-link:hover {
          text-decoration: underline;
        }
        
        .typing-indicator {
          display: flex;
          gap: 5px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.08);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          align-self: flex-start;
        }
        
        .typing-dot {
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes typing {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        
        .suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0 16px 12px;
          flex-shrink: 0;
        }
        
        .suggestion-btn {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 8px 14px;
          font-size: 14px;
          font-family: inherit;
          color: rgba(255,255,255,0.75);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        
        .suggestion-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          color: #fff;
        }
        
        .chat-input-area {
          display: flex;
          gap: 10px;
          padding: 16px;
          border-top: 1px solid rgba(255,255,255,0.08);
          background: #111118;
          flex-shrink: 0;
        }
        
        .chat-input {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 15px;
          font-family: inherit;
          color: #fff;
          resize: none;
          outline: none;
          transition: border-color 0.15s ease;
        }
        
        .chat-input::placeholder {
          color: rgba(255,255,255,0.35);
        }
        
        .chat-input:focus {
          border-color: rgba(255,255,255,0.25);
        }
        
        .send-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        
        .send-btn:hover:not(:disabled) {
          transform: scale(1.05);
        }
        
        .send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        
        .send-btn svg {
          width: 20px;
          height: 20px;
        }
      `}</style>

      <div className="chat-container">
        <header className="chat-header">
          <img 
            className="chat-avatar"
            src="https://arielmcnichol.com/wp-content/uploads/2023/12/543323be-3f05-4756-84d1-19fdba83b9b5-749x749.webp" 
            alt="Ariel"
          />
          <div className="chat-header-text">
            <h1>AriBot</h1>
            <p>Ask about Ariel's work</p>
          </div>
        </header>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message message-${msg.role}`}>
              {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
            </div>
          ))}
          
          {isLoading && (
            <div className="typing-indicator">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="suggestions">
            {suggestions.map((q, i) => (
              <button 
                key={i} 
                className="suggestion-btn"
                onClick={() => { setInput(q); setTimeout(sendMessage, 50) }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="chat-input-area">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            rows={1}
          />
          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
