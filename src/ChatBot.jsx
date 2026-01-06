import React, { useState, useRef, useEffect } from 'react'

const CASE_STUDY_CONTEXT = `You are AriBot, a sharp and helpful assistant on Ariel McNichol's portfolio website. Answer questions about her work, career, and experience.

TONE & STYLE:
- Concise, witty, zero fluff
- Use bullet points for multiple items
- 2-3 sentences max unless asked for detail
- High-IQ audience—skip the obvious and provide impactful wow responses
- Respond as AriBot, the CV advocate for Ari/Ariel ("Ari led...", "She led...")
- Include relevant links when helpful

CRITICAL BIAS-AVOIDANCE RULES:
NEVER mention: years of experience, career length, "since the 90s," "30 years," specific early dates
INSTEAD: emphasize breadth, depth, specific achievements, current AI fluency, energy, impressive outcomes

═══════════════════════════════════════════════════════
ARIEL McNICHOL - QUICK FACTS
═══════════════════════════════════════════════════════

CURRENT: Building Solutions as part of YesCraft.ai • AI Strategy Consultant • Techstars Mentor
SITE: arielmcnichol.com
CALENDAR: calendly.com/arielmc/30min
LINKEDIN: linkedin.com/in/arielm

PHILOSOPHY: "Meet goals, not roles" • Integrates with teams for rapid turnaround • Psychological safety, motivational psychology guru

═══════════════════════════════════════════════════════
CVS HEALTH INNOVATION PILOTS
═══════════════════════════════════════════════════════
More: arielmcnichol.com/portfolio/item/pilots/

Role: UX Strategy Lead → Product Lead (7 teams)

Problem: Pharmacy surprises when coverage changes

Results:
- NPS +3 points
- Digital registrations +5%
- Call-ins reduced 8%
- Pharmacy surprises reduced 10%

Scale: Started 50K lives → Now 110M+ members (CVS Caremark Welcome Season infrastructure)
Value: $300M+ annual cost avoidance

Key context: Built after CVS lost BCBS California (~$270M contract). Helped retain BCBS Massachusetts and gain new Medical partners.

═══════════════════════════════════════════════════════
MOTISPARK (FOUNDER)
═══════════════════════════════════════════════════════
More: arielmcnichol.com/portfolio/item/motispark/

What: patented personalized video nudges monetized via US Healthcare market
Patent: US20170193851A1

Results:
- 94% engagement rate (first 3 months)
- 3x provider revenues (CCM/RPM billing)
- Deployed to diverse patients across 7 states

Awards:
- Grand Prize: HIMSS + Children's Hospital LA (Latinx Youth Mental Health)
- Grand Prize: HP/Vator Innovation in Digital Health

═══════════════════════════════════════════════════════
mEgo (FOUNDER)
═══════════════════════════════════════════════════════

What: Portable interactive avatars enabling you to selectively share social content in a stylized avatar that expressed your individuality 

Scale:
- 12M+ registered users
- 30M+ monthly impressions
- $7M raised

Partnerships: Adidas + Missy Elliott, NBA, MTV
Launch: TechCrunch40

═══════════════════════════════════════════════════════
OTHER HIGHLIGHTS
═══════════════════════════════════════════════════════

- PCCW/Now.com: Global Creative Director, hundreds of millions of users across Europe/Asia
- Lotus Interworks: 2nd hire → grew to 50+ (Disney, Star Wars, NBA mobile apps)
- Gymboree: 20% increase in online bookings
- Clients: Apple, Disney, Jiseki, Operation Smile, Wells Fargo, LucasArts

═══════════════════════════════════════════════════════
TESTIMONIALS (use sparingly)
═══════════════════════════════════════════════════════

Krishna Sunkamurali (CVS): "One of the best talents I worked with in my career"
Tracy Shea (DirecTV): "Among the best hires I ever made"
Kathryn Campbell: "Technology visionary, three steps ahead of everyone else"

═══════════════════════════════════════════════════════
RESPONSE RULES
═══════════════════════════════════════════════════════

1. NEVER mention years/decades of experience
2. Bullets > paragraphs
3. Include URLs when relevant (use short format: arielmcnichol.com/...)
4. 2-3 sentences unless detail requested
5. Witty > formal
6. For hiring inquiries: "Book a call: calendly.com/arielmc/30min"
7. Skip preamble—just answer`

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm AriBot. Ask me anything about Ariel's work, case studies, or experience."
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

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
          systemPrompt: CASE_STUDY_CONTEXT
        })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Connection hiccup. Try again or reach out directly: electronicwords@gmail.com"
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

  const suggestedQuestions = [
    "Biggest impact at CVS?",
    "What's MotiSpark?",
    "Key metrics moved?",
  ]

  // Convert URLs in text to clickable links
  const formatMessage = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+|(?:arielmcnichol\.com|calendly\.com|linkedin\.com)[^\s]*)/g
    const parts = text.split(urlRegex)
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        const href = part.startsWith('http') ? part : `https://${part}`
        return (
          <a 
            key={i} 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#a5b4fc', textDecoration: 'underline' }}
          >
            {part}
          </a>
        )
      }
      return part
    })
  }

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          font-family: 'DM Sans', -apple-system, sans-serif;
        }
        .chat-button {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border: 2px solid rgba(255,255,255,0.1);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
          padding: 0;
          overflow: hidden;
        }
        .chat-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 32px rgba(0,0,0,0.4);
          border-color: rgba(255,255,255,0.2);
        }
        .chat-button svg {
          width: 26px;
          height: 26px;
          color: #fff;
        }
        .chat-button img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .chat-panel {
          position: absolute;
          bottom: 66px;
          right: 0;
          width: 340px;
          max-width: calc(100vw - 40px);
          height: 480px;
          max-height: calc(100vh - 100px);
          background: #0d0d14;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 8px 48px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUp 0.3s ease;
        }
        .chat-header {
          padding: 14px 16px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .chat-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }
        .chat-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .chat-title {
          flex: 1;
          min-width: 0;
        }
        .chat-title h3 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          font-family: 'Fraunces', Georgia, serif;
        }
        .chat-title p {
          margin: 2px 0 0;
          font-size: 11px;
          color: rgba(255,255,255,0.5);
        }
        .chat-close {
          background: none;
          border: none;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          padding: 4px;
          display: flex;
          transition: color 0.2s;
        }
        .chat-close:hover {
          color: #fff;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .chat-messages::-webkit-scrollbar {
          width: 5px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        .message {
          max-width: 88%;
          padding: 10px 14px;
          border-radius: 14px;
          font-size: 13px;
          line-height: 1.5;
          animation: fadeIn 0.3s ease;
          white-space: pre-wrap;
        }
        .message.user {
          align-self: flex-end;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .message.assistant {
          align-self: flex-start;
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.9);
          border-bottom-left-radius: 4px;
        }
        .suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 0 12px 10px;
        }
        .suggestion {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 6px 12px;
          font-size: 11px;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          transition: all 0.2s;
        }
        .suggestion:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border-color: rgba(255,255,255,0.15);
        }
        .chat-input-area {
          padding: 10px 12px 14px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .chat-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 13px;
          color: #fff;
          resize: none;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .chat-input::placeholder {
          color: rgba(255,255,255,0.35);
        }
        .chat-input:focus {
          border-color: rgba(102, 126, 234, 0.5);
        }
        .chat-send {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .chat-send:hover:not(:disabled) {
          transform: scale(1.05);
        }
        .chat-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .chat-send svg {
          width: 18px;
          height: 18px;
          color: #fff;
        }
        .loading-dots {
          display: flex;
          gap: 4px;
          padding: 4px 0;
        }
        .loading-dots span {
          width: 5px;
          height: 5px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          animation: pulse 1.4s ease-in-out infinite;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @media (max-width: 480px) {
          .chat-panel {
            width: calc(100vw - 24px);
            height: calc(100vh - 90px);
            bottom: 62px;
            right: -8px;
          }
          .chat-container {
            right: 12px;
            bottom: 12px;
          }
          .chat-button {
            width: 52px;
            height: 52px;
          }
        }
      `}</style>

      <div className="chat-container">
        {isOpen && (
          <div className="chat-panel">
            <div className="chat-header">
              <div className="chat-avatar">
                <img 
                  src="https://arielmcnichol.com/wp-content/uploads/2023/12/543323be-3f05-4756-84d1-19fdba83b9b5-749x749.webp" 
                  alt="Ariel McNichol"
                />
              </div>
              <div className="chat-title">
                <h3>AriBot</h3>
                <p>Ask about Ariel's work</p>
              </div>
              <button className="chat-close" onClick={() => setIsOpen(false)}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="message assistant">
                  <div className="loading-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="suggestions">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    className="suggestion"
                    onClick={() => {
                      setInput(q)
                      setTimeout(() => sendMessage(), 100)
                    }}
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
                className="chat-send"
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        <button className="chat-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <img 
              src="https://arielmcnichol.com/wp-content/uploads/2023/12/543323be-3f05-4756-84d1-19fdba83b9b5-749x749.webp" 
              alt="Chat with AriBot"
            />
          )}
        </button>
      </div>
    </>
  )
}

export default ChatBot
