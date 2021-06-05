import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import { styleMap } from 'lit/directives/style-map.js';
import { Router } from "@vaadin/router";
import "@material/mwc-drawer";
import '@material/mwc-icon-button';

/**
 * App root element
 */
@customElement("app-root")
export class AppRoot extends LitElement {
  @state()
  navOpen = false;

  @state()
  routeName: string = "";

  static styles = css`
    .app-root {
      height: 100%;
      width: 100%;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(
      'vaadin-router-location-changed',
      (event) => this.updateCurrentRouteName(<CustomEvent>event)
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener(
      'vaadin-router-location-changed',
      (event) => this.updateCurrentRouteName(<CustomEvent>event)
    );
  }

  updateCurrentRouteName(e: CustomEvent) {
    const { route } = e.detail.location;
    this.routeName = route.name;
  }

  firstUpdated() {
    const router = new Router(this.shadowRoot?.querySelector("#routerOutlet"));
    router.setRoutes([
      // temporarily cast to any because of a Type bug with the router
      {
        path: "",
        animate: true,
        children: [
          {
            name: "home",
            path: "/",
            component: "app-home",
            action: async () => {
              await import("./app-home");
            },
          },
          {
            name: "about",
            path: "/about",
            component: "app-about",
            action: async () => {
              await import("./app-about");
            },
          },
        ],
      } as any,
    ]);
  }

  _toggleNav(e: any) {
    this.navOpen = !this.navOpen;
  }

  render() {
    return html`
      <div class="app-root">        
        <mwc-drawer @MDCDrawer:closed=${() => this.navOpen = false} hasHeader type="modal" ?open=${this.navOpen}>
          <span slot="title">Drawer Title</span>
          <span slot="subtitle">subtitle</span>
          <h1>${this.routeName}</h1>
          <div>
            <ul>
              <li><a href="/" style=${styleMap({ fontWeight: this.routeName === 'home' ? "bold" : undefined })}>Home</a></li>
              <li><a href="/about" style=${styleMap({ fontWeight: this.routeName === 'about' ? "bold" : undefined })}>About</a></li>
            </ul>
          </div>
          <div slot="appContent" @navToggle=${this._toggleNav}>
            <main>
              <div id="routerOutlet"></div>
            </main>
          </div>
        </mwc-drawer>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-root": AppRoot;
  }
}
