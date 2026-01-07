import React, { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `You are AriBot, a sharp assistant on Ariel McNichol's portfolio website.

TONE: Concise, witty, zero fluff. Use bullets, **bold**, emojis for scanning. 2-5 sentences unless detail requested. If making inferred responses that maybe incorrect, tell user in short witty way

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
Designed, patented and monetized AI-powered personalized video nudges for patient engagement.
• 94% engagement rate • 3x provider revenues • Patent: US20170193851A1
More: arielmcnichol.com/portfolio/item/motispark/

mEGO (Founder): Portable avatar platform. 12M+ users, $7M raised, TechCrunch40.

OTHER: PCCW Global Creative Director, Lotus Interworks (grew 3→50+), Apple, Disney, Yahoo clients.`

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi Human 👋 Ask me anything about Ariel's experience, work psyche, etc." }
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

  const sendMessage = async (text) => {
    const messageText = text || input.trim()
    if (!messageText || isLoading) return
    
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: messageText }])
    setIsLoading(true)

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: messageText }],
          systemPrompt: SYSTEM_PROMPT
        })
      })
      if (!response.ok) throw new Error('Failed')
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Connection hiccup — try again or email arielmcnichol@gmail.com"
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
      const regex = /(\*\*(.+?)\*\*)|(https?:\/\/[^\s\]\)]+)|(arielmcnichol\.com[^\s\]\)]*)/g
      let match
      
      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(<span key={`t${i}-${lastIndex}`}>{line.slice(lastIndex, match.index)}</span>)
        }
        if (match[1]) {
          parts.push(<strong key={`b${i}-${match.index}`}>{match[2]}</strong>)
        } else {
          const url = match[3] || match[4]
          const href = url.startsWith('http') ? url : `https://${url}`
          const display = url.replace(/^https?:\/\//, '')
          parts.push(
            <a key={`a${i}-${match.index}`} href={href} target="_blank" rel="noopener noreferrer" className="msg-link">
              {display}
            </a>
          )
        }
        lastIndex = regex.lastIndex
      }
      
      if (lastIndex < line.length) {
        parts.push(<span key={`e${i}-${lastIndex}`}>{line.slice(lastIndex)}</span>)
      }
      
      return (
        <React.Fragment key={i}>
          {parts.length > 0 ? parts : line}
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      )
    })
  }

  const showSuggestions = messages.length === 1

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        html, body, #root {
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #111118;
          touch-action: pan-y;
        }
        
        .chat-root {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #111118;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 15px;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
          border-radius: 16px;
          overflow: hidden;
        }
        
        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          flex-shrink: 0;
        }
        
        .chat-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .chat-title {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
        }
        
        .chat-subtitle {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          margin-top: 1px;
        }
        
        .chat-body {
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .chat-body::-webkit-scrollbar { width: 5px; }
        .chat-body::-webkit-scrollbar-track { background: transparent; }
        .chat-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
        
        .msg {
          max-width: 88%;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 15px;
          line-height: 1.5;
          word-wrap: break-word;
        }
        
        .msg-user {
          align-self: flex-end;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        
        .msg-assistant {
          align-self: flex-start;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.92);
          border-bottom-left-radius: 4px;
        }
        
        .msg-link {
          color: #93c5fd;
          text-decoration: none;
        }
        .msg-link:hover { text-decoration: underline; }
        
        .typing {
          display: flex;
          gap: 4px;
          padding: 12px 14px;
          background: rgba(255,255,255,0.08);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          align-self: flex-start;
        }
        
        .typing span {
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }
        .typing span:nth-child(2) { animation-delay: 0.16s; }
        .typing span:nth-child(3) { animation-delay: 0.32s; }
        
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.1); opacity: 1; }
        }
        
        .suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 4px 16px 12px;
        }
        
        .sug-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 18px;
          padding: 8px 14px;
          font-size: 14px;
          font-family: inherit;
          color: rgba(255,255,255,0.8);
          cursor: pointer;
          transition: all 0.15s;
        }
        .sug-btn:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.25);
          color: #fff;
        }
        
        .chat-footer {
          display: flex;
          gap: 10px;
          padding: 12px 16px 16px;
          background: #111118;
          flex-shrink: 0;
        }
        
        .chat-input {
          flex: 1;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          padding: 11px 14px;
          font-size: 15px;
          font-family: inherit;
          color: #fff;
          resize: none;
          outline: none;
        }
        .chat-input::placeholder { color: rgba(255,255,255,0.35); }
        .chat-input:focus { border-color: rgba(255,255,255,0.25); }
        
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
          transition: all 0.15s;
        }
        .send-btn:hover:not(:disabled) { transform: scale(1.05); }
        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .send-btn svg { width: 20px; height: 20px; }
      `}</style>

      <div className="chat-root">
        <header className="chat-header">
          <img 
            className="chat-avatar"
            src="https://arielmcnichol.com/wp-content/uploads/2023/12/543323be-3f05-4756-84d1-19fdba83b9b5-749x749.webp" 
            alt="Ariel"
          />
          <div>
            <div className="chat-title">AriBot</div>
            <div className="chat-subtitle">Ask about Ariel's work</div>
          </div>
        </header>

        <div className="chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`msg msg-${msg.role}`}>
              {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
            </div>
          ))}
          
          {isLoading && (
            <div className="typing">
              <span /><span /><span />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {showSuggestions && (
          <div className="suggestions">
            {suggestions.map((q, i) => (
              <button key={i} className="sug-btn" onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        <div className="chat-footer">
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
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            aria-label="Send"
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
