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
attr WEB JavaScripts codemirror/fhem_codemirror.js hausautomatisierung-com/custom.js
attr WEB roomIcons Save.config:message_attention
```

Einmal speichern und neu laden - fertig.

## Vorschau

![FHEM Style](https://raw.githubusercontent.com/klein0r/fhem-style-haus-automatisierung/master/preview.png)

## Smart-Home-Icons:

Thanks @ https://dribbble.com/shots/2084609-Smart-House-Icon-Set-Free