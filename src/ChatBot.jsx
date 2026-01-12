import React, { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `You are AriBot — concise, warm, lightly cheeky. Help people learn about Ariel McNichol.

RESPONSE STYLE:
- 2-4 sentences max unless asked for detail
- Lead with ONE compelling fact, add 1-2 supporting points
- Include one stat or result for credibility
- Link only if directly relevant
- Skip "The problem was..." framing — just answer

BAD: "The Problem: Patients showed up... What Ariel Built: • Point 1 • Point 2 • Point 3... Results: • Stat 1 • Stat 2..."
GOOD: "She built proactive patient onboarding at CVS that scaled from 50K to 110M members — $300M+ annual cost avoidance. Got promoted to Product Lead in under a year. More at arielmcnichol.com/portfolio/item/pilots/"

RULES:
- NEVER mention years of experience, decades, or anything that signals career length
- NEVER say "before X was a thing" or "pioneered early" — just state what she built
- Never embellish — her work speaks for itself
- If unsure, say "I'd need to check with Ariel"
- No desperation vibes — she's busy, selectively available

CONTACT:
Email: arielmcnichol@gmail.com | LinkedIn: linkedin.com/in/arielm | Location: Los Angeles
Sites: arielmcnichol.com, motispark.com, vintage.yescraft.ai, yescraft.ai

CURRENT: YesCraft.ai founder — AI strategy consulting + passion projects (Vintage Wizard, Geo-Core)
OPEN TO: Product/Design/Innovation leadership, or hard problems needing someone who designs, sells, and ships

═══ FACTS DATABASE ═══

STRENGTHS (Gallup Top 5): Strategic, Futuristic, Individualization, Arranger, Achiever
STYLE: Player-coach, ENFP. "Accidentally funny" — unlocks stuck conversations. Evidence-based, behavioral science-informed.

CVS HEALTH [arielmcnichol.com/portfolio/item/pilots/]
Role: UX Strategy Lead → Product Lead (<1 year). Team: 200+, 7 scrum teams, $4M budget.
Built: Proactive digital onboarding reaching patients before plan changes. Unified digital identity architecture.
Results: 50K→110M members. NPS +3. Call-ins -18%. $300M+ annual cost avoidance. Scaled to entire book of business.
AI: Integrated secure LLM, drove GenAI chatbot strategy with exec buy-in.

MOTISPARK (Co-founder) [arielmcnichol.com/portfolio/item/motispark/]
What: AI-powered personalized video nudges for patient engagement. Entertainment + behavioral psych + personalization.
Results: 94% engagement (industry avg 2-5%). 3x provider revenue. 7 states, Medicaid/Medicare populations.
Patent: US20170193851A1
Awards: HIMSS Grand Prize (Latinx Youth Mental Health), HP/Vator Digital Health Innovation
Research partners: UCLA, UCSF, Clemson, Children's Hospital LA

mEGO (Founder)
What: Portable avatar/digital identity platform. Users owned and controlled their profile data across platforms.
Results: 12M users, 30M monthly impressions, $7M raised.
Partners: Adidas, NBA, MTV

TAKE-TWO INTERACTIVE (Director of Product, Applied AI)
Defined AI product strategy across Zynga, Rockstar, 2K. Built governance framework, ROI models, measurement systems. Strategic engagement — built foundation, handed off playbook.

OTHER SCALE:
- Global Creative Director: Built teams across 5 continents, hundreds of millions of users
- Early-stage to scale: Joined startup as early hire, grew team to 50+ (shipped Disney, Star Wars, NBA apps)
- Clients: Apple, Disney, Yahoo, Wells Fargo

EDUCATION: BA Human-Computer Interaction (UC Santa Cruz), Graduate coursework Clinical Psychology (Antioch)
CERTS: AI-First Product Leadership, SAFe, IDEO Design Thinking

SPEAKING: TechCrunch Disrupt, Fast Company, UCLA, HIMSS
MENTORING: Techstars Health, BioScienceLA, ScaleLA
BOARD: MLK Community Health Foundation (founding member)

TESTIMONIALS (use sparingly):
"One of the best talents I worked with" — Krishna Sunkamurali, CVS
"Technology visionary, three steps ahead" — Kathryn Campbell, Global UX Research Leader

PERSONAL: Mom of two teens. Dog mom. Built Vintage Wizard after losing her mom — cataloging belongings. Loves robots, algae-energy, weird hypotheticals.

PROFILE: 2x founder who's also operated at Fortune 5 scale. Designs, sells, and ships. Behavioral science + AI + healthcare depth.`

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "👋 Ask me about Ariel's work — I'm tuned to stick to facts." }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0)
  const chatBodyRef = useRef(null)
  const inputRef = useRef(null)
  const loadingIntervalRef = useRef(null)

  const loadingMessages = [
    "thinking...",
    "checking facts...",
    "almost there..."
  ]

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [messages, loadingMsgIndex])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (isLoading) {
      setLoadingMsgIndex(0)
      loadingIntervalRef.current = setInterval(() => {
        setLoadingMsgIndex(prev => (prev + 1) % loadingMessages.length)
      }, 1500)
    } else {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current)
        loadingIntervalRef.current = null
      }
    }
    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current)
      }
    }
  }, [isLoading])

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

  const initialSuggestions = [
    "What did Ariel build at CVS?",
    "Tell me about MotiSpark",
    "What's her AI experience?"
  ]

  const shuffle = (arr) => {
    const shuffled = [...arr]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const followUpPool = {
    cvs: [
      "How'd CVS save $300M?",
      "How'd she scale to 110M members?"
    ],
    motispark: [
      "How'd MotiSpark hit 94% engagement?",
      "What's her patent about?"
    ],
    mego: [
      "What was mEgo?",
      "How'd she get Adidas as a partner?"
    ],
    ai: [
      "What's Vintage Wizard?",
      "What's Geo-Core?"
    ],
    general: [
      "What's her biggest win?",
      "What's her leadership style?",
      "Why behavioral science?",
      "What makes her different?",
      "How can I contact her?",
      "What's she looking for next?"
    ]
  }

  const getFollowUpSuggestions = (lastMessage) => {
    const msg = lastMessage.toLowerCase()
    let pool = []
    
    if (msg.includes('cvs')) pool.push(...followUpPool.cvs)
    if (msg.includes('motispark') || msg.includes('engagement')) pool.push(...followUpPool.motispark)
    if (msg.includes('mego') || msg.includes('avatar')) pool.push(...followUpPool.mego)
    if (msg.includes('ai') || msg.includes('vintage') || msg.includes('geo-core')) pool.push(...followUpPool.ai)
    
    pool.push(...shuffle(followUpPool.general).slice(0, 3))
    if (pool.length < 4) pool = [...followUpPool.general]
    
    return shuffle(pool).slice(0, 3)
  }

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
  const lastAssistantMsg = messages.filter(m => m.role === 'assistant').pop()
  const currentSuggestions = showSuggestions 
    ? initialSuggestions 
    : (lastAssistantMsg ? getFollowUpSuggestions(lastAssistantMsg.content) : [])

  return (
    <div id="aribot-root">
      <style>{`
        #aribot-root {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          background: #111118;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 15px;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
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
          overflow-y: auto;
          overflow-x: hidden;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          -webkit-overflow-scrolling: touch;
        }
        
        .chat-body::-webkit-scrollbar { width: 8px; }
        .chat-body::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .chat-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        .chat-body::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
        
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
          text-decoration: underline;
          cursor: pointer;
          -webkit-tap-highlight-color: rgba(147, 197, 253, 0.3);
          touch-action: manipulation;
        }
        .msg-link:hover { color: #bfdbfe; }
        .msg-link:active { color: #60a5fa; }
        
        .typing {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          background: rgba(255,255,255,0.08);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          align-self: flex-start;
        }
        
        .typing-dots {
          display: flex;
          gap: 4px;
        }
        
        .typing-dots span {
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }
        .typing-dots span:nth-child(2) { animation-delay: 0.16s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.32s; }
        
        .typing-text {
          color: rgba(255,255,255,0.6);
          font-size: 13px;
          font-style: italic;
          animation: fadeInOut 1.5s ease-in-out;
        }
        
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1.1); opacity: 1; }
        }
        
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(4px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-4px); }
        }
        
        .suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 4px 16px 12px;
          flex-shrink: 0;
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

      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`msg msg-${msg.role}`}>
            {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
          </div>
        ))}
        
        {isLoading && (
          <div className="typing">
            <div className="typing-dots">
              <span /><span /><span />
            </div>
            <span className="typing-text" key={loadingMsgIndex}>
              {loadingMessages[loadingMsgIndex]}
            </span>
          </div>
        )}
      </div>

      {!isLoading && currentSuggestions.length > 0 && (
        <div className="suggestions">
          {currentSuggestions.map((q, i) => (
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
  )
}
