import {css} from 'lit-element';
import {LionButton} from '@lion/button';
import {customElement} from 'lit/decorators.js';

/**
 * An implementation of the egg button.
 *
 *
 * @attr {Boolean} disabled - Disabled attribute
 * @attr {'primary' | 'secondary' | 'tertiary'} kind - It set an predefined appearance of the button
 *
 * @cssprop {color} [--egg-primary] Background color for 'color=primary' button
 * @cssprop {color} [--egg-primary-active] Active background color for 'color=primary' button
 * @cssprop {color} [--egg-primary-hover] Hover background color for 'color=primary' button
 * @cssprop {color} [--egg-surface] Background when disabled
 * @cssprop {color} [--egg-on-primary] Text color for 'color=primary' button
 * @cssprop {color} [--egg-on-surface] Default text color
 * @cssprop {length} [--egg-disabled-opacity] Disabled opacity
 * @cssprop {color} [--egg-divider] Color of the divider
 * @cssprop {color} [--egg-surface-active] Active surface color
 * @cssprop {color} [--egg-surface-hover] Hover surface color
 * @cssprop {color} [--egg-button-background=transparent] Customizable background color
 * @cssprop {color} [--egg-button-color=--egg-on-surface] Customizable color
 *
 * @slot - Default slot, content of the button
 *
 * @fires click - Dispatched when the button is clicked
 *
 * @extends LionButton
 */
 @customElement('my-button')
export class MyButton extends LionButton {
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 20px;
          height: var(--my-size-regular, 40px);
          background: var(--my-button-background, transparent);
          color: var(--my-button-color, var(--my-on-surface, #000000de));
          user-select: none;
          align-content: center;
          justify-content: center;
          padding: 0;
        }
        :host .button-content {
          padding-left: 24px;
          padding-right: 24px;
        }
        :host,
        :host::before {
          border-radius: 3px;
          box-sizing: border-box;
          cursor: pointer;
        }
        :host::before {
          border: 1px solid var(--my-divider, #00000029);
          top: 0;
          bottom: 0;
          transform: unset;
          left: 0;
          right: 0;
        }
        :host .button-content {
          z-index: 0;
        }
        :host(:hover)::before {
          background: var(--my-surface-hover, #00000014);
        }
        :host(:active),
        :host([active]),
        :host(:hover) {
          background: transparent;
        }
        :host(:active)::before,
        :host([active])::before {
          background: var(--my-surface-active, #000000de);
        }
        :host([disabled]) {
          opacity: var(--my-disabled-opacity, 0.4);
        }
        :host([kind='primary']) {
          color: var(--my-on-primary, #fff);
        }
        :host([kind='primary'])::before {
          background: var(--my-primary, #1976d2);
        }
        :host(:hover[kind='primary'])::before {
          background: var(--my-primary-hover, #135699);
        }
        :host(:active[kind='primary'])::before,
        :host([active][kind='primary'])::before {
          background: var(--my-primary-active, fff);
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-button': MyButton;
  }
}
