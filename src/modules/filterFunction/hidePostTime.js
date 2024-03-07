export function hideTime60min(feedParent) {
  if (!feedParent) return;

  const childDivs = feedParent.querySelectorAll(
    ':scope > div:not(.not-60m-so-hidden)'
  );

  childDivs.forEach((div) => {
    // const links = Array.from(div.getElementsByClassName('app-aware-link'));
    const links = div.getElementsByClassName(
      'app-aware-link update-components-actor__sub-description-link'
    );

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const ariaLabel = link.getAttribute('aria-label');
      if (
        ariaLabel &&
        (ariaLabel.includes('now') ||
          (ariaLabel.includes('m') && ariaLabel !== 'Promoted'))
      ) {
        // If the condition is true, the div remains visible
      } else {
        // Otherwise, hide the div by setting hidden property to true
        div.className = 'not-60m-so-hidden';
        div.hidden = true;
      }
    }
  });
}

export function showTime60min(feedParent) {
  if (!feedParent) return;

  const childDivs = feedParent.querySelectorAll(
    ':scope > div.not-60m-so-hidden'
  );

  childDivs.forEach((div) => {
    if (div.className === 'not-60m-so-hidden') {
      div.hidden = false;
      div.className = '';
    }
  });
}

export function hideTime12h(feedParent) {
  if (!feedParent) return;

  const childDivs = feedParent.querySelectorAll(
    ':scope > div:not(.not-12h-so-hidden)'
  );

  childDivs.forEach((div) => {
    // const links = Array.from(div.getElementsByClassName('app-aware-link'));
    const links = div.getElementsByClassName(
      'app-aware-link update-components-actor__sub-description-link'
    );

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const ariaLabel = link.getAttribute('aria-label');

      var timeNum = ariaLabel.match(/\d+(\.\d+)?/g);

      if (timeNum) {
        timeNum = timeNum.map(Number)[0];
      } else {
        timeNum = 0;
      }

      if (
        ariaLabel &&
        (ariaLabel.includes('now') ||
          (ariaLabel.includes('m') && ariaLabel !== 'Promoted') ||
          (ariaLabel.includes('h') && timeNum < 12))
      ) {
        // If the condition is true, the div remains visible
      } else {
        // Otherwise, hide the div by setting hidden property to true
        div.hidden = true;
        div.className = 'not-12h-so-hidden';
      }
    }
  });
}

export function showTime12h(feedParent) {
  const childDivs = feedParent.querySelectorAll(
    ':scope > div.not-12h-so-hidden'
  );
  if (!childDivs) return;

  childDivs.forEach((div) => {
    if (div.className === 'not-12h-so-hidden') {
      div.hidden = false;
      div.className = '';
    }
  });
}

export function hideTime1day(feedParent) {
  const childDivs = feedParent.querySelectorAll(
    ':scope > div:not(.not-24h-so-hidden)'
  );
  if (!childDivs) return;

  childDivs.forEach((div) => {
    // const links = Array.from(div.getElementsByClassName('app-aware-link'));
    const links = div.getElementsByClassName(
      'app-aware-link update-components-actor__sub-description-link'
    );
    if (!links) return;

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const ariaLabel = link.getAttribute('aria-label');

      var timeNum = ariaLabel.match(/\d+(\.\d+)?/g);

      if (timeNum) {
        timeNum = Number(timeNum[0]);
      } else {
        timeNum = 0;
      }

      if (
        (ariaLabel &&
          (ariaLabel.includes('now') ||
            (ariaLabel.includes('m') && ariaLabel !== 'Promoted') ||
            (ariaLabel.includes('h') && timeNum < 24))) ||
        (ariaLabel.includes('d') && timeNum <= 1)
      ) {
        // If the condition is true, the div remains visible
      } else {
        // Otherwise, hide the div by setting hidden property to true
        div.hidden = true;
        div.className = 'not-24h-so-hidden';
      }
    }
  });
}

export function showTime1day(feedParent) {
  const childDivs = feedParent.querySelectorAll(
    ':scope > div.not-24h-so-hidden'
  );
  if (!childDivs) return;

  childDivs.forEach((div) => {
    if (div.className === 'not-24h-so-hidden') {
      div.hidden = false;
      div.className = '';
    }
  });
}
