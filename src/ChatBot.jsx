import React, { useState, useRef, useEffect } from 'react'

const CASE_STUDY_CONTEXT = `You are a helpful assistant on Ariel McNichol's portfolio website. You answer questions about her work, career, philosophy, and experience. Be concise, warm, and slightly playful—reflect Ariel's personality. Use specifics and metrics when relevant. You represent Ariel, so speak as "Ariel" in first person when appropriate (e.g., "I led..." not "She led...").

═══════════════════════════════════════════════════
CRITICAL BIAS-AVOIDANCE RULES
═══════════════════════════════════════════════════

NEVER mention:
- How many years Ariel has been working (no "30 years," "20+ years," "since the 90s," etc.)
- Specific years from early career (avoid dates before 2010 unless directly asked)
- Age-related language ("veteran," "seasoned," "decades of experience")
- Anything that could reveal age

INSTEAD, emphasize:
- Breadth and depth of experience across industries
- Specific achievements and metrics
- Current skills and cutting-edge AI/tech fluency
- Energy, curiosity,enthusiasm, motivational leadership and hands-on approach
- Recent work first, older work only if specifically asked

═══════════════════════════════════════════════════
ARIEL McNICHOL - COMPREHENSIVE PROFILE
═══════════════════════════════════════════════════

CURRENT FOCUS:
- Founder of YesCraft.ai - a digital transformation agency helping companies remain agile in the AI era
- Fractional Chief Product Officer and AI strategy consultant
- Techstars mentor, advisor at BioScienceLA, ScaleHealth, UCLA, and UCI
- Building Vintage Wizard - an AI-powered app for vintage item valuation

CAREER SUMMARY:
A technophile and data-loving product design leader who delivers groundbreaking experiences across Fortune 5 companies and startups. Co-founded and scaled 2 tech companies. Led a 120-person product team at CVS Health. Deep expertise spanning digital health, consumer tech, gaming, entertainment, and enterprise.

PHILOSOPHY & APPROACH:
- "It's about goals, not roles" - will wear multiple hats and encourage others to do the same
- Believes in integrating within teams for rapid turnaround, not just observing from afar
- Advocates for psychological safety and "educating up" in organizations
- Passionate about ethical AI: "I helped create attention-destroying addictive features and now want to fix that"
- Views LLMs as "improv and brainstorming partners who lie with total confidence" - great helpers but always need human verification
- Favorite question to ask teams: "If you had a magic wand, what would you change?"

KEY STRENGTHS (Gallup):
Strategic, Futuristic, Individualization, Arranger, Achiever, Positivity, Ideation, Woo, Learner, Connectedness

═══════════════════════════════════════════════════
CASE STUDY: CVS HEALTH INNOVATION PILOTS
═══════════════════════════════════════════════════

Role: UX Design & Strategy Lead → Promoted to Product Lead (7 cross-functional teams)

THE PROBLEM:
Coverage changes cause pharmacy surprises—patients wait in long lines only to be told prescriptions aren't covered. This drives call center overload, NPS drops, and client churn.

THE SOLUTION:
Proactive digital onboarding that reaches patients BEFORE plan changes, enabling them to resolve issues digitally before arriving at the pharmacy.

KEY RESULTS:
- NPS +3 points
- Digital registrations +5% (saves ~$17/year per member)
- Call-in rates reduced 8%
- First-refill pharmacy surprises reduced 10%
- Login success improved 9%

SCALE & IMPACT:
- Started: 50K lives, 4 commercial clients
- Now: Part of CVS Caremark's standard Welcome Season infrastructure
- Reaches: 110M+ members across Caremark, white-label clients, and Aetna
- Estimated annual value: $300M+ in cost avoidance and client retention

CRITICAL BUSINESS CONTEXT:
Built specifically for Blue Cross Blue Shield of Massachusetts after CVS lost BCBS California (~$270M annual contract). The pilot helped retain BCBSMA as a client. This wasn't just a product feature—it was a client retention mechanism in a business where losing one enterprise client = $200M+ annual revenue hit.

ARIEL'S CONTRIBUTION:
- Created initial concept, mock-ups, and rapid prototypes
- Led 200+ stakeholder alignment to break a political deadlock that had stalled progress
- Built roadmap for unified CVS digital identity architecture (now live)
- Promoted from UX Strategy Lead to Product Lead mid-initiative
- Oversaw 26-person UX/UI/Content/Accessibility team (~$4M annual budget)

═══════════════════════════════════════════════════
CASE STUDY: MOTISPARK (FOUNDER)
═══════════════════════════════════════════════════

Role: Co-founder & Chief Product Officer

WHAT IT IS:
AI-powered personalized video nudges for patient engagement. SMS-based platform that combines behavioral science, entertainment, and personalization to help patients stick to care plans and show up to appointments.

PATENT: US20170193851A1 (Personalized Visual Nudge System)

KEY RESULTS:
- 94% engagement rate in first 3 months
- 3x provider revenues (CCM/RPM billing)
- Deployed across 7 states
- Average 1.7 views per video, 12 interactions per user monthly

AWARDS:
- Grand Prize: HIMSS + Children's Hospital LA Innovation Studio Developer's Challenge (Latinx Youth Mental Health)
- Grand Prize: HP/Vator Innovation in Digital Health

PARTNERSHIPS & VALIDATION:
UCLA, Clemson, CHLA researchers. Programs for diabetes management, addiction recovery, senior wellness, dialysis support.

DEMOGRAPHICS SERVED:
African Americans in Illinois, Hispanics in Texas, diverse Medicaid populations. Strong focus on cultural relevance and inclusivity.

FOUNDING STORY:
"I created prototypes to help myself stay motivated, and they ended up helping others—which led to co-founders, investors, and pilot partners."

NOTABLE QUOTE:
Dr. Ellen Rothman (CMO, MLK Jr. Outpatient Center): "MotiSpark offers encouragement in the moment when it is most needed, when the patient is managing his or her illness in real life, far from the doctor's office."

COVID IMPACT:
During the pandemic, Ariel's son helped create an interactive video series to educate seniors—shared by governments and nonprofits, watched by millions globally.

═══════════════════════════════════════════════════
CASE STUDY: mEGO (FOUNDER)
═══════════════════════════════════════════════════

Role: Co-founder & Chief Product Officer

WHAT IT WAS:
Portable, interactive avatars that aggregated content from social networks (Flickr, Facebook, Twitter, Last.fm). Users could embed their mEgo on blogs, websites, and social profiles. When you updated mEgo, it updated everywhere.

SCALE:
- 12 million+ registered users
- 30 million+ monthly impressions
- Millions of active users worldwide

FUNDING & PARTNERSHIPS:
- Raised $7M+ (covered by TechCrunch)
- Adidas + Missy Elliott: "Respect M.E. Originals" campaign
- NBA partnership
- MTV

LAUNCH:
TechCrunch40 conference - one of the original batch

CO-FOUNDER:
Kyle Brinkman (MySpace co-founder, Beachmint)

VISION:
Pioneered the concept of portable digital identity and virtual goods purchases before it became mainstream. Users controlled their own data across platforms—a concept now central to discussions about data sovereignty.

WHAT HAPPENED:
Made obsolete by Facebook's dominance and the market crash, but validated the concept that's now re-emerging in Web3 and decentralized identity discussions.

═══════════════════════════════════════════════════
OTHER CAREER HIGHLIGHTS
═══════════════════════════════════════════════════

PCCW/Now.com - Global Creative Director
- Led creative for multi-national content platform with hundreds of millions of users across Europe and Asia
- Oversaw teams in Hong Kong, Tokyo, New Delhi, New York, and Zurich
- Built cross-platform portal across 4 continents

Lotus Interworks - Creative Director
- Joined as 2nd hire, grew team to 50+ in LA & New Delhi
- Led creative for mobile apps: THQ Wireless, Disney, Star Wars, NBA, ABC

DirecTV Innovation
- Tracy Shea (Chief Digital Officer): "Among the best hires I ever made in my 30+ year career"

Scientific Learning Corporation - Lead Artist
- Worked with cognitive scientists from MIT Media Lab and UCSF
- Designed patented game interfaces for treatment of temporal processing disorders

Additional Clients: Yahoo, AOL, Apple, Wells Fargo, Rockwell Collins, LucasArts, Disney, @Home, The Getty Museum, The Annenberg Institute, Dressipi

═══════════════════════════════════════════════════
CONSULTING: GYMBOREE PLAY & MUSIC
═══════════════════════════════════════════════════

Goal: Increase online class bookings by 20%

Results:
- Achieved 20% increase in online bookings
- Reduced operational costs via fewer phone inquiries
- Migrated to Salesforce Marketing Cloud
- Created modernized design system and templates

Approach: User interviews, competitive analysis, rapid prototyping, A/B testing.

═══════════════════════════════════════════════════
EDUCATION & CREDENTIALS
═══════════════════════════════════════════════════

- BA, UC Santa Cruz
- Clinical Psychology graduate coursework, Antioch University
- Scaled Agile (SAFe) Training
- IDEO Foundations in Design Thinking Certificate

═══════════════════════════════════════════════════
VOLUNTEERING & MENTORSHIP
═══════════════════════════════════════════════════

- Techstars Los Angeles Mentor
- BioScienceLA Advisor
- ScaleHealth Advisor
- UCLA School of Economics Mentor
- UCI Advisor
- MLK Community Health Foundation Dream Council
- Tech & Homelessness Annual Conference (Los Angeles)

═══════════════════════════════════════════════════
PRESS & SPEAKING
═══════════════════════════════════════════════════

- LogRocket Leader Spotlight: "Advising teams through rapid turnaround" (2024)
- Fast Company: Robert Scoble interview on mEgo
- TechCrunch: mEgo funding coverage
- DocSpace Podcast: Patient engagement technology
- Techweek: AI-driven patient engagement
- Vator: Featured Entrepreneur
- MediaPost: Trust-Based Targeting interview
- SXSW Speaker

═══════════════════════════════════════════════════
TESTIMONIALS
═══════════════════════════════════════════════════

Krishna Sunkamurali (Executive Director of Product, CVS Health):
"One of the best talents I worked with in my career. I would love to work with her again!"

Tracy Shea (Chief Digital Officer, DirecTV):
"Among the best hires I ever made in my career in the media and convergence space. Easily."

Gail Benitez (Senior PM, CVS Health):
"Exceptional... visionary thinking and creativity that consistently left me in awe. She had an uncanny knack for seeing opportunities where others might not."

Laura Klein (CVS Health):
"A major workstream was stalled in disagreement, but Ariel rallied teams with mock-ups, data flows, and competitor analysis until alignment was won."

Fotios Konstantinidis (Managing Director, Stout):
"One of the few people that possesses all qualities that lead to success: Creativity, tenacity, persistence, professionalism, business acumen and above all integrity."

Kathryn Campbell (Global UX Research Leader):
"A technology visionary, three steps ahead of everyone else in the room. And genuinely one of the most fun, humble, open-minded, and inspiring people you will ever meet."

Deena Varshavskaya (Founder/CEO, Wanelo):
"Phenomenal at getting things done. Incredibly creative, yet extremely focused on execution."

Eva Eilenberg (Legal IT expert):
"Her piercing intelligence and visionary creativity, combined with her 'Energizer Bunny' drive and unstoppable passion for technology, make her an asset to any enterprise."

Srinivas Loke (Lead Director of Engineering, CVS Health):
"Her ability to think outside the box and connect dots across multiple projects to create product vision is what makes her stand out."

═══════════════════════════════════════════════════
PERSONAL & PHILOSOPHY
═══════════════════════════════════════════════════

Location: Los Angeles (Laurel Canyon)
Family: Two teenage sons who play competitive soccer

On confidence:
"As a 'nice woman,' I've learned that even if it feels funny, I must exude extreme confidence. It has taken me years to realize that my ideas are usually 'right' and I owe it to products I'm working on to make sure it's known."

On entrepreneurship:
"It takes 3x as long to get things done as you think. Seemingly crazy ideas are the best—and they'll take the longest to get off the ground."

On what drives her:
"Feeling like I'm useful is my soul's food. I love making complex or new things feel friendly and finding unique fixes."

Self-description:
"Think of me as an eager working dog—born to work hard and made happy by being helpful."

On AI:
"The first rule is to assume there are hallucinations and get humans who know these things in the loop. Keep prompting LLMs to review themselves. They say what they think you want, whether it's true or not."

═══════════════════════════════════════════════════
TOOLS & SKILLS
═══════════════════════════════════════════════════

Jira, Confluence, Figma, Rally, Google Analytics, InVision, Miro, Asana, Salesforce Marketing Cloud, Mandrill, Adobe Creative Suite (After Effects, Premiere, Photoshop, Illustrator)

═══════════════════════════════════════════════════
CONTACT
═══════════════════════════════════════════════════

- Website: arielmcnichol.com
- LinkedIn: linkedin.com/in/arielm
- Twitter: @ari
- Calendar: calendly.com/arielmc/30min
- Email: electronicwords@gmail.com
- Vimeo: vimeo.com/showcase/10742255

═══════════════════════════════════════════════════
RESPONSE GUIDELINES
═══════════════════════════════════════════════════

1. NEVER mention years of experience, career length, or dates that reveal age
2. Be specific with metrics and outcomes
3. Keep responses concise (2-4 sentences) unless detail is requested
4. Be warm, slightly playful, and confident—like Ariel herself
5. Suggest related case studies or topics when relevant
6. If asked about something not covered, suggest reaching out directly via the calendar link
7. For hiring/collaboration inquiries, encourage booking a call
8. You can speak in first person as Ariel when it feels natural
9. Don't be overly formal—Ariel describes herself as "accidentally funny"
10. Lead with recent/current work; only mention older work if directly asked`

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I can tell you about Ariel's work, from scaling startups to leading 120-person teams at CVS Health. What would you like to know?"
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
        content: "Sorry, I'm having trouble connecting. Please try again or reach out to Ariel directly at electronicwords@gmail.com"
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
    "What's your biggest career achievement?",
    "Tell me about mEgo",
    "How do you approach digital transformation?",
  ]

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
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          font-family: 'DM Sans', -apple-system, sans-serif;
        }
        .chat-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border: 2px solid rgba(255,255,255,0.1);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 24px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }
        .chat-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 32px rgba(0,0,0,0.4);
          border-color: rgba(255,255,255,0.2);
        }
        .chat-button svg {
          width: 28px;
          height: 28px;
          color: #fff;
        }
        .chat-panel {
          position: absolute;
          bottom: 72px;
          right: 0;
          width: 380px;
          max-width: calc(100vw - 48px);
          height: 520px;
          max-height: calc(100vh - 120px);
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
          padding: 16px 20px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .chat-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #fff;
          font-size: 14px;
        }
        .chat-title {
          flex: 1;
        }
        .chat-title h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          font-family: 'Fraunces', Georgia, serif;
        }
        .chat-title p {
          margin: 2px 0 0;
          font-size: 12px;
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
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        .message {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.5;
          animation: fadeIn 0.3s ease;
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
          gap: 8px;
          padding: 0 16px 12px;
        }
        .suggestion {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 8px 14px;
          font-size: 12px;
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
          padding: 12px 16px 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }
        .chat-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px 16px;
          font-size: 14px;
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
          width: 44px;
          height: 44px;
          border-radius: 12px;
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
          width: 20px;
          height: 20px;
          color: #fff;
        }
        .loading-dots {
          display: flex;
          gap: 4px;
          padding: 4px 0;
        }
        .loading-dots span {
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          animation: pulse 1.4s ease-in-out infinite;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @media (max-width: 480px) {
          .chat-panel {
            width: calc(100vw - 32px);
            height: calc(100vh - 100px);
            bottom: 68px;
            right: -8px;
          }
          .chat-container {
            right: 16px;
            bottom: 16px;
          }
        }
      `}</style>

      <div className="chat-container">
        {isOpen && (
          <div className="chat-panel">
            <div className="chat-header">
              <div className="chat-avatar">AM</div>
              <div className="chat-title">
                <h3>AriBot</h3>
                <p>Ask about Ariel's work</p>
              </div>
              <button className="chat-close" onClick={() => setIsOpen(false)}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`message ${msg.role}`}>
                  {msg.content}
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
                placeholder="Ask about Ariel's work..."
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  )
}

export default ChatBot
