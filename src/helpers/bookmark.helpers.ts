export function getFavicon(u: string, size: string = "32") {
  const regex = /^.+?[^\/:](?=[?\/]|$)/;
  const baseUrl = u.match(regex);

  if (!chrome.runtime) {
    return `https://www.google.com/s2/favicons?domain=${baseUrl}&sz=${size}`;
  }

  const url = new URL(chrome.runtime.getURL("/_favicon/"));
  url.searchParams.set("pageUrl", u);
  url.searchParams.set("size", size);
  return url.toString();
}
