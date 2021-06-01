import './style.css'
import '@wip/counter/define';
import {html, render} from 'lit-html';

const app = document.querySelector<HTMLDivElement>('#app')!

render(
  html`
    <div>
      <h1>Testing</h1>
      <wip-counter></wip-counter>
    </div>
  `,
  app
);