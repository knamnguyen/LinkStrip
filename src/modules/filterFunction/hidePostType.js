export function hideAd(feedParent) {
  const childDivs = feedParent.querySelectorAll(
    ':scope > div:not(.promoted-hidden)'
  );
  if (!childDivs) return;

  childDivs.forEach((div) => {
    const links = div.getElementsByClassName(
      'app-aware-link  update-components-actor__sub-description-link'
    );

    if (!links) return;

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const ariaLabel = link.getAttribute('aria-label');
      if (ariaLabel && ariaLabel.includes('Promoted')) {
        div.className = 'promoted-hidden';
        div.hidden = true;
      }
    }
  });
}

export function showAd(feedParent) {
  const childDivs = feedParent.querySelectorAll(':scope > div.promoted-hidden');
  if (!childDivs) return;

  childDivs.forEach((div) => {
    div.hidden = false;
    div.className = '';
  });
}

export function hideCompany(feedParent) {
  //hide promoted and companies

  const childDivs = feedParent.querySelectorAll(
    ':scope > div:not(.company-hidden)'
  );
  if (!childDivs) return;

  childDivs.forEach((div) => {
    const links = div.getElementsByClassName(
      'app-aware-link update-components-actor__meta-link'
    );
    if (!links) return;

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const ariaLabel = link.getAttribute('aria-label');
      if (
        ariaLabel &&
        ariaLabel.endsWith('followers')
        // ariaLabel.includes('followers')
        // !ariaLabel.includes('Promoted')
      ) {
        div.hidden = true;
        div.className = 'company-hidden';
      }
    }
  });
}

export function showCompany(feedParent) {
  const childDivs = feedParent.querySelectorAll(':scope > div.company-hidden');
  if (!childDivs) return;

  childDivs.forEach((div) => {
    div.hidden = false;
    div.className = '';
  });
}

export function hideBanner(feedParent) {
  const postContainers = feedParent.querySelectorAll(
    '.feed-shared-update-v2:not(.banner-hidden)'
  );
  if (!postContainers) return;

  postContainers.forEach((post) => {
    if (!post.ariaLabel) return;
    if (post.ariaLabel.includes('Feed post from selected notification')) {
      post.hidden = true;
      post.classList.add('banner-hidden');
    }
  });
}

export function showBanner(feedParent) {
  // const postContainers = feedParent.getElementsByClassName('banner-hidden');
  const postContainers = feedParent.querySelectorAll(
    '.feed-shared-update-v2.banner-hidden'
  );

  if (!postContainers) return;

  postContainers.forEach((post) => {
    //does log out well
    console.log('SHOW BANNER: ' + post.ariaLabel + ' ' + post.className);

    post.removeAttribute('hidden');
    post.classList.remove('banner-hidden');
  });
}
