---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
summary: ""                  # eine Zeile für die Liste
# expiryDate: 2026-12-31     # optional: danach nur noch im Archiv
draft: true
---
Write your news here.
