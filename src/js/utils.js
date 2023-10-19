/**
 * Func help parse Url
 */
export const getUrlParameter = (t) => {
  let e,
    n,
    o = window.location.search.substring(1).split("&");
  for (n = 0; n < o.length; n++)
    if ((e = o[n].split("="))[0] === t)
      return void 0 === e[1] || decodeURIComponent(e[1]);
};
