import React, { useState, useRef, useEffect } from 'react'

const CASE_STUDY_CONTEXT = `You are AriBot, a sharp and helpful assistant on Ariel McNichol's portfolio website. Answer questions about her work, career, and experience.

TONE & STYLE:
- Concise, witty, zero fluff
- Bullet points, spaces, **bold**, emojis for scanning
- 2-5 sentences unless detail requested
- Respond as AriBot ("Ari led...", "She built...")
- Include relevant links when helpful

CRITICAL: NEVER mention years of experience, career length, or specific early dates.

CURRENT: Building Solutions at YesCraft.ai • AI Strategy Consultant • Techstars Mentor
EMAIL: arielmcnichol@gmail.com
LINKEDIN: linkedin.com/in/arielm

CVS HEALTH: UX Strategy Lead → Product Lead. Built proactive digital onboarding reaching patients BEFORE plan changes. Results: NPS +3, digital registrations +5%, call-ins -8%. Scale: 50K → 110M+ members. Value: $300M+ annual cost avoidance.
More: arielmcnichol.com/portfolio/item/pilots/

MOTISPARK (Co-founder with Kyle Brinkman): AI-powered personalized video nudge platform. 94% engagement, 3x provider revenues. Patent: US20170193851A1.
More: arielmcnichol.com/portfolio/item/motispark/

mEGO (Founder): Portable avatar platform. 12M+ users, $7M raised. Launched at TechCrunch40.

OTHER: PCCW/Now.com Global Creative Director, Lotus Interworks (2nd hire → 50+), clients include Apple, Disney, Yahoo, Wells Fargo.`

const ChatBot = () => {
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
          systemPrompt: CASE_STUDY_CONTEXT
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

  const suggestedQuestions = [
    "What did Ariel build at CVS?",
    "What results did MotiSpark get?",
    "Why hire Ariel?"
  ]

  const formatMessage = (text) => {
    const lines = text.split('\n')
    return lines.map((line, i) => {
      const parts = []
      let key = 0
      const regex = /(\*\*(.+?)\*\*)|(https?:\/\/[^\s]+)|((?:arielmcnichol\.com|linkedin\.com)[^\s]*)/g
      let match, lastIndex = 0
      while ((match = regex.exec(line)) !== null) {
        if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index))
        if (match[1]) {
          parts.push(<strong key={key++}>{match[2]}</strong>)
        } else if (match[3] || match[4]) {
          const url = match[3] || match[4]
          const href = url.startsWith('http') ? url : `https://${url}`
          parts.push(<a key={key++} href={href} target="_blank" rel="noopener noreferrer" style={{color:'#a5b4fc',textDecoration:'underline'}}>{url}</a>)
        }
        lastIndex = regex.lastIndex
      }
      if (lastIndex < line.length) parts.push(line.slice(lastIndex))
      return <span key={i}>{parts.length ? parts : line}{i < lines.length - 1 && <br/>}</span>
    })
  }

  return (
    <>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        * { box-sizing: border-box; }
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .chat-wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #0d0d14;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow: hidden;
          border-radius: 16px;
        }
        .chat-header {
          padding: 14px 16px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
          border-radius: 16px 16px 0 0;
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.1) transparent;
        }
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        .chat-input-area {
          padding: 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          gap: 8px;
          flex-shrink: 0;
          background: #0d0d14;
        }
        .chat-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 14px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #fff;
          resize: none;
          outline: none;
        }
        .chat-input::placeholder {
          color: rgba(255,255,255,0.35);
        }
        .suggestion-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 6px 12px;
          font-size: 12px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: rgba(255,255,255,0.7);
          cursor: pointer;
        }
        .suggestion-btn:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
        }
      `}</style>

      <div className="chat-wrapper">
        <div className="chat-header">
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0
          }}>
            <img 
              src="https://arielmcnichol.com/wp-content/uploads/2023/12/543323be-3f05-4756-84d1-19fdba83b9b5-749x749.webp" 
              alt="Ariel"
              style={{width:'100%',height:'100%',objectFit:'cover'}}
            />
          </div>
          <div>
            <div style={{fontSize:'15px',fontWeight:600,color:'#fff'}}>AriBot</div>
            <div style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',marginTop:'1px'}}>Ask about Ariel's work</div>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} style={{
              maxWidth: '85%',
              padding: '10px 14px',
              borderRadius: '14px',
              fontSize: '14px',
              lineHeight: 1.5,
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              background: msg.role === 'user' 
                ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                : 'rgba(255,255,255,0.06)',
              color: msg.role === 'user' ? '#fff' : 'rgba(255,255,255,0.9)'
            }}>
              {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
            </div>
          ))}
          {isLoading && (
            <div style={{
              alignSelf: 'flex-start',
              background: 'rgba(255,255,255,0.06)',
              padding: '10px 14px',
              borderRadius: '14px',
              display: 'flex',
              gap: '4px'
            }}>
              <span style={{width:5,height:5,background:'rgba(255,255,255,0.5)',borderRadius:'50%',animation:'pulse 1.4s infinite'}}/>
              <span style={{width:5,height:5,background:'rgba(255,255,255,0.5)',borderRadius:'50%',animation:'pulse 1.4s infinite 0.2s'}}/>
              <span style={{width:5,height:5,background:'rgba(255,255,255,0.5)',borderRadius:'50%',animation:'pulse 1.4s infinite 0.4s'}}/>
            </div>
          )}
          <div ref={messagesEndRef}/>
        </div>

        {messages.length === 1 && (
          <div style={{display:'flex',flexWrap:'wrap',gap:'6px',padding:'0 12px 10px'}}>
            {suggestedQuestions.map((q, i) => (
              <button 
                key={i} 
                className="suggestion-btn"
                onClick={() => {setInput(q); setTimeout(sendMessage, 100)}}
              >
                {q}
              </button>
            ))}
          </d
