import { html, css, LitElement } from "lit";

/**
 * Counter component
 *
 * @customElement wip-counter
 */
export class WipCounter extends LitElement {
  static get styles() {
    return css`
      * {
        font-size: 200%;
      }

      span {
        width: 4rem;
        display: inline-block;
        text-align: center;
      }

      button {
        width: 64px;
        height: 64px;
        border: none;
        border-radius: 10px;
        background-color: seagreen;
        color: white;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: Number },
    };
  }

  constructor() {
    super();

    /**
     * The count value
     */
    this.count = 0;
  }

  /**
   * This function will increment the counter.
   *
   * @example
   * el.inc();
   */
  inc() {
    this.count++;
  }

  /**
   * This function will decrement the counter.
   *
   * @example
   * el.dec();
   */
  dec() {
    this.count--;
  }

  render() {
    return html`
      <button @click="${this.dec}">-</button>
      <span>${this.count}</span>
      <button @click="${this.inc}">+</button>
    `;
  }
}