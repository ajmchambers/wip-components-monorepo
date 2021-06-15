import { LionButton } from '@lion/button';
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
export declare class MyButton extends LionButton {
    static get styles(): import("lit-element").CSSResultGroup[];
}
declare global {
    interface HTMLElementTagNameMap {
        'my-button': MyButton;
    }
}
//# sourceMappingURL=my-button.d.ts.map