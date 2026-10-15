import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Announcement { id: number; title: string; body: string; date: string }
interface ChurchEvent { id: number; title: string; description: string; date: string; location: string }

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <header class="site-header"><div class="brand"><span class="cross">☦</span><span>Ethiopian Orthodox <small>Community Platform · Prototype</small></span></div><nav aria-label="Main navigation"><a href="#about">About</a><a href="#events">Events</a><a href="#announcements">Announcements</a></nav></header>
    <main>
      <section class="hero" id="about"><div class="hero-content"><p class="eyebrow">WELCOME • እንኳን ደህና መጡ</p><h1>A community connected by faith, tradition, and service.</h1><p>One place to discover church events, community news, and trusted resources. Built with care for the next generation.</p><a class="cta" href="#events">Explore events →</a></div><div class="hero-symbol" aria-hidden="true">☦</div></section>
      <section class="notice" role="note"><strong>Early prototype:</strong> Content is illustrative only. This is not an official church website or source of liturgical guidance.</section>
      <section class="section" id="events"><div class="section-title"><div><p class="eyebrow">STAY CONNECTED</p><h2>Upcoming Events</h2></div><span class="section-tag">Community</span></div>
      @if (eventsLoading()) { <p>Loading events…</p> } @else if (eventsError()) { <p class="error">Events aren't available right now. Please check that the API is running.</p> } @else { <div class="cards">@for (event of events(); track event.id) { <article class="card"><span class="card-icon">✦</span><p class="meta">{{ event.date }}</p><h3>{{ event.title }}</h3><p>{{ event.description }}</p><p class="location">{{ event.location }}</p></article> } @empty { <p>No upcoming events yet.</p> }</div> }</section>
      <section class="section section-alt" id="announcements"><div class="section-title"><div><p class="eyebrow">LATEST UPDATES</p><h2>Announcements</h2></div></div>
      @if (announcementsLoading()) { <p>Loading announcements…</p> } @else if (announcementsError()) { <p class="error">Announcements aren't available right now. Please check that the API is running.</p> } @else { <div class="cards">@for (item of announcements(); track item.id) { <article class="card"><p class="meta">{{ item.date }}</p><h3>{{ item.title }}</h3><p>{{ item.body }}</p></article> } @empty { <p>No announcements yet.</p> }</div> }</section>
    </main><footer><span>☦ Ethiopian Orthodox Community Platform</span><span>Prototype · Built for community service</span></footer>
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
