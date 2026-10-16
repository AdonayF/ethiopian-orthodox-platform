import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Announcement { id: number; title: string; body: string; date: string }
interface ChurchEvent { id: number; title: string; description: string; date: string; location: string }
interface ScriptureTopic { id: string; english: string; amharic: string; note: string; references: string[] }
interface BibleVerse { book_name: string; chapter: number; verse: number; text: string }
interface BiblePassage { reference: string; verses: BibleVerse[]; translation_name: string }

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="topline"><span>☦ &nbsp; Ethiopian Orthodox Tewahedo Community</span><span>Faith · Heritage · Connection</span></div>
    <header class="site-header">
      <a class="brand" href="#home" aria-label="Back to homepage">
        <span class="brand-mark" aria-hidden="true">☦</span>
        <span class="brand-copy"><strong>Tewahedo</strong><small>COMMUNITY PLATFORM</small></span>
      </a>
      <nav class="desktop-nav" aria-label="Primary navigation">
        <a href="#home">Home</a><a href="#mission">Our mission</a><a href="#events">Events</a>
        <a href="#announcements">News</a><a href="#bible">Bible</a><a href="#resources">Resources</a>
      </nav>
      <a class="nav-action" href="#events">Explore community <span aria-hidden="true">↗</span></a>
    </header>
    <main id="home">
      <section class="hero" aria-labelledby="hero-heading">
        <div class="hero-main">
          <div class="hero-copy">
            <p class="eyebrow light"><span class="line"></span> WELCOME · እንኳን ደህና መጡ</p>
            <h1 id="hero-heading">በእምነት የተሳሰርን<br><em>Rooted in faith. United in community.</em></h1>
            <p class="hero-description">የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ · A digital gathering place honoring Ethiopian Orthodox faith, language, and community.</p>
            <div class="hero-actions"><a class="button button-gold" href="#events">Discover events <span aria-hidden="true">↗</span></a><a class="text-link" href="#mission">Explore our mission <span aria-hidden="true">→</span></a></div>
          </div>
          <div class="hero-art" aria-hidden="true"><div class="art-ring ring-outer"></div><div class="art-ring ring-middle"></div><div class="art-ring ring-inner"></div><span class="art-cross">☦</span><div class="art-caption">እምነት • ተስፋ • ፍቅር</div></div>
        </div>
        <div class="hero-bottom"><span>01 / A DIGITAL HOME FOR OUR COMMUNITY</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>
      <div class="prototype-note" role="note"><span aria-hidden="true">ⓘ</span><p><strong>Community project prototype.</strong> Events and announcements are demonstration content, not official church information. Religious resources will require review and approval.</p></div>
      <section class="intro section-shell" id="mission">
        <div class="intro-label"><span class="eyebrow">OUR PURPOSE</span><div class="intro-symbol" aria-hidden="true">✣</div></div>
        <div class="intro-body"><h2>Honoring our traditions.<br><em>Connecting generations.</em></h2><p>Built to bring people closer to their community—whether they are looking for upcoming events, important announcements, or a place to learn about Ethiopian Orthodox traditions.</p></div>
      </section>
      <section class="pillars section-shell" aria-label="Platform features">
        <div class="pillar"><span class="pillar-number">01</span><span class="pillar-icon" aria-hidden="true">✦</span><h3>Stay informed</h3><p>Discover community news and important announcements in one place.</p></div>
        <div class="pillar"><span class="pillar-number">02</span><span class="pillar-icon" aria-hidden="true">▦</span><h3>Gather together</h3><p>Find church events and opportunities to connect with others.</p></div>
        <div class="pillar"><span class="pillar-number">03</span><span class="pillar-icon" aria-hidden="true">✣</span><h3>Preserve heritage</h3><p>A foundation for bilingual resources and approved traditions.</p></div>
      </section>
      <section class="content-section section-shell" id="events">
        <div class="section-heading"><div><p class="eyebrow">COMMUNITY CALENDAR</p><h2>Coming together,<br><em>one event at a time.</em></h2></div><p>Stay connected with the gatherings and moments that bring our community together.</p></div>
        @if (eventsLoading()) { <p class="feedback" role="status">Loading events…</p> }
        @else if (eventsError()) { <p class="feedback error" role="alert">Events could not load. Please check that the FastAPI server is running on port 8000.</p> }
        @else { <div class="event-grid">
          @for (event of events(); track event.id) {
            <article class="event-card"><div class="card-top"><span class="card-label">COMMUNITY EVENT</span><span class="card-arrow" aria-hidden="true">↗</span></div><div class="event-icon" aria-hidden="true">✣</div><p class="event-date">{{ event.date }}</p><h3>{{ event.title }}</h3><p class="card-desc">{{ event.description }}</p><div class="card-foot"><span aria-hidden="true">⌖</span> {{ event.location }}</div></article>
          } @empty { <p class="feedback">No events have been published yet.</p> }
        </div> }
      </section>
      <section class="news-band" id="announcements"><div class="section-shell">
        <div class="section-heading"><div><p class="eyebrow">THE LATEST</p><h2>Community <em>announcements.</em></h2></div><p>News and updates for everyone in our community.</p></div>
        @if (announcementsLoading()) { <p class="feedback" role="status">Loading announcements…</p> }
        @else if (announcementsError()) { <p class="feedback error" role="alert">Announcements could not load. Please check that the FastAPI server is running on port 8000.</p> }
        @else { <div class="news-list">
          @for (item of announcements(); track item.id) { <article class="news-item"><div class="news-date">{{ item.date }}</div><div><h3>{{ item.title }}</h3><p>{{ item.body }}</p></div><span class="news-mark" aria-hidden="true">✦</span></article> }
          @empty { <p class="feedback">No announcements have been published yet.</p> }
        </div> }
      </div></section>
      <section class="bible-guide" id="bible" aria-labelledby="bible-heading">
        <div class="section-shell">
          <div class="bible-heading">
            <div><p class="eyebrow light">ቅዱስ መጽሐፍ · THE HOLY BIBLE</p><h2 id="bible-heading">Find Scripture for <em>life's difficult moments.</em></h2><p>የሕይወት ፈተናዎች ሲያጋጥሙዎት የሚያነቧቸው የመጽሐፍ ቅዱስ ክፍሎች።</p></div>
            <div class="bible-ornament" aria-hidden="true">☦</div>
          </div>
          <p class="bible-lead">Choose something you're navigating, then find passages to read and reflect on. Topics and Bible references are displayed in English and Amharic.</p>
          <div class="scripture-guide">
            <div class="topic-list" aria-label="Choose a Bible reading topic">
              @for (topic of scriptureTopics; track topic.id) {
                <button type="button" class="topic-button" [class.active]="selectedTopic().id === topic.id" [attr.aria-pressed]="selectedTopic().id === topic.id" (click)="chooseTopic(topic)">
                  <span><strong>{{ topic.english }}</strong><small lang="am">{{ topic.amharic }}</small></span><span aria-hidden="true">↗</span>
                </button>
              }
            </div>
            <div class="reading-panel" aria-live="polite">
              <p class="eyebrow">SUGGESTED SCRIPTURE READINGS</p><h3>{{ selectedTopic().english }}</h3><p class="reading-amharic" lang="am">{{ selectedTopic().amharic }}</p>
              <p class="reading-note">{{ selectedTopic().note }}</p>
              <div class="readings">
                @for (reference of selectedTopic().references; track reference) {
                  <button type="button" class="reading-row reading-choice" [class.selected]="selectedReference() === reference" (click)="openPassage(reference)"><span aria-hidden="true">✣</span><strong>{{ reference }}</strong><small>Read passage →</small></button>
                }
              </div>
              <div class="passage-reader" aria-live="polite">
                <div class="reader-head"><div><p class="eyebrow">READ THE PASSAGE</p><h4>{{ displayReference() }}</h4></div><span>World English Bible (English)</span></div>
                <div class="reader-actions">
                  <button type="button" [disabled]="readingLoading()" (click)="openPassage(selectedReference(), true)">Read the whole chapter</button>
                  <button type="button" [disabled]="readingLoading()" (click)="openPassage(selectedReference(), false)">Read selected verses</button>
                </div>
                @if (readingLoading()) { <p class="reader-status" role="status">Loading Scripture…</p> }
                @else if (readingError()) { <p class="reader-status error" role="alert">The Bible text couldn't load. Check your internet connection or choose another passage.</p> }
                @else if (passage()) {
                  <div class="verse-list" lang="en">
                    @for (verse of passage()!.verses; track verse.book_name + ':' + verse.chapter + ':' + verse.verse) {
                      <p><sup>{{ verse.verse }}</sup> {{ verse.text }}</p>
                    }
                  </div>
                  <p class="translation-credit">Translation: {{ passage()!.translation_name }} · Scripture served by bible-api.com.</p>
                }
                <div class="amharic-status"><strong lang="am">አማርኛ</strong> · Amharic Scripture text is not available in this preview yet. We won't display machine-generated Bible translations in place of an authorized edition.</div>
              </div>
              <p class="reading-caution">This English reader currently covers passages available in the World English Bible, not the complete Ethiopian Orthodox canon. An approved Amharic edition and additional canonical books are still needed.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="resources section-shell" id="resources"><div><p class="eyebrow">LOOKING AHEAD</p><h2>Wisdom worth <em>preserving.</em></h2><p>We're exploring a future library of English and Amharic resources, an Ethiopian Orthodox calendar, and carefully reviewed educational materials.</p><span class="coming-soon">PLANNED FOR A FUTURE RELEASE</span></div><div class="resources-art" aria-hidden="true"><span>☦</span><span class="ornament">✧ &nbsp; ✧ &nbsp; ✧</span></div></section>
    </main>
    <footer class="footer"><div class="section-shell footer-inner"><div class="footer-brand"><span class="footer-cross">☦</span><div><strong>Tewahedo</strong><small>Faith · Community · Heritage</small></div></div><p>Independent prototype for the Ethiopian Orthodox community.<br>Not affiliated with or endorsed by a church authority.</p><a href="#home">Back to top ↑</a></div></footer>
  `
})
export class AppComponent {
  private readonly http = inject(HttpClient);
  readonly scriptureTopics: ScriptureTopic[] = [
    { id: 'anxiety', english: 'Worry & anxiety', amharic: 'ጭንቀት', note: 'Read about trusting God when worries feel overwhelming.', references: ['Matthew 6:25–34', 'Philippians 4:6–7'] },
    { id: 'stress', english: 'Stress & exhaustion', amharic: 'ድካምና ጭንቀት', note: 'Read passages about rest, prayer, and bringing burdens to God.', references: ['Matthew 11:28–30', 'Psalm 55:22'] },
    { id: 'temptation', english: 'Lust & temptation', amharic: 'ምኞትና ፈተና', note: 'Explore teachings about thoughts, temptation, and self-control.', references: ['Matthew 5:27–30', 'James 1:12–15'] },
    { id: 'greed', english: 'Greed', amharic: 'ስግብግብነት', note: 'Reflect on possessions, contentment, and the priorities of the heart.', references: ['Luke 12:15–21', '1 Timothy 6:6–10'] },
    { id: 'sexual-immorality', english: 'Sexual immorality', amharic: 'ዝሙት', note: 'Read about honoring God through your choices and actions.', references: ['1 Corinthians 6:18–20', '1 Thessalonians 4:3–5'] },
    { id: 'fear', english: 'Fear', amharic: 'ፍርሃት', note: "Find passages about courage and God's presence amid fear.", references: ['Psalm 27:1', 'Isaiah 41:10'] },
    { id: 'forgiveness', english: 'Forgiveness', amharic: 'ይቅርታ', note: 'Reflect on mercy and forgiveness in daily life.', references: ['Matthew 18:21–35', 'Ephesians 4:32'] },
    { id: 'discouraged', english: 'Discouragement', amharic: 'ተስፋ መቁረጥ', note: 'Read about hope and perseverance in difficult seasons.', references: ['Psalm 42', 'Romans 15:13'] }
  ];
  readonly selectedTopic = signal<ScriptureTopic>(this.scriptureTopics[0]);
  readonly selectedReference = signal('Matthew 6:25–34');
  readonly displayReference = signal('Matthew 6:25–34');
  readonly passage = signal<BiblePassage | null>(null);
  readonly readingLoading = signal(false);
  readonly readingError = signal(false);
  private readingRequest = 0;

  chooseTopic(topic: ScriptureTopic): void {
    this.selectedTopic.set(topic);
    this.openPassage(topic.references[0]);
  }

  openPassage(reference: string, fullChapter = false): void {
    this.selectedReference.set(reference);
    const match = reference.match(/^(.+?)\\s+(\\d+)(?::[\\d–-]+)?$/);
    const query = fullChapter && match ? match[1] + ' ' + match[2] : reference.replace(/–/g, '-');
    this.displayReference.set(query);
    this.readingLoading.set(true);
    this.readingError.set(false);
    this.passage.set(null);
    const requestId = ++this.readingRequest;
    this.http.get<BiblePassage>('https://bible-api.com/' + encodeURIComponent(query) + '?translation=web').subscribe({
      next: result => {
        if (requestId !== this.readingRequest) return;
        if (!result.verses?.length) { this.readingError.set(true); }
        else { this.passage.set(result); }
        this.readingLoading.set(false);
      },
      error: () => {
        if (requestId !== this.readingRequest) return;
        this.readingError.set(true);
        this.readingLoading.set(false);
      }
    });
  }
  readonly events = signal<ChurchEvent[]>([]);
  readonly announcements = signal<Announcement[]>([]);
  readonly eventsLoading = signal(true);
  readonly announcementsLoading = signal(true);
  readonly eventsError = signal(false);
  readonly announcementsError = signal(false);

  constructor() {
    this.openPassage(this.selectedReference());
    this.http.get<ChurchEvent[]>('http://localhost:8000/api/v1/events').subscribe({
      next: data => { this.events.set(data); this.eventsLoading.set(false); },
      error: () => { this.eventsError.set(true); this.eventsLoading.set(false); }
    });
    this.http.get<Announcement[]>('http://localhost:8000/api/v1/announcements').subscribe({
      next: data => { this.announcements.set(data); this.announcementsLoading.set(false); },
      error: () => { this.announcementsError.set(true); this.announcementsLoading.set(false); }
    });
  }
}
