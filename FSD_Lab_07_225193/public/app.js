const $ = id => document.getElementById(id);
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
function message(text, error = false) {
  $('message').hidden = false;
  $('message').className = 'notice ' + (error ? 'error' : 'success');
  $('message').textContent = text;
}
async function api(url, method = 'GET', body, admin = false) {
  const response = await fetch(url, {
    method, headers: { 'Content-Type': 'application/json', 'X-API-Key': admin ? $('adminKey').value.trim() : localStorage.getItem('universityKey') || '' },
    ...(body ? { body: JSON.stringify(body) } : {})
  });
  const data = await response.json();
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${data.error}`);
  return data;
}
function table(headers, rows) {
  return '<div class="table-wrap"><table><thead><tr>' + headers.map(h => `<th>${escapeHTML(h)}</th>`).join('') +
    '</tr></thead><tbody>' + rows.map(row => '<tr>' + row.map(cell => `<td>${escapeHTML(cell)}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>';
}
async function action(fn) { try { await fn(); } catch (err) { message(err.message, true); } }
