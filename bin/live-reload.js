// Utilise l'origine actuelle (desktop ou mobile sur le LAN) pour l'EventSource
new EventSource(`${location.origin}/esbuild`).addEventListener('change', () => location.reload());
