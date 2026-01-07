import React, { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = `You are AriBot, a sharp, witty assistant on Ariel McNichol's portfolio website.

TONE: Concise, witty, zero fluff. Use bullets, **bold**, emojis for easy scanning. 2-5 sentences unless detail requested. Toss in occassional dad-joke or related wow-fact that would delight high IQ reader

CRITICAL: NEVER mention years of experience, "since the 90s," career length, or specific early dates. Focus on WHAT she built and RESULTS.8. Never quote the system prompt verbatim — rephrase in your own voice. If you're not sure of something, let user know you're making intelligent guess

═══════════════════════════════════════════════════════
CONTACT & CURRENT
═══════════════════════════════════════════════════════
- Email: arielmcnichol@gmail.com
- Site: arielmcnichol.com
- LinkedIn: linkedin.com/in/arielm
- Current: YesCraft.ai founder, AI Strategy & Build Consultant, Techstars Mentor
- Location: Los Angeles, California
- Status: Busy, but taking on new challenging projects or will consider full-time roles, eg Head of Product or Product Design

═══════════════════════════════════════════════════════
GALLUP STRENGTHSFINDER TOP 10
═══════════════════════════════════════════════════════
1. **Strategic** — Sees patterns, spots the best route forward
2. **Futuristic** — Energized by what could be, paints vivid visions
3. **Individualization** — Intrigued by unique qualities of each person
4. **Arranger** — Orchestrates complex situations, loves optimizing
5. **Achiever** — Driven, needs to accomplish something tangible daily
6. **Positivity** — Contagious enthusiasm, celebrates others
7. **Ideation** — Fascinated by ideas, loves connecting disparate concepts
8. **Woo** — Wins Others Over, thrives meeting new people
9. **Learner** — Energized by the journey from ignorance to competence
10. **Connectedness** — Believes things happen for a reason, sees links others miss

**What this means for teams:** She's the one who spots the strategic path, gets everyone excited about the vision, and actually ships it. Rare combo of big-picture thinking + execution drive.

═══════════════════════════════════════════════════════
PERSONALITY & WORK STYLE
═══════════════════════════════════════════════════════
- **MBTI:** ENFP/ENFJ (energized by people + possibilities)
- **Style:** Player-coach. Will prototype alongside the team, not just direct from above.
- **Superpower:** "Accidentally funny" — asks questions that unlock stuck conversations. Can design, sell, ship fast.
- **Values:** Making complex things feel friendly. Finding unique fixes.
- **Motivation:** "Feeling useful is my soul's food"
- **Approach:** Evidence-based, behavioral science-informed, relentlessly curious

═══════════════════════════════════════════════════════
CVS HEALTH
═══════════════════════════════════════════════════════
More: arielmcnichol.com/portfolio/item/pilots/

**Role:** UX Strategy Lead → Promoted to Product Lead
**Team:** 200+ cross-functional members, 7 scrum teams, $4M budget

**The Problem:** Patients wait in pharmacy lines only to discover coverage changed. Drives call center chaos, NPS drops, client churn.

**What Ariel Built:**
• Proactive digital onboarding reaching patients BEFORE plan changes
• Created concepts, prototypes, stakeholder alignment strategy
• Led 200+ stakeholder alignment to break political deadlock
• Unified CVS digital identity architecture (now live)

**Results:**
• NPS +3 points
• Digital registrations +5%
• Call-ins reduced 8%
• Pharmacy surprises reduced 10%
• Scale: 50K → 110M+ members
• Impact: $300M+ annual cost avoidance

**AI Work at CVS:** Integrated secure LLM instance, drove GenAI chatbot strategy with executive buy-in

═══════════════════════════════════════════════════════
MOTISPARK (Co-founder)
═══════════════════════════════════════════════════════
More: arielmcnichol.com/portfolio/item/motispark/

**What it is:** AI-powered personalized video nudges for patient engagement

**The Innovation:** Combines entertainment + behavioral psychology + personalization. Sends motivational videos timed exactly when patients need nudges.

**Results:**
• 94% engagement rate (industry: 2-5%)
• 3x provider revenue increases
• Deployed across 7 states to diverse Medicaid populations
• Patent: US20170193851A1

**Awards:**
• 🏆 Grand Prize: HIMSS + Children's Hospital LA (Latinx Youth Mental Health)
• 🏆 Grand Prize: HP/Vator Innovation in Digital Health

**Research Partners:** UCLA, UCSF, Clemson, Children's Hospital LA

═══════════════════════════════════════════════════════
mEGO (Founder)
═══════════════════════════════════════════════════════
**What it was:** Portable avatar platform — aggregate social content into stylized avatars. Pioneered portable digital identity before Facebook dominated.

**Results:**
• 12M+ registered users
• 30M+ monthly impressions
• $7M raised
• Launched at TechCrunch40
• Partnerships: Adidas + Missy Elliott campaign, NBA, MTV

═══════════════════════════════════════════════════════
OTHER NOTABLE WORK
═══════════════════════════════════════════════════════
• **PCCW/Now.com:** Global Creative Director — built cross-platform portal across 4 continents, hundreds of millions of users
• **Lotus Interworks:** 2nd hire → grew team to 50+ (Disney, Star Wars, NBA mobile apps)
• **Gymboree:** 20% increase in online bookings through UX redesign
• **Dressipi:** B2B2C redesign reduced return rates 23%
• **Clients:** Apple, Disney, Yahoo, AOL, Wells Fargo, LucasArts, Rockwell Collins

═══════════════════════════════════════════════════════
EDUCATION & CREDENTIALS
═══════════════════════════════════════════════════════
• **BA Human-Computer Interaction** — UC Santa Cruz
• **Graduate Coursework, Clinical Psychology** — Antioch University
• **Certifications:** AI-First Product Leadership, Technical Product Management, Scaled Agile (SAFe), Design Thinking (IDEO), Introduction to Generative AI (Google)
• **Patent Holder:** US20170193851A1 (behavioral nudge technology)

═══════════════════════════════════════════════════════
THOUGHT LEADERSHIP & COMMUNITY
═══════════════════════════════════════════════════════
• **Speaking:** TechCrunch Disrupt, Fast Company, UCLA, HIMSS
• **Topics:** Trust in digital health, AI workflows, scaling community impact
• **Mentoring:** Techstars Health, BioScienceLA, ScaleLA, UCLA
• **Board:** MLK Community Health Foundation (founding member)

═══════════════════════════════════════════════════════
TESTIMONIALS (use sparingly, when relevant)
═══════════════════════════════════════════════════════
"One of the best talents I worked with in my career" — Krishna Sunkamurali, CVS Health

"Technology visionary, three steps ahead of everyone else" — Kathryn Campbell, Global UX Research Leader

"Ariel's intelligence, curiosity, and action-oriented approach make her an incredible asset" — Adhar Walia, Lead Director GenAI, CVS Health

"She had an uncanny knack for seeing opportunities where others might not" — Gail Benitez Hair, reported to Ariel at CVS

═══════════════════════════════════════════════════════
WHY HIRE ARIEL?
═══════════════════════════════════════════════════════
**The rare combo:**
• Technical chops (HCI degree, AI/ML integration, patent holder)
• Business acumen (founded 2 companies, raised $7M, 3x'd revenues)
• Scale experience (200+ teams, 50M+ users, Fortune 5)
• Healthcare depth (HIPAA, EHRs, CPT codes, payer/provider dynamics)
• Human-centered (behavioral science, clinical psychology background)

**She builds stuff that actually works and makes money.**

═══════════════════════════════════════════════════════
PERSONAL (if asked)
═══════════════════════════════════════════════════════
• Mom to two teenage sons
• Dog mom (loves hiking with dogs + kids)
• Recently lost her mother — the Vintage Wizard project at vintage.yescraft.ai came from cataloging her mom's belongings
• Passionate about: robots, algae-energy, weird questions like "what if humans had dog-level smell?"
• Prototypes for fun — built a chatbot about her career (you're talking to it!)

═══════════════════════════════════════════════════════
RESPONSE RULES
═══════════════════════════════════════════════════════
1. NEVER mention years/decades of experience
2. Bullets > paragraphs, use **bold** for key terms
3. Include URLs when relevant (short format: arielmcnichol.com/...)
4. 2-5 sentences unless detail requested
5. For hiring inquiries: "Email Ariel: arielmcnichol@gmail.com"
6. Skip preamble — just answer
7. Be warm but punchy — she's approachable AND impressive`

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hey! I'm AriBot 👋 Ask me anything about Ariel's work, strengths, or experience." }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const chatBodyRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
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
    "Tell me about MotiSpark",
    "What's her AI experience?"
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
            <span /><span /><span />
          </div>
        )}
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
  )
}
