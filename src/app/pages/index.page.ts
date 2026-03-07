import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  standalone: true,
  template: `
    <main>
      <h1>Hello from Zerops!</h1>
      <div class="card">
        <p><span class="label">Framework</span> Analog {{ analogVersion }}</p>
        <p><span class="label">Environment</span> {{ appEnv }}</p>
        <p><span class="label">Built at</span> {{ buildTime }}</p>
      </div>
      <p class="note">
        Static deployment on Zerops — built at compile time, served by Nginx.
      </p>
    </main>
  `,
  styles: [`
    main {
      font-family: system-ui, sans-serif;
      max-width: 580px;
      margin: 5rem auto;
      padding: 0 1.5rem;
      color: #1e293b;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 1.5rem;
      color: #dc2626;
    }
    .card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1.25rem 1.5rem;
      margin-bottom: 1.5rem;
    }
    .card p {
      margin: 0.5rem 0;
      font-size: 0.95rem;
    }
    .label {
      font-weight: 600;
      display: inline-block;
      width: 110px;
      color: #475569;
    }
    .note {
      font-size: 0.85rem;
      color: #64748b;
    }
  `],
})
export default class IndexPage {
  readonly analogVersion = __ANALOG_VERSION__;
  readonly appEnv = import.meta.env['VITE_APP_ENV'] ?? 'production';
  readonly buildTime = new Date(__BUILD_TIME__).toUTCString();
}
