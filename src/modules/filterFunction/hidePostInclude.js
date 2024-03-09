export function hideTagToIncludeOr(feedParent, includeList) {
  if (!feedParent) return;
  const childDivs = feedParent.querySelectorAll(
    ':scope > div:not(.not-include-so-hidden)'
  );

  if (!childDivs) return;
  if (includeList.length === 0) return;

  includeList = includeList.map((word) => word.toLowerCase());

  console.log('hide OR INCLUDE triggered');
  console.log('INCLUDE LIST: ' + includeList);
  //console.dir(childDivs);

  // childDivs.forEach((div) => {
  //console.log(div);

  // constupdate-components-actor__description postCaptionElement = div.getElementsByClassName(
  //   'update-components-update-v2__commentary'
  // )[0];
  // const authorSloganElement = div.getElementsByClassName(
  //   'update-components-actor__description'
  // )[0];

  // const postCaption = postCaptionElement
  //   ? postCaptionElement.textContent.trim().toLowerCase()
  //   : null;
  // const authorSlogan = authorSloganElement
  //   ? authorSloganElement.textContent.trim().toLowerCase()
  //   : null;

  // if (!postCaption) {
  //   console.log('postCaption not found');
  //   return;
  // }

  // if (!authorSlogan) {
  //   console.log('authorSlogan not found');
  //   return;
  // }

  // console.log('CHECKING POST: #################3');
  // console.log('authorSlogan: ' + authorSlogan);
  // console.log({ postCaption });

  function processDiv(div, includeList, maxRetries = 2, currentRetry = 0) {
    const postCaptionElement = div.getElementsByClassName(
      'update-components-update-v2__commentary'
    )[0];
    const authorSloganElement = div.getElementsByClassName(
      'update-components-actor__description'
    )[0];

    // Check if retries have been exhausted
    if (currentRetry >= maxRetries) {
      // If both elements are not found after max retries, hide the div
      console.log('Max retries reached, hiding div.');
      div.hidden = true;
      div.className = 'not-include-so-hidden or';
      return;
    }

    // Proceed if at least one element is found
    if (postCaptionElement || authorSloganElement) {
      const postCaption = postCaptionElement
        ? postCaptionElement.textContent.trim().toLowerCase()
        : '';
      const authorSlogan = authorSloganElement
        ? authorSloganElement.textContent.trim().toLowerCase()
        : '';

      // Combine texts if both are present, or use the one that is present
      const combinedText = `${postCaption} ${authorSlogan}`.trim();

      let shouldHide =
        !combinedText || includeList.some((word) => combinedText.includes(word))
          ? false
          : true;

      if (shouldHide) {
        div.hidden = true;
        div.className = 'not-include-so-hidden or';
        console.log('HIDING OR INCLUDE');
        console.log(combinedText);
      } else {
        console.log('skip - not hiding or');
        console.log({ combinedText });
      }
    } else {
      // Retry after a delay if neither element is found yet
      setTimeout(
        () => processDiv(div, includeList, maxRetries, currentRetry + 1),
        250
      );
    }
  }

  // Usage within hideTagToIncludeOr
  childDivs.forEach((div) => {
    processDiv(div, includeList);
  });

  //   let shouldHide = true;

  //   const combinedText = `${postCaption} ${authorSlogan}`.trim().toLowerCase();

  //   //every behaves differently than some
  //   // when includeList is empty, it will return true
  //   //some will return false
  //   if (
  //     combinedText &&
  //     includeList.some((word) => combinedText.includes(word))
  //   ) {
  //     shouldHide = false;
  //   }
  //   // }

  //   console.log('DIV INDICATOR ##########');
  //   //console.log(div);
  //   console.log('########################');

  //   if (shouldHide) {
  //     div.hidden = true;
  //     div.className = 'not-include-so-hidden or';
  //     console.log('HIDING OR INCLUDE ');
  //     console.log(combinedText);
  //   } else {
  //     console.log('skip - not hiding or');
  //     console.log({ combinedText });
  //   }
  // });
}

export function hideTagToIncludeAnd(feedParent, includeList) {
  if (!feedParent) return;

  const childDivs = feedParent.querySelectorAll(
    ':scope > div:not(.not-include-so-hidden)'
  );

  if (!childDivs) return;
  if (includeList.length === 0) return;

  includeList = includeList.map((word) => word.toLowerCase());

  console.log('hide AND INCLUDE triggered');
  console.log('INCLUDE LIST: ' + includeList);
  //console.dir(childDivs);

  function processDiv(div, includeList, maxRetries = 2, currentRetry = 0) {
    const postCaptionElement = div.getElementsByClassName(
      'update-components-update-v2__commentary'
    )[0];
    const authorSloganElement = div.getElementsByClassName(
      'update-components-actor__description'
    )[0];

    // Check if retries have been exhausted
    if (currentRetry >= maxRetries) {
      // If both elements are not found after max retries, hide the div
      console.log('Max retries reached, hiding div.');
      div.hidden = true;
      div.className = 'not-include-so-hidden and';
      return;
    }

    // Proceed if at least one element is found
    if (postCaptionElement || authorSloganElement) {
      const postCaption = postCaptionElement
        ? postCaptionElement.textContent.trim().toLowerCase()
        : '';
      const authorSlogan = authorSloganElement
        ? authorSloganElement.textContent.trim().toLowerCase()
        : '';

      // Combine texts if both are present, or use the one that is present
      const combinedText = `${postCaption} ${authorSlogan}`.trim();

      let shouldHide =
        !combinedText ||
        includeList.every((word) => combinedText.includes(word))
          ? false
          : true;

      if (shouldHide) {
        div.hidden = true;
        div.className = 'not-include-so-hidden and';
        console.log('HIDING AND INCLUDE');
        console.log(combinedText);
      } else {
        console.log('skip - not hiding and');
        console.log({ combinedText });
      }
    } else {
      // Retry after a delay if neither element is found yet
      setTimeout(
        () => processDiv(div, includeList, maxRetries, currentRetry + 1),
        250
      );
    }
  }

  // Usage within hideTagToIncludeAnd
  childDivs.forEach((div) => {
    processDiv(div, includeList);
  });

  // childDivs.forEach((div) => {
  //   const postCaptionElement = div.getElementsByClassName(
  //     'update-components-update-v2__commentary'
  //   )[0];
  //   const authorSloganElement = div.getElementsByClassName(
  //     'update-components-actor__description'
  //   )[0];

  //   const postCaption = postCaptionElement
  //     ? postCaptionElement.textContent.trim().toLowerCase()
  //     : null;
  //   const authorSlogan = authorSloganElement
  //     ? authorSloganElement.textContent.trim().toLowerCase()
  //     : null;

  //   if (!postCaption) {
  //     console.log('postCaption not found');
  //     return;
  //   }

  //   if (!authorSlogan) {
  //     console.log('authorSlogan not found');
  //     return;
  //   }

  //   let shouldHide = true;

  //   const combinedText = `${postCaption} ${authorSlogan}`.trim().toLowerCase();

  //   console.log(combinedText);

  //   //every behaves differently than some
  //   // when includeList is empty, it will return true
  //   //some will return false
  //   if (
  //     combinedText &&
  //     includeList.every((word) => combinedText.includes(word))
  //   ) {
  //     shouldHide = false;
  //     // No break here since we need to check all words in the list
  //   }

  //   if (shouldHide) {
  //     div.hidden = true;
  //     div.className = 'not-include-so-hidden and';
  //     console.log('HIDING AND INCLUDE');
  //     console.log(combinedText);
  //   } else {
  //     console.log('skip - not hiding and');
  //     console.log({ combinedText });
  //   }
  // });
}

export function showTagToIncludeAnd(feedParent) {
  if (!feedParent) return;

  const childDivs = feedParent.querySelectorAll(
    ':scope > div.not-include-so-hidden.and'
  );

  if (!childDivs) return;

  console.log('show AND INCLUDE triggered');

  childDivs.forEach((div) => {
    console.log('DIV INDICATOR ##########');
    //console.log(div);
    console.log('########################');

    div.hidden = false;
    div.className = '';
    console.log('post UNHIDE AND INCLUDE');
  });
}

export function showTagToIncludeOr(feedParent) {
  if (!feedParent) return;

  const childDivs = feedParent.querySelectorAll(
    ':scope > div.not-include-so-hidden.or'
  );

  if (!childDivs) return;

  console.log('show OR INCLUDE triggered');

  childDivs.forEach((div) => {
    console.log('DIV INDICATOR ##########');
    //console.log(div);
    console.log('########################');

    div.hidden = false;
    div.className = '';
    console.log('post UNHIDE OR INCLUDE');
  });
}
