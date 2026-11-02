(() => {
  if (document.querySelector('script[src="https://client.crisp.chat/l.js"]')) {
    return;
  }

  window.$crisp = window.$crisp || [];
  window.CRISP_WEBSITE_ID = "c01c5548-709d-44b7-b1a4-7f5ac9edd741";

  const script = document.createElement("script");
  script.src = "https://client.crisp.chat/l.js";
  script.async = true;
  document.head.append(script);
})();
