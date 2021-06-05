import { html, TemplateResult } from 'lit';

export const Header = (content?: TemplateResult) => {
  return html`
    <style>
      .template-header {
        background: #5851ff;
        color: white;
        height: 56px;
        display: flex;
        align-items: center;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);
      }
      .template-header h1 {
        font-size: 1.4rem;
        font-weight: 500;
        color: #fff;
        padding: 0 12px;
      }
    </style> 
    <header class="template-header">
      ${content && content}
    </header>
  `
}