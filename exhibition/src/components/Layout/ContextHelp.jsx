import './ContextHelp.module.css'

export default function ContextHelp() {
  return (
    <div className="context-help">
      <article className="help-content">
        <h1>We Should Be Allowed to Think</h1>

        <section>
          <h2>What is this?</h2>
          <p>
            This is not a traditional exhibition website. It is an exhibition that exists only online, exploring how digital platforms capture attention and pre-empt thought before it can form.
          </p>
          <p>
            Six artworks are trapped behind different attention-capture mechanisms used by social media platforms and authoritarian systems. To experience the art, you must solve puzzles to disable each mechanism.
          </p>
        </section>

        <section>
          <h2>How it works</h2>
          <ol>
            <li><strong>Choose your path:</strong> Select any artwork to engage with (no required order)</li>
            <li><strong>Encounter the mechanism:</strong> Each work is initially obscured by a different control system</li>
            <li><strong>Solve the puzzle:</strong> Each mechanism requires active problem-solving (not simple clicking)</li>
            <li><strong>Unlock the artwork:</strong> Successfully solving reveals the artist's work</li>
            <li><strong>Watch the transformation:</strong> As you solve more mechanisms, the platform facade breaks down, revealing its surveillance infrastructure</li>
            <li><strong>Reach liberation:</strong> Solving all 6 mechanisms transforms the site into a "people's internet" aesthetic</li>
          </ol>
        </section>

        <section>
          <h2>The Concept</h2>
          <p>
            This exhibition explores <strong>pre-emptive control</strong> — how contemporary authoritarianism operates not by silencing speech after it occurs, but by engineering consciousness before thought can form. The artworks respond with <strong>tactical evasion</strong> — strategies that resist predetermined narratives, imposed naming, attention infrastructure, and compulsory performance.
          </p>
          <p>
            The website itself performs this thesis: it looks like a normal social platform, but reveals its control mechanisms as you actively resist them.
          </p>
        </section>

        <section>
          <h2>Technical Note</h2>
          <p>
            This site tracks your behavior (scroll depth, mouse movements, time spent) as part of one of the mechanisms. This data is stored only in your browser and is never transmitted anywhere. It exists solely to make visible the normally invisible surveillance that occurs on every platform you use.
          </p>
        </section>
      </article>
    </div>
  )
}
