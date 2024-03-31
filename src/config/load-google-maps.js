// load-google-maps.js

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY; // Access the Google Maps API key
const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAPID_KEY; // Access the mapId key

console.log({ API_KEY });
// console.log({ MAP_ID });

((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        if (API_KEY) {
          // Add the API key to the URL if available
          e.set("key", API_KEY);
        }
        if (MAP_ID) {
          // Add the mapId to the URL if available
          e.set("map_id", MAP_ID);
        }
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({ v: "weekly" });
