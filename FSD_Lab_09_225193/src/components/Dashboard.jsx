import HideImage from './HideImage.jsx';
import RevealImage from './RevealImage.jsx';

export default function Dashboard() {
  return (
    <section className="dashboard" aria-label="Image steganography dashboard">
      <input className="view-choice" type="radio" name="view" id="hide-view" defaultChecked />
      <input className="view-choice" type="radio" name="view" id="reveal-view" />
      <nav className="tabs" aria-label="Dashboard views">
        <label htmlFor="hide-view">Hide image</label>
        <label htmlFor="reveal-view">Reveal image</label>
      </nav>
      <div className="hide-panel"><HideImage /></div>
      <div className="reveal-panel"><RevealImage /></div>
    </section>
  );
}
