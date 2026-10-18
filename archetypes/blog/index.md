---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
summary: ""                  # ein Satz für Übersicht und Link-Vorschau
authors: []                  # z. B. ["sam-patel"] (Ordnername in content/authors/) oder freier Name
tags: []                     # z. B. ["beginners", "swim"]
# preview: "vorschaubild.jpg"   # optional: Bild für Übersicht, Startseite und Link-Vorschau (Datei im selben Ordner)
draft: true                  # true = nicht veröffentlicht; zum Veröffentlichen auf false setzen
---
Write your post here. Put photos in this folder and place them in the text with the photo shortcode.
