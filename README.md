# FHEM Style: haus-automatisierung.com (v2)

Mit diesem Style wird die FHEM-Oberfläche etwas anschaulicher - "Look and Feel" sind dabei an das Webdesign der Seite [haus-automatisierung.com](https://haus-automatisierung.com/) angelehnt.

## Installation

1. Hinzufügen des neuen Themes in Version 2

```
update add https://raw.githubusercontent.com/klein0r/fhem-style-haus-automatisierung/version-2/controls_ha_theme.txt
update check ha_theme
update all ha_theme
```

2. Select Style -> hausautomatisierung_com

3. Ein paar Anpassungen am Web-Device:

```
attr WEB JavaScripts codemirror/fhem_codemirror.js
attr WEB codemirrorParam { "theme": "blackboard", "lineNumbers":true, "lineWrapping": true, "height": "auto", "autocomplete": true }
attr WEB roomIcons Save.config:message_attention
```

Einmal speichern und neu laden - fertig.

## Entwicklungsumgebung aufsetzen

**Bitte keine Pull-Requests für CSS-Dateien einreichen, diese werden per SASS generiert.**

Der Style basiert auf [SASS](https://sass-lang.com/) / [Compass](http://compass-style.org/). So können die einzelnen Bereiche unterteilt werden und der Style wird viel übersichtlicher und leichter zu warten / erweitern.

Du brauchst:

- git [Doku](https://git-scm.com/book/de/v1/Los-geht%E2%80%99s-Git-installieren)
- SASS [Doku](https://sass-lang.com/install)
- Compass [Doku](http://compass-style.org/install/)

Dann die aktuellen Dateien von GitHub holen (oder aus einem eigenen Fork):

```
cd /opt/fhem/
git clone -b version-2 git@github.com:klein0r/fhem-style-haus-automatisierung.git
```

Dann ein paar Symlinks erstellen:

```
ln -s /opt/fhem/fhem-style-haus-automatisierung/www/hausautomatisierung-com /opt/fhem/www/hausautomatisierung-com
ln -s /opt/fhem/fhem-style-haus-automatisierung/www/images/hausautomatisierung_com /opt/fhem/www/images/hausautomatisierung_com
ln -s /opt/fhem/fhem-style-haus-automatisierung/www/pgm2/hausautomatisierung_comfloorplanstyle.css /opt/fhem/www/pgm2/hausautomatisierung_comfloorplanstyle.css
ln -s /opt/fhem/fhem-style-haus-automatisierung/www/pgm2/hausautomatisierung_com.js /opt/fhem/www/pgm2/hausautomatisierung_com.js
ln -s /opt/fhem/fhem-style-haus-automatisierung/www/pgm2/hausautomatisierung_comstyle.css /opt/fhem/www/pgm2/hausautomatisierung_comstyle.css
ln -s /opt/fhem/fhem-style-haus-automatisierung/www/pgm2/hausautomatisierung_comsvg_style.css /opt/fhem/www/pgm2/hausautomatisierung_comsvg_style.css

ln -s /opt/fhem/fhem-style-haus-automatisierung/FHEM/99_myHaUtils.pm /opt/fhem/FHEM/99_myHaUtils.pm
```

Auf Änderungen warten und bei Bedarf CSS neu bauen:

```
cd /opt/fhem/fhem-style-haus-automatisierung
compass watch
```

Dann einfach die SCSS-Dateien bearbeiten.

## Fehler melden

Bitte [hier](https://github.com/klein0r/fhem-style-haus-automatisierung/issues) einen Issue erstellen

## Vorschau

![FHEM Style](https://raw.githubusercontent.com/klein0r/fhem-style-haus-automatisierung/version-2/preview.png)

## Smart-Home-Icons:

Thanks @ https://dribbble.com/shots/2084609-Smart-House-Icon-Set-Free

## License

MIT License

Copyright (c) 2019 Matthias Kleine

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
