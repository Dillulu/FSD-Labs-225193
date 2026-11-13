const TOKEN_KEY = 'cms_token';
const USER_KEY = 'cms_user';

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, function (ch) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
  });
}

function saveAuth(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY) || '';
}

function getStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function showNotice(text, isError) {
  const $box = $('#message');
  $box
    .removeAttr('hidden')
    .removeClass('error success')
    .addClass('notice ' + (isError ? 'error' : 'success'))
    .text(text);
}

function hideNotice() {
  $('#message').attr('hidden', true);
}

function cmsApi(url, method, data) {
  const token = getAuthToken();
  const options = {
    url: url,
    method: method || 'GET',
    contentType: 'application/json',
    dataType: 'json',
    headers: token ? { Authorization: 'Bearer ' + token } : {}
  };
  if (data !== undefined && data !== null) {
    options.data = JSON.stringify(data);
  }

  return $.ajax(options).fail(function (xhr) {
    if (xhr.status === 401 && url !== '/api/auth/login') {
      const msg = (xhr.responseJSON && xhr.responseJSON.error) || 'Unauthorized';
      if (/expired|invalid authentication token/i.test(msg)) {
        clearAuth();
      }
    }
  });
}

function extractAjaxError(xhr, fallback) {
  if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
    return 'HTTP ' + xhr.status + ': ' + xhr.responseJSON.error;
  }
  return fallback || 'Request failed.';
}

function logoutUser() {
  clearAuth();
  window.location.href = '/login';
}
