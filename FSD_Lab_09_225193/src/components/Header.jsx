export default function Header() {
  const title = 'Image Steganography';
  const description = 'Hide one image inside another — invisibly.';

  return (
    <header className="header">
      <div className="heading-row">
        <h1>{title}</h1>
        <button className="theme-button" type="button" aria-label="Theme toggle preview" title="Static dashboard preview" disabled>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
          </svg>
        </button>
      </div>
      <p>{description}</p>
    </header>
  );
}
