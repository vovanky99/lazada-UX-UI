export default function GetQueryParam({ prop }) {
  const params = {};
  let search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1));
  let definitions = search.split('&');
  definitions.forEach((dt) => {
    let parts = dt.split('=', 2);
    params[parts[0]] = parts[1];
  });
  return prop && prop in params ? params[prop] : params;
}
