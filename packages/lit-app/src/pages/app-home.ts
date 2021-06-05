import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import '@material/mwc-top-app-bar';
import '@material/mwc-icon-button';
import '@ajmchambers/components-core';
import { handleNavToggle } from '../helpers/nav';

/**
 * App home page
 */
@customElement("app-home")
export class AppHome extends LitElement {
  static styles = css`
    .app-home {
      padding: 10px;
    }

    button {
      background: #5851ff;
      color: white;
      margin: 8px;
      border: none;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 16px 20px;
      border-radius: 2px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
      outline: 0;
      letter-spacing: 0.04em;
      transition: all 0.15s ease;
      cursor: pointer;
    }

    button:hover {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);
      transform: translateY(1px);
    }
  `;

  render() {
    return html`
      <mwc-top-app-bar @MDCTopAppBar:nav=${(e: any) => handleNavToggle(this, e)}>
        <mwc-icon-button slot="navigationIcon" icon="menu"></mwc-icon-button>
        <div slot="title">Home</div>
      </mwc-top-app-bar>
      <div class="app-home">
        <my-element>
          <p>Slotted content</p>
        </my-element>
        <a href="/about">About Page</a>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-home": AppHome;
  }
}
