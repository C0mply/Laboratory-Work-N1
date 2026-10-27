# Laboratory Work N1

Orbit Atlas is a one-page website about the eight planets of the solar system. It uses Node.js and Express, custom CSS and JavaScript.

## Run

With Node.js and npm installed:

```text
npm ci
npm start
```

Open http://localhost:3000. The local copy on drive D also includes portable Node.js: double-click `start.cmd`. Run `install.cmd` to reinstall dependencies.

## Features

- Eight planet cards with locally stored NASA photographs.
- Filters for inner and outer planets, combined with live name search.
- Planet field notes in an accessible modal dialog; close with Escape or the close button.
- Animated orbital illustration with pause and resume controls.
- Mobile navigation and a conditional back-to-top button.
- Support for reduced-motion preferences.

The orbital illustration is not to scale. After installing dependencies, the site works offline; only external NASA reference links require a connection.

## Files

```text
express/
  index.html
  css/style.css
  js/app.js
  images/
server.js
package.json
package-lock.json
screenshots/
```

`npm run check` checks JavaScript syntax. `GET /health` returns the server status.

## Sources

Planet facts and image sources: [NASA Science — About the Planets](https://science.nasa.gov/solar-system/planets/). Photographs include Apollo 17 Earth, Juno Jupiter, Cassini Saturn and Voyager 2 Uranus imagery. Photographs are retained as scientific imagery; no NASA endorsement is implied.

The screenshots document the HTML template, custom CSS and JavaScript features. The report follows Tasks 1–8 of the laboratory assignment.

Repository: https://github.com/C0mply/Laboratory-Work-N1
