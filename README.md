# FHEM Style: haus-automatisierung.com (v2)

Mit diesem Style wird die FHEM-Oberfläche etwas anschaulicher - "Look and Feel" sind dabei an das Webdesign der Seite [haus-automatisierung.com](https://haus-automatisierung.com/) angelehnt.

Diese Variante des original Styles https://github.com/klein0r/fhem-style-haus-automatisierung versucht einige Verbesserungen einzubringen, die im Originalstyle entweder aus Zeit- oder Stabilitätsgründen bisher nicht eingegangen sind. Zunächst sollte die allgemeine Empfehlung gelten, den Original-Thema zu benutzen und nicht diesen hier. Dieser hier ist instabiler.

## Installation

1. Hinzufügen des neuen Themes in Version 2

```
update add https://raw.githubusercontent.com/klein0r/fhem-style-haus-automatisierung/version-2/controls_ha_theme_mackshot.txt
update check ha_theme_mackshot
update all ha_theme_mackshot
```

2. Select Style -> hausautomatisierung_com-mackshot

3. Ein paar Anpassungen am Web-Device:

```
attr WEB JavaScripts codemirror/fhem_codemirror.js
attr WEB codemirrorParam { "theme": "blackboard", "lineNumbers":true, "lineWrapping": true, "height": "auto", "autocomplete": true }
attr WEB roomIcons Save.config:message_attention
```

Einmal speichern und neu laden - fertig.

## Entwicklungsumgebung aufsetzen

Siehe https://github.com/klein0r/fhem-style-haus-automatisierung

## Fehler melden

Fehler im original Style bitte [hier](https://github.com/klein0r/fhem-style-haus-automatisierung/issues) melden.
Fehler im angepassten Style bitte [hier](https://github.com/mackshot/fhem-style-haus-automatisierung/issues) melden.


## Vorschau

Siehe https://github.com/klein0r/fhem-style-haus-automatisierung

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
