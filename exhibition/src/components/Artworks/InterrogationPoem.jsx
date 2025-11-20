import { useState, useEffect } from 'react'
import './InterrogationPoem.css'

const POEM_SECTIONS = [
  {
    type: 'title',
    text: 'Interrogation',
    delay: 0
  },
  {
    type: 'questions',
    lines: [
      'Do you remember…',
      'Where were you?',
      'Where did you come from?',
      'Where were you headed to?',
      'How were you getting there?',
      'What were you doing?',
      'Be specific!'
    ],
    delay: 1000
  },
  {
    type: 'surveillance',
    text: '{We have you on film.}',
    delay: 2000
  },
  {
    type: 'questions',
    lines: [
      'Who were you with?',
      'How well do you know them?',
      'Were you alone?',
      "Are you sure there wasn't anyone else?",
      'Who did you speak to?',
      'What did you say?',
      "What didn't you say?",
      'Why or why not?'
    ],
    delay: 1500
  },
  {
    type: 'questions',
    lines: [
      'What did you eat for breakfast?',
      'Lunch?',
      'Dinner?',
      'Did you have any snacks? Dessert?',
      'Are you sure?'
    ],
    delay: 1500
  },
  {
    type: 'surveillance',
    text: '{We still have you on film.}',
    delay: 2000
  },
  {
    type: 'questions',
    lines: [
      'Who are you now?',
      'Do you know?',
      'Who were you then?',
      'Who do you expect to be tomorrow?',
      'In a week?',
      'In a month?',
      'In a year?',
      'In a decade?',
      'Do you really know?'
    ],
    delay: 1500
  },
  {
    type: 'questions',
    lines: [
      'What were you thinking?',
      'What did you neglect to think?',
      'Who told you what to think?',
      'No one told you what to think.',
      'No one is telling you what to think.'
    ],
    delay: 1500
  },
  {
    type: 'surveillance',
    text: '{We will continue to have you on film.}',
    delay: 2000
  },
  {
    type: 'questions',
    lines: [
      'What did you forget to mention?',
      '?'
    ],
    delay: 1500
  },
  {
    type: 'closing',
    lines: [
      "We'll reconnect soon.",
      'Keep your story straight.',
      'Or else.'
    ],
    delay: 2000
  },
  {
    type: 'surveillance',
    text: '{We will always have you on film.}',
    delay: 2500
  }
]

export default function InterrogationPoem() {
  const [visibleSections, setVisibleSections] = useState([])
  const [currentSection, setCurrentSection] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showAbout, setShowAbout] = useState(false)

  useEffect(() => {
    if (currentSection >= POEM_SECTIONS.length) {
      setIsComplete(true)
      return
    }

    const section = POEM_SECTIONS[currentSection]
    const timer = setTimeout(() => {
      setVisibleSections(prev => [...prev, currentSection])
      setCurrentSection(prev => prev + 1)
    }, section.delay)

    return () => clearTimeout(timer)
  }, [currentSection])

  const handleSkip = () => {
    setVisibleSections(POEM_SECTIONS.map((_, i) => i))
    setCurrentSection(POEM_SECTIONS.length)
    setIsComplete(true)
  }

  const handleReset = () => {
    setVisibleSections([])
    setCurrentSection(0)
    setIsComplete(false)
    setShowAbout(false)
  }

  return (
    <div className="interrogation-poem">
      <div className="poem-controls">
        {!isComplete && (
          <button onClick={handleSkip} className="skip-button">
            Skip to end →
          </button>
        )}
        {isComplete && (
          <button onClick={handleReset} className="reset-button">
            ↻ Experience again
          </button>
        )}
      </div>

      <div className="poem-content">
        {POEM_SECTIONS.map((section, index) => {
          if (!visibleSections.includes(index)) return null

          if (section.type === 'title') {
            return (
              <h2 key={index} className="poem-title fade-in">
                {section.text}
              </h2>
            )
          }

          if (section.type === 'surveillance') {
            return (
              <div key={index} className="surveillance-line pulse-in">
                {section.text}
              </div>
            )
          }

          if (section.type === 'questions') {
            return (
              <div key={index} className="question-block fade-in">
                {section.lines.map((line, lineIndex) => (
                  <div key={lineIndex} className="question-line">
                    {line}
                  </div>
                ))}
              </div>
            )
          }

          if (section.type === 'closing') {
            return (
              <div key={index} className="closing-block fade-in">
                {section.lines.map((line, lineIndex) => (
                  <div key={lineIndex} className="closing-line">
                    {line}
                  </div>
                ))}
              </div>
            )
          }

          return null
        })}

        {isComplete && (
          <div className="about-section fade-in">
            <button
              onClick={() => setShowAbout(!showAbout)}
              className="about-toggle"
            >
              {showAbout ? '▼' : '▶'} About Interrogation
            </button>

            {showAbout && (
              <div className="about-content">
                <p>
                  On the morning of Oct. 19, 2023, the police showed up unexpectedly on my doorstep with all sorts of leading questions insinuating that I had done something wrong based upon my car having been recorded at a specific place and time from over a month previous. For all that I had done nothing wrong, it was a challenging exchange due to the accusatory nature of the engagement, and it caused considerable anxiety for the remainder of the day onward and in any interactions I have had with local police since.
                </p>
                <p>
                  This poem evolved from me trying to make sense of the emotional response and confusion that the interrogation conjured forth. Though the statements are only somewhat accurate to the experience and more reflect upon my dark musings reliving the incident, they convey the sense of helplessness and urgency that I felt at the time.
                </p>
                <p>
                  I find that since this happened, there have become far greater number of unwarranted policing-based contacts all over the country after the 2024 election by numerous forces and entities that may or may not be locally sanctioned. This increased activity is far worse than anything I experienced, given that the confrontation I faced was rooted in recording my supposed presence at a specific time and place as "caught on camera" – now people just have to look or dress or identify "wrongly" in order to be targeted. In the midst of ICE raids and protestors dragged off against their will we all must question – who's next?
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="poem-footer">
        <a
          href="/exhibition/artworks/weigel/Interrogation - Jennifer Weigel.docx"
          download
          className="download-poem-link"
        >
          📄 Download Original Document
        </a>
      </div>
    </div>
  )
}
