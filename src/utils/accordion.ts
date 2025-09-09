export function initAccordionToggle() {
  const plusSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 19.5V4.5M4.5 12H19.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
  const minusSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4.5 12L19.5 12" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>';

  // Délégation: gère les éléments présents et futurs
  document.addEventListener('click', (event) => {
    const target = event.target as Element | null;
    if (!target) return;
    const trigger = target.closest('.fs_accordion_arrow-wrapper') as HTMLElement | null;
    if (!trigger) return;

    // Trouve le header puis le sibling direct contenu
    const header = trigger.closest('.fs_accordion_header') as HTMLElement | null;
    let content: HTMLElement | null = null;
    if (
      header &&
      header.nextElementSibling instanceof HTMLElement &&
      header.nextElementSibling.matches('.fs_accordion_content')
    ) {
      content = header.nextElementSibling as HTMLElement;
    }
    // Fallback si structure différente
    if (!content) {
      const container = (trigger.closest('.fs_accordion') ||
        trigger.closest('.fs_accordion_item') ||
        document) as Element;
      content = container.querySelector<HTMLElement>('.fs_accordion_content');
    }
    if (!content) return;

    // Détecte l'état visible/hidden de manière robuste
    const computed = getComputedStyle(content);
    const isHidden = computed.display === 'none' || content.offsetParent === null;
    const nextDisplay = isHidden ? 'block' : 'none';
    content.style.display = nextDisplay;

    // Accessibilité
    const expanded = nextDisplay === 'block';
    trigger.setAttribute('aria-expanded', String(expanded));
    if (header) header.setAttribute('aria-expanded', String(expanded));
    content.setAttribute('aria-hidden', String(!expanded));

    // Swap du SVG (plus ↔ moins)
    const svgHolder = trigger.querySelector<HTMLElement>('.fs_accordion_show-svg');
    if (svgHolder) {
      svgHolder.innerHTML = expanded ? minusSvg : plusSvg;
    }
  });
}
