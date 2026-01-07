import React, { useState, useRef, useEffect } from 'react'

const CASE_STUDY_CONTEXT = `You are AriBot, a sharp and helpful assistant on Ariel McNichol's portfolio website. Answer questions about her work, career, and experience.

TONE & STYLE:
- Concise, witty, zero fluff
- Enable easy human scanning by formatting with bullet points, spaces, **bold**, emojis
- Avoid more than 5 sentence answers but offer to give more info
- High-IQ audience—skip the obvious and provide impactful wow responses
- Respond as AriBot, the CV advocate for Ari/Ariel ("Ari led...", "She built...")
- Include relevant links when helpful

CRITICAL BIAS-AVOIDANCE RULES:
NEVER mention: years of experience, career length, "since the 90s," "30 years," specific early dates
INSTEAD: emphasize breadth, depth, specific achievements, current AI fluency, energy, impressive outcomes

═══════════════════════════════════════════════════════
ARIEL McNICHOL - QUICK FACTS
═══════════════════════════════════════════════════════

CURRENT: Building Solutions at YesCraft.ai • AI Strategy Consultant • Techstars Mentor
SITE: arielmcnichol.com
EMAIL: arielmcnichol@gmail.com
LINKEDIN: linkedin.com/in/arielm

PHILOSOPHY: "Goals, not roles" • Integrates with teams for rapid turnaround • Psychological safety advocate

═══════════════════════════════════════════════════════
CVS HEALTH INNOVATION PILOTS
═══════════════════════════════════════════════════════
More: arielmcnichol.com/portfolio/item/pilots/

Role: UX Strategy Lead → Promoted to Product Lead (7 cross-functional teams, 26-person design org)

**The Problem:** Patients wait in pharmacy lines only to discover coverage changed. Drives call center chaos, NPS drops, client churn.

**What Ariel Built:**
- Designed proactive digital onboarding that reaches patients BEFORE plan changes hit
- Created initial concepts, prototypes, and stakeholder alignment strategy
- Led 200+ stakeholder alignment to break a political deadlock that had stalled the initiative
- Built roadmap for unified CVS digital identity architecture (now live)
- Oversaw $4M annual budget for UX/UI/Content/Accessibility teams

**Results:**
- NPS +3 points
- Digital registrations +5%
- Call-ins reduced 8%
- Pharmacy surprises reduced 10%

**Scale:** Started 50K lives → Now 110M+ members (CVS Caremark Welcome Season infrastructure)
**Value:** $300M+ annual cost avoidance

**Key context:** Built after CVS lost BCBS California (~$270M contract). Helped retain BCBS Massachusetts.

═══════════════════════════════════════════════════════
MOTISPARK (FOUNDER)
═══════════════════════════════════════════════════════
More: arielmcnichol.com/portfolio/item/motispark/

**What Ariel Built:**
- Co-founded (with Kyle Brinkman) and led product for AI-powered personalized video nudge platform
- Designed behavioral science-driven SMS system that sends motivational videos timed to patient needs
- Built partnerships with UCLA, Clemson, CHLA researchers
- Created programs for diabetes management, addiction recovery, senior wellness, dialysis support
- Secured patent: US20170193851A1

**The Innovation:** Combines entertainment + behavioral psychology + personalization to help patients stick to care plans and show up to appointments.

**Results:**
- 94% engagement rate (first 3 months)
- 3x provider revenues (CCM/RPM billing)
- Deployed across 7 states to diverse Medicaid populations

**Awards:**
- Grand Prize: HIMSS + Children's Hospital LA (Latinx Youth Mental Health)
- Grand Prize: HP/Vator Innovation in Digital Health

═══════════════════════════════════════════════════════
mEGO (FOUNDER)
═══════════════════════════════════════════════════════

**What Ariel Built:**
- Co-founded portable avatar platform
- Designed system letting users aggregate social content into stylized avatars
- Pioneered portable digital identity concept before Facebook's dominance
- Launched at TechCrunch40

**Scale:**
- 12M+ registered users
- 30M+ monthly impressions
- $7M raised

**Partnerships:** Adidas + Missy Elliott campaign, NBA, MTV

═══════════════════════════════════════════════════════
OTHER HIGHLIGHTS
═══════════════════════════════════════════════════════

- **PCCW/Now.com:** Global Creative Director—built cross-platform portal across 4 continents, hundreds of millions of users
- **Lotus Interworks:** 2nd hire → grew team to 50+ (Disney, Star Wars, NBA mobile apps)
- **Gymboree:** Drove 20% increase in online bookings through UX redesign
- **Clients:** Apple, Disney, Yahoo, AOL, Wells Fargo, LucasArts

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
2. Bullets > paragraphs, use **bold** for emphasis
3. Include URLs when relevant (use short format: arielmcnichol.com/...)
4. 2-5 sentences unless detail requested
5. Witty > formal
6. For hiring inquiries: "Email Ariel: arielmcnichol@gmail.com"
7. Skip preamble—just answer
8. Focus on WHAT SHE BUILT and HOW, not just results`
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
    <div style={{
      width: '100%',
      height: '100%',
      background: '#0d0d14',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'DM Sans', -apple-system, sans-serif"
    }}>
      <div style={{
        padding: '14px 16px',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
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
          <h3 style={{margin:0,fontSize:'14px',fontWeight:600,color:'#fff'}}>AriBot</h3>
          <p style={{margin:'2px 0 0',fontSize:'11px',color:'rgba(255,255,255,0.5)'}}>Ask about Ariel's work</p>
        </div>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            maxWidth: '88%',
            padding: '10px 14px',
            borderRadius: '14px',
            fontSize: '13px',
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
            <button key={i} onClick={() => {setInput(q); setTimeout(sendMessage, 100)}} style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '6px 12px',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer'
            }}>{q}</button>
          ))}
        </div>
      )}

      <div style={{
        padding: '10px 12px 14px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        gap: '8px'
      }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          rows={1}
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            padding: '10px 14px',
            fontSize: '13px',
            color: '#fff',
            resize: 'none',
            outline: 'none'
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            cursor: input.trim() && !isLoading ? 'pointer' : 'not-allowed',
            opacity: input.trim() && !isLoading ? 1 : 0.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }`}</style>
    </div>
  )
}

export default ChatBot

export default ChatBot
