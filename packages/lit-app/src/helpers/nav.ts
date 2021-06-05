export function handleNavToggle(self: any, e: any) {
  const options = {
    detail: e,
    bubbles: true,
    composed: true
  };
  self.dispatchEvent(new CustomEvent('navToggle', options));
}