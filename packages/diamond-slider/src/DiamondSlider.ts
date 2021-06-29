import { html, css, LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ref, createRef, Ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';

const lerp = (curr: number, next: number) => {
  const delta = next - curr;
  if (Math.abs(delta) < 0.01) return next;
  return curr + (next - curr) * 0.13;
};

function createLerper() {
  let target = 0;
  let current = 0;
  let af: number;
  const observers = new Set<any>();

  function animate() {
    current = lerp(current, target);
    observers.forEach(observer => observer({ current, target }));
    if (current === target) {
      return;
    }
    af = requestAnimationFrame(animate);
  }

  return {
    update: (value: number) => {
      cancelAnimationFrame(af);
      target = value;
      af = requestAnimationFrame(animate);
    },
    subscribe: (fn: any) => {
      observers.add(fn);
      fn({ current, target });
    },
  };
}

const lerper = createLerper();

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export class DiamondSlider extends LitElement {
  static styles = css`
    :host {
      --background-color: var(--diamond-slider-background-color, #fff);
      --color-primary: var(--diamond-slider-color-primary, #fb6446);
      --text-color: var(--diamond-slider-text-color, #111e3c);
      --font-family: var(--diamond-slider-font-primary, inherit);

      background-color: var(--background-color);
      color: var(--text-color);
      font-family: var(--font-family);

      padding: 2rem 3rem;
      overflow: hidden;
      box-shadow: 0 0 2rem rgba(black, 0.1);
      border-radius: 1em;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    * {
      box-sizing: border-box;
      position: relative;
    }

    :host *::selection {
      background: var(--color-primary);
      color: white;
    }

    .diamond-slider {
      margin-top: 5rem;
      margin-bottom: 1rem;
    }

    #slider {
      display: block;
      width: 100%;
    }

    .slider {
      display: grid;
      grid-template-areas: 'layer';
      align-items: center;
    }

    .slider > * {
      grid-area: layer;
    }

    .slider-input {
      opacity: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
    }

    .slider-track {
      height: 0.25em;
      background: #ddd;
      border-radius: 0.25em;
    }

    .slider-diamond {
      position: absolute;
      left: 0;
      bottom: 100%;
      width: 100%;
      transform: translateX(calc(var(--d) * 100%));
    }

    .slider-diamond-inner {
      width: 3em;
      height: 3em;
      margin: 0 -1.3em;
      transform: scale(0);
      transition: transform 0.2s ease-in-out 0.5s;
      transform-origin: bottom center;

      display: grid;
      place-items: center;
      grid-template-areas: 'layer';

      --rotate: rotate(calc(var(--tilt) * -10deg));
    }

    .slider-diamond-inner::before {
      grid-area: layer;
      content: attr(data-value);
      color: white;
      font-weight: bold;
      text-align: center;
      z-index: 1;
      padding-bottom: 0.4em;
      transform-origin: bottom center;
      transform: var(--rotate);
    }

    .slider-diamond-inner svg {
      grid-area: layer;
      display: block;
      width: 100%;
      height: 100%;
      transform: var(--rotate);
      transform-origin: bottom center;
      fill: var(--color-primary);
    }

    .slider:hover .slider-diamond-inner,
    .slider:focus .slider-diamond-inner {
      transform: scale(1);
      transition-delay: 0s;
    }

    .slider-thumb {
      width: 100%;
      transform: translateX(calc(var(--d) * 100%));
    }

    .slider-thumb::before {
      content: '';
      display: block;
      width: 1.5em;
      height: 1.5em;
      border: solid 0.3em var(--color-primary);
      border-radius: 1em;
      margin: 0 -0.5em;
      box-sizing: border-box;
      transition: border-width 0.2s ease-in-out;
    }

    .slider-input {
      cursor: grab;
    }

    .slider-input:active {
      cursor: grabbing;
    }

    .slider-input:active ~ .slider-thumb::before {
      border-width: 0.6em;
    }

    h1 {
      font-weight: normal;
    }

    output {
      display: block;
      font-size: 2rem;
      text-align: right;
      font-weight: bold;
      font-feature-settings: 'tnum';
      font-variant-numeric: tabular-nums;
    }

    .checkout {
      display: flex;
      flex-direction: row-reverse;
    }

    button {
      appearance: none;
      color: white;
      background: #0f0f0f;
      padding: 1rem;
      font-size: 0.75rem;
      border-radius: 0.5rem;
      font-family: inherit;
      letter-spacing: 0.5px;
      box-shadow: 0 0.5rem 2rem rgba(#0f0f0f, 0.3);
    }

    .quantity {
      font-weight: bold;
    }
  `;

  inputRef: Ref<HTMLInputElement> = createRef();

  @property({ type: Number }) value = 0;

  @property({ type: Number }) min = 0;

  @property({ type: Number }) max = 100;

  @state() smoothValue = this.value;

  @state() targetValue = this.value;

  @state() formattedValue: string = formatter.format(this.value * 35);

  __handleInput(e: InputEvent) {
    this.value = parseInt((e.target as HTMLInputElement).value, 10);
    lerper.update(this.value);
  }

  __calcTilt() {
    return this.targetValue - this.smoothValue;
  }

  __calcSmoothValue() {
    return this.smoothValue / (this.min + this.max);
  }

  connectedCallback() {
    super.connectedCallback();
    lerper.subscribe(
      ({ current, target }: { current: number; target: number }) => {
        this.smoothValue = current;
        this.targetValue = target;
        this.formattedValue = formatter.format(current * 35);
      }
    );
    lerper.update(this.value);
  }

  render() {
    return html`
      <header class="diamond-header">
        <h1><strong>KEY FRAMER</strong> Diamond Frames</h1>
      </header>
      <div class="quantity">Quantity: ${this.value}</div>
      <div
        class="diamond-slider"
        style=${styleMap({
          '--d': `${this.__calcSmoothValue()}`,
          '--value': `${this.smoothValue}`,
          '--tilt': `${this.__calcTilt()}`,
        })}
      >
        <div class="slider">
          <input
            ${ref(this.inputRef)}
            class="slider-input"
            type="range"
            name=""
            id="slider"
            .value=${`${this.value}`}
            .min=${`${this.min}`}
            .max=${`${this.max}`}
            @input=${this.__handleInput}
          />
          <div class="slider-track"></div>
          <div class="slider-thumb"></div>
          <div class="slider-diamond">
            <div class="slider-diamond-inner" data-value=${this.value}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 99 84"
                width="50"
              >
                <path d="M20 0L1 20l50 63 48-63L80 0H20z" />
                >
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="total">
        <output id="output">${this.formattedValue}</output>
      </div>
      <div class="checkout">
        <button>Add to Cart</button>
      </div>
    `;
  }
}
