//

export function hideTagToExcludeOr(feedParent, excludeList) {
  if (!feedParent) return;
  const childDivs = feedParent.querySelectorAll(
    ':scope > div:not(.exclude-so-hidden)'
  );

  if (!childDivs) return;
  if (excludeList.length === 0) return;

  excludeList = excludeList.map((word) => word.toLowerCase());

  console.log('hide OR EXCLUDE triggered');
  console.log('EXCLUDE LIST: ' + excludeList);

  function processDiv(div, excludeList, maxRetries = 2, currentRetry = 0) {
    const postCaptionElement = div.getElementsByClassName(
      'update-components-update-v2__commentary'
    )[0];
    const authorSloganElement = div.getElementsByClassName(
      'update-components-actor__description'
    )[0];

    // Check if retries have been exhausted
    if (currentRetry >= maxRetries) {
      console.log('Max retries reached.');
      // If both elements are not found after max retries, consider hiding the div based on existing logic
      if (!postCaptionElement && !authorSloganElement) {
        console.log('Elements not found, hiding div.');
        div.hidden = true;
        div.className = 'exclude-so-hidden or';
      }
      return;
    }

    if (postCaptionElement || authorSloganElement) {
      const postCaption = postCaptionElement
        ? postCaptionElement.textContent.trim().toLowerCase()
        : '';
      const authorSlogan = authorSloganElement
        ? authorSloganElement.textContent.trim().toLowerCase()
        : '';

      const combinedText = `${postCaption} ${authorSlogan}`.trim();

      let shouldHide = excludeList.some((word) => combinedText.includes(word));

      if (shouldHide) {
        div.hidden = true;
        div.className = 'exclude-so-hidden or';
        console.log('HIDING OR EXCLUDE');
        console.log(combinedText);
      } else {
        console.log('skip - not hiding or');
        console.log({ combinedText });
      }
    } else {
      // Retry after a delay if neither element is found yet
      setTimeout(
        () => processDiv(div, excludeList, maxRetries, currentRetry + 1),
        250
      );
    }
  }

  // Usage within hideTagToExcludeOr
  childDivs.forEach((div) => {
    processDiv(div, excludeList);
  });
}

export function hideTagToExcludeAnd(feedParent, excludeList) {
  if (!feedParent) return;

  const childDivs = feedParent.querySelectorAll(
    ':scope > div:not(.exclude-so-hidden)'
  );

  if (!childDivs) return;
  if (excludeList.length === 0) return;

  excludeList = excludeList.map((word) => word.toLowerCase());

  console.log('hide AND EXCLUDE triggered');
  console.log('EXCLUDE LIST: ' + excludeList);

  function processDiv(div, excludeList, maxRetries = 2, currentRetry = 0) {
    const postCaptionElement = div.getElementsByClassName(
      'update-components-update-v2__commentary'
    )[0];
    const authorSloganElement = div.getElementsByClassName(
      'update-components-actor__description'
    )[0];

    // Check if retries have been exhausted
    if (currentRetry >= maxRetries) {
      console.log('Max retries reached.');
      // If both elements are not found after max retries, consider hiding the div based on existing logic
      if (!postCaptionElement && !authorSloganElement) {
        console.log('Elements not found, hiding div.');
        div.hidden = true;
        div.className = 'exclude-so-hidden and';
      }
      return;
    }

    if (postCaptionElement || authorSloganElement) {
      const postCaption = postCaptionElement
        ? postCaptionElement.textContent.trim().toLowerCase()
        : '';
      const authorSlogan = authorSloganElement
        ? authorSloganElement.textContent.trim().toLowerCase()
        : '';

      const combinedText = `${postCaption} ${authorSlogan}`.trim();

      let shouldHide = excludeList.every((word) => combinedText.includes(word));

      if (shouldHide) {
        div.hidden = true;
        div.className = 'exclude-so-hidden and';
        console.log('HIDING AND EXCLUDE');
        console.log(combinedText);
      } else {
        console.log('skip - not hiding and');
        console.log({ combinedText });
      }
    } else {
      // Retry after a delay if neither element is found yet
      setTimeout(
        () => processDiv(div, excludeList, maxRetries, currentRetry + 1),
        250
      );
    }
  }

  // Usage within hideTagToExcludeAnd
  childDivs.forEach((div) => {
    processDiv(div, excludeList);
  });
}

// export function hideTagToExcludeAnd(feedParent, excludeList) {
//   if (!feedParent) return;

//   const childDivs = feedParent.querySelectorAll(
//     ':scope > div:not(.exclude-so-hidden)'
//   );

//   if (!childDivs) return;
//   if (excludeList.length === 0) return;

//   excludeList = excludeList.map((word) => word.toLowerCase());

//   console.log('hide AND EXCLUDE triggered');
//   console.log('EXCLUDE LIST: ' + excludeList);
//   //console.dir(childDivs);

//   childDivs.forEach((div) => {
//     const postCaptionElement = div.getElementsByClassName(
//       'update-components-update-v2__commentary'
//     )[0];
//     const authorSloganElement = div.getElementsByClassName(
//       'update-components-actor__description'
//     )[0];

//     const postCaption = postCaptionElement
//       ? postCaptionElement.textContent.trim().toLowerCase()
//       : null;
//     const authorSlogan = authorSloganElement
//       ? authorSloganElement.textContent.trim().toLowerCase()
//       : null;

//     if (!postCaption) {
//       console.log('postCaption not found');
//       return;
//     }

//     if (!authorSlogan) {
//       console.log('authorSlogan not found');
//       return;
//     }

//     let shouldHide = false;

//     const combinedText = `${postCaption} ${authorSlogan}`.trim().toLowerCase();

//     console.log(combinedText);

//     //every behaves differently than some
//     // when excludeList is empty, it will return true
//     //some will return false
//     if (
//       combinedText &&
//       excludeList.every((word) => combinedText.includes(word))
//     ) {
//       shouldHide = true;
//       // No break here since we need to check all words in the list
//     } else {
//       shouldHide = false;
//       // break; // If any word does not match, no need to hide
//     }
//     // }

//     if (shouldHide) {
//       div.hidden = true;
//       div.className = 'exclude-so-hidden and';
//       console.log('HIDING AND EXCLUDE');
//       console.log(combinedText);
//     } else {
//       console.log('skip - not hiding and');
//       console.log({ combinedText });
//     }
//   });
// }

export function showTagToExcludeAnd(feedParent) {
  if (!feedParent) return;

  const childDivs = feedParent.querySelectorAll(
    ':scope > div.exclude-so-hidden.and'
  );

  if (!childDivs) return;

  console.log('show AND EXCLUDE triggered');

  childDivs.forEach((div) => {
    console.log('DIV INDICATOR ##########');
    //console.log(div);
    console.log('########################');

    div.hidden = false;
    div.className = '';
    console.log('post UNHIDE AND EXCLUDE');
  });
}

export function showTagToExcludeOr(feedParent) {
  if (!feedParent) return;

  const childDivs = feedParent.querySelectorAll(
    ':scope > div.exclude-so-hidden.or'
  );

  if (!childDivs) return;

  console.log('show OR EXCLUDE triggered');

  childDivs.forEach((div) => {
    console.log('DIV INDICATOR ##########');
    //console.log(div);
    console.log('########################');

    div.hidden = false;
    div.className = '';
    console.log('post UNHIDE OR EXCLUDE');
  });
}
