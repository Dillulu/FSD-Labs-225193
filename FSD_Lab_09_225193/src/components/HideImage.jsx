export default function HideImage() {
  return (
    <section className="card" aria-labelledby="hide-title">
      <h2 id="hide-title">Hide a secret image inside a cover image</h2>
      <div className="image-grid">
        <div>
          <p className="field-label">Cover image</p>
          <div className="drop-zone">
            <div className="image-icon" aria-hidden="true"><svg width="36" height="40" viewBox="0 0 36 40" aria-hidden="true">
              <rect x="2" y="4" width="32" height="32" rx="2" fill="#caa66b" />
              <rect x="6" y="8" width="24" height="24" fill="#a5d7eb" />
              <circle cx="24" cy="14" r="3" fill="#ffdf78" />
              <path d="M6 29l8-11 7 8 4-5 5 8v3H6z" fill="#69a56a" />
            </svg></div>
            <p className="drop-title">Cover image</p>
            <p>Drop an image here or click to browse</p>
          </div>
        </div>
        <div>
          <p className="field-label">Secret image</p>
          <div className="drop-zone">
            <div className="image-icon" aria-hidden="true"><svg width="36" height="40" viewBox="0 0 36 40" aria-hidden="true">
              <rect x="2" y="4" width="32" height="32" rx="2" fill="#caa66b" />
              <rect x="6" y="8" width="24" height="24" fill="#a5d7eb" />
              <circle cx="24" cy="14" r="3" fill="#ffdf78" />
              <path d="M6 29l8-11 7 8 4-5 5 8v3H6z" fill="#69a56a" />
            </svg></div>
            <p className="drop-title">Secret image</p>
            <p>Drop an image here or click to browse</p>
          </div>
        </div>
      </div>
      <button className="primary-button" type="button" disabled>Hide secret image</button>
    </section>
  );
}
