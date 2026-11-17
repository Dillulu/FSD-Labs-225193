// SummaryCards.jsx - Reusable summary cards that receive their content through props
function SummaryCard({ title, value, icon, description, theme }) {
  return (
    <div className={`card card-${theme}`}>
      <div className="card-top">
        <span className="card-label">{title}</span>
        <span className="card-icon">{icon}</span>
      </div>
      <div className="card-value">{value}</div>
      <div className="card-accent-line"></div>
      {description && <p className="card-footer-text">{description}</p>}
    </div>
  );
}

function SummaryCards({ cards }) {
  return (
    <section className="summary-cards">
      {cards.map((card) => (
        <SummaryCard key={card.title} {...card} />
      ))}
    </section>
  );
}

export default SummaryCards;
