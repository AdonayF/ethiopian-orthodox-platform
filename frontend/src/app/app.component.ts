import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Announcement { id: number; title: string; body: string; date: string }
interface ChurchEvent { id: number; title: string; description: string; date: string; location: string }

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
        <a href="#announcements">News</a><a href="#resources">Resources</a>
      </nav>
      <a class="nav-action" href="#events">Explore community <span aria-hidden="true">↗</span></a>
    </header>
    <main id="home">
      <section class="hero" aria-labelledby="hero-heading">
        <div class="hero-main">
          <div class="hero-copy">
            <p class="eyebrow light"><span class="line"></span> WELCOME · እንኳን ደህና መጡ</p>
            <h1 id="hero-heading">Rooted in faith.<br><em>United in community.</em></h1>
            <p class="hero-description">A welcoming digital home celebrating the faith, heritage and living traditions of the Ethiopian Orthodox Tewahedo community.</p>
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
      <section class="resources section-shell" id="resources"><div><p class="eyebrow">LOOKING AHEAD</p><h2>Wisdom worth <em>preserving.</em></h2><p>We're exploring a future library of English and Amharic resources, an Ethiopian Orthodox calendar, and carefully reviewed educational materials.</p><span class="coming-soon">PLANNED FOR A FUTURE RELEASE</span></div><div class="resources-art" aria-hidden="true"><span>☦</span><span class="ornament">✧ &nbsp; ✧ &nbsp; ✧</span></div></section>
    </main>
    <footer class="footer"><div class="section-shell footer-inner"><div class="footer-brand"><span class="footer-cross">☦</span><div><strong>Tewahedo</strong><small>Faith · Community · Heritage</small></div></div><p>Independent prototype for the Ethiopian Orthodox community.<br>Not affiliated with or endorsed by a church authority.</p><a href="#home">Back to top ↑</a></div></footer>
  `
})
export class AppComponent {
  private readonly http = inject(HttpClient);
  readonly events = signal<ChurchEvent[]>([]);
  readonly announcements = signal<Announcement[]>([]);
  readonly eventsLoading = signal(true);
  readonly announcementsLoading = signal(true);
  readonly eventsError = signal(false);
  readonly announcementsError = signal(false);

  constructor() {
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
