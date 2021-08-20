var EM_DEFAULT_PAYLOAD = {
  customer_touchpoints: '',
  discount_font_color: '#000000',
  email_cta_label: 'Continue',
  sms_cta_label: 'Continue',
  cta_background_color: '#000000',
  popup_background_color: '#FFFFFF',
  popup_background_opacity: 100,
  popup_logo_size: 75,
  popup_logo_position: 'top',
  display_type: 'mobile_two_step',
  include_pages: [],
  exclude_pages: [],
};

var EM = {
  // discount types
  FIXED_AMOUNT_DISCOUNT: 'fixed_amount',
  FREE_SHIPPING_DISCOUNT: 'free_shipping',
  PERCENT_DISCOUNT: 'percent',
  CUSTOM: 'custom',

  // delay types
  SECONDS_DELAY: 'seconds',

  // timingType
  IMMEDIATELY_TIMING: 'immediately',
  DELAY_TIMING: 'delay',

  // session
  STORAGE_PREFIX: 'popups_',
  SESSION_PREFIX: 'popups_sessioned_',
  SESSION_KEY: 'popup_session',
  SESSION_EXPIRES: 30 * 60 * 1000, // 30 mins in miliseconds
};

var EM_DISPLAY_TYPES = {
  mobile_two_step: {
    displays: ['mobile'],
    steps: 2,
  },
  mobile_one_step: {
    displays: ['mobile'],
  },
  desktop: {
    displays: ['desktop'],
  },
  mobile_and_desktop: {
    displays: ['mobile', 'desktop'],
  },
};

var initInterval = setInterval(() => {
  if (document.readyState == 'complete') {
    initApp();
    clearInterval(initInterval);
  }
}, 500);

function initApp() {
  bootstrapConstants();
  getPopups();
}

function bootstrapConstants() {
  popup = [];

  let scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    if (~scripts[i].src.indexOf('/emotive-popup/')) {
      script = scripts[i];
      break;
    }
  }

  scriptsInjection();
  setSessionHandlingEvents();
}

function isEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function getDeviceType() {
  var a = navigator.userAgent || navigator.vendor || window.opera;
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
    a,
  ) ||
    // eslint-disable-next-line no-useless-escape
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4),
    )
    ? 'mobile'
    : 'desktop';
}

function isCorrectDeviceForPopup(popup) {
  var deviceType = getDeviceType();
  var displayType = EM_DISPLAY_TYPES[popup.display_type];
  return displayType && ~displayType.displays.indexOf(deviceType);
}

function isCorrectPageForPopup(popup) {
  var isSpecificUrlsCheck =
    popup.include_pages.length || popup.exclude_pages.length;
  if (isSpecificUrlsCheck) return matchUrl(popup, window.location.href);

  return !(
    ~window.location.pathname.indexOf('cart') ||
    ~window.location.pathname.indexOf('checkout')
  );
}

function isPermanentlySeen(identifier) {
  return (
    window.localStorage.getItem(`${EM.STORAGE_PREFIX}${identifier}`) == 'true'
  );
}

function isSessionSeen(identifier) {
  let elem = window.localStorage.getItem(`${EM.SESSION_PREFIX}${identifier}`);
  let session = window.localStorage.getItem(EM.SESSION_KEY);

  if (Date.now() - Number(session) > EM.SESSION_EXPIRES) {
    // expired
    let localStorageKeys = Object.keys(window.localStorage);

    for (let i = 0; i < localStorageKeys.length; i++) {
      if (~localStorageKeys[i].indexOf(EM.SESSION_PREFIX)) {
        window.localStorage.removeItem(localStorageKeys[i]);
      }
    }

    handleInteraction(true);
    return false;
  } else {
    // alive
    return elem == 'true' ? true : false;
  }
}

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
}

function getScriptQueryParams() {
  let scriptURL = null;

  if (script.src) {
    scriptURL = script.src;
    let tempUrlArr = scriptURL.split('?');
    let params = tempUrlArr[1].split('&');
    let paramsObj = {};
    for (let i = 0; i < params.length; i++) {
      let tempParam = params[i].split('=');
      paramsObj[tempParam[0]] = tempParam[1];
    }

    if (!paramsObj.hasOwnProperty('api')) {
      tempUrlArr = scriptURL.split('/');
      paramsObj.api = tempUrlArr[0] + '//' + tempUrlArr[2];
    }

    if (!paramsObj.hasOwnProperty('brand')) {
      console.warn('No brand ID specified');
      paramsObj.brand = null;
    }

    return paramsObj;
  }
}

function getBrandId() {
  return getScriptQueryParams().brand;
}

function getCurrentDomain() {
  return window.location.origin + '/';
}

function getApiDomain() {
  let apiUrl = getScriptQueryParams().api;
  if (apiUrl.substr(apiUrl.length - 1) !== '/') {
    apiUrl += '/';
  }
  return apiUrl;
}

// it returns the path with domain.
function getStaticScriptPath() {
  if (script.src) {
    let path = script.src.split('?')[0]; // remove any ?query
    let mydir = path.split('/').slice(0, -1).join('/'); // remove last filename part of path

    return mydir + '/';
  }

  return '';
}

function getDiscountSymbol(type, amount) {
  switch (type) {
    case EM.FIXED_AMOUNT_DISCOUNT:
      return `$${amount} OFF`;
    case EM.FREE_SHIPPING_DISCOUNT:
      return `FREE SHIPPING`;
    case EM.PERCENT_DISCOUNT:
    default:
      return `${amount}% OFF`;
  }
}

function showPopup(popupContainer) {
  popupContainer.classList.add('show-up');
}

function closePopup(popupContainer) {
  popupContainer.classList.add('remove-popup');
  setTimeout(() => {
    popupContainer.classList.remove('show-up', 'remove-popup');
  }, 500);
}

function handleInteraction(hardRefresh) {
  let session = window.localStorage.getItem(EM.SESSION_KEY);

  if (Date.now() - session <= EM.SESSION_EXPIRES || hardRefresh) {
    window.localStorage.setItem(EM.SESSION_KEY, Date.now());
  }
}

function setSessionHandlingEvents() {
  handleInteraction();
  ['mousemove', 'scroll', 'keydown', 'click', 'touchstart'].forEach(
    (eventName) => document.body.addEventListener(eventName, handleInteraction),
  );
  window.addEventListener('popup:draw', (ev) => drawPopup(ev.detail));
}

function setEventHandlers(popupContainer, popupIdentifier, smsLink) {
  popupContainer
    .querySelector('.close-button')
    .addEventListener('click', () => {
      closePopup(popupContainer);
      window.localStorage.setItem(
        `${EM.SESSION_PREFIX}${popupIdentifier}`,
        true,
      );
    });

  let emailComponent = popupContainer.querySelector('.form-email-button');
  if (emailComponent) {
    let emailInput = popupContainer.querySelector('.input-email');

    emailComponent.addEventListener('click', () => {
      if (isEmail(emailInput.value)) {
        httpRequest(
          `${getApiDomain()}subscriber_engine/api/v1/email-subscribe/`,
          'post',
          {
            subscriber_source: popupIdentifier,
            email: emailInput.value,
          },
          {
            headers: {
              'Content-type': 'application/json;charset=UTF-8',
            },
          },
        );
        emailInput.classList.remove('error');
      } else {
        emailInput.classList.add('error');
        return;
      }

      if (!smsLink) {
        window.localStorage.setItem(
          `${STORAGE_PREFIX}${popupIdentifier}`,
          true,
        );
        closePopup(popupContainer);
      } else {
        popupContainer.querySelector('.forms').classList.add('transition');
        popupContainer.querySelector('.forms').style.transform =
          'translateX(calc(-100% - 20pt))'; /// 20pt is a margin of the .popup-container
      }
    });
  }

  let submitButton = popupContainer.querySelector('.form-sms-button');
  if (submitButton) {
    submitButton.addEventListener('click', () => {
      if (submitButton.classList.contains('busy')) return;
      if (submitButton.classList.contains('done')) return;
      submitButton.classList.add('busy');
      submitButton.innerHTML = '<div class="loader"></span>';
      if (
        ~['mobile_and_desktop', 'mobile_one_step', 'desktop'].indexOf(
          popupContainer.popup.display_type,
        )
      ) {
        let smsInput = popupContainer.querySelector('.input-phone-number');

        httpRequest(
          `${getApiDomain()}subscriber_engineapi/opt_in_user/`,
          'post',
          {
            brand_id: getBrandId(),
            cell_number: smsInput.value,
            _subscriber_engine_source_type: 'EMOTIVE_POPUP',
            api_key: popupContainer.popup.subscribe_identifier,
          },
          {
            headers: {
              'Content-type': 'application/json;charset=UTF-8',
            },
          },
          (err) => {
            submitButton.classList.add('done', err ? 'error' : 'success');
            submitButton.innerHTML =
              'Thanks for subscribing! We sent you a text!';
            submitButton.classList.remove('busy');
          },
        );
        return;
      } else {
        window.open(smsLink, '_blank').focus();
      }
      window.localStorage.setItem(
        `${EM.STORAGE_PREFIX}${popupIdentifier}`,
        true,
      );
      closePopup(popupContainer);
    });
  }
}

function scriptsInjection() {
  let head = document.getElementsByTagName('head')[0];

  [
    `${getStaticScriptPath()}popup.css`,
    `https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css`,
    `https://fonts.googleapis.com/css?family=Roboto`,
  ].forEach((href) => {
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    link.media = 'all';
    head.appendChild(link);
  });
}

function objectAssign(target, assigned) {
  Object.keys(assigned).forEach((key) => {
    target[key] = assigned[key];
  });
}

function toAlphaHex(number) {
  return `00${Math.floor((255 * number) / 100)
    .toString(16)
    .toUpperCase()}`.substr(-2);
}

function toStyleString(style) {
  if (typeof style !== 'object') return '';
  return Object.keys(style)
    .map((key) => `${key}: ${style[key]};`)
    .join('');
}

function addElement(popupSettings) {
  var deviceType = getDeviceType();
  var displayType = EM_DISPLAY_TYPES[popupSettings.display_type];

  let id = popupSettings.id;
  let customer_touchpoints = popupSettings.customer_touchpoints;
  let discount = popupSettings.discount;
  let discount_type = popupSettings.discount_type;
  let discount_custom = popupSettings.discount_custom;
  let link = popupSettings.link;
  let mobile_templates = popupSettings.mobile_templates;
  let name = popupSettings.name;
  let popup_background_color = `${
    popupSettings.popup_background_color
  }${toAlphaHex(popupSettings.popup_background_opacity)}`;
  let popup_logo = popupSettings.popup_logo;
  let timing_delay_amount = popupSettings.timing_delay_amount; // number of timing_delay_type
  let timing_delay_type = popupSettings.timing_delay_type; // 'seconds'
  let timing_type = popupSettings.timing_type; // 'immediately', 'delay'

  let popupContainer = document.createElement('div');
  popupContainer.popup = popupSettings;
  popup.push(popupContainer);
  popupContainer.classList.add(
    'popup',
    mobile_templates,
    `device-${deviceType}`,
  );

  // HTML Builder

  var parseClassName = (className) =>
    className
      ? ` class="${
          typeof className === 'string'
            ? className
            : className
                .filter((className) => typeof className === 'string')
                .join(' ')
        }"`
      : '';

  var $div = ({ className, style }, children) =>
    `<div${parseClassName(className)} style="${toStyleString(
      style,
    )}">${children.join('')}</div>`;

  var $span = ({ className }, children) =>
    `<span${parseClassName(className)}>${(children || []).join('')}</span>`;

  var $ctaButton = ({ className }, children) =>
    `<button${parseClassName([
      'button btn btn-dark',
      className,
    ])} style="background-color: ${
      popupSettings.cta_background_color
    }">${children.join('')}</button>`;

  var $anchor = (href, children) =>
    `<a target="_blank" href=${href}>${children.join('')}</a>`;

  var $input = ({ className, placeholder, value }) =>
    `<input${parseClassName(className)} type="text" placeholder="${
      placeholder || ''
    }" value="${value || ''}" />`;

  // Components

  var logo = $div({ className: `logo ${popupSettings.popup_logo_position}` }, [
    popup_logo
      ? `<img src="${popup_logo}" style="width: ${popupSettings.popup_logo_size}%" alt="${name}" />`
      : '',
  ]);

  var smsDisclaimer = $span({ className: 'sms-disclaimer' }, [
    `
      By signing up via text, you agree to receive recurring automated promotional and
      personalized marketing text messages(e.g.cart reminders) at the cell number used when
      signing up. Consent is not a condition of any purchase. Reply STOP to cancel. Msg
      frequency varies. Msg and data rates may apply.
    `,
    $span({}, ['View ']),
    $anchor(`${getCurrentDomain()}policies/terms-of-service`, ['TERMS']),
    $span({}, [' and ']),
    $anchor(`${getCurrentDomain()}policies/privacy-policy`, ['PRIVACY POLICY']),
    $span({}, ['.']),
  ]);

  var isFreeShipping = discount_type === EM.FREE_SHIPPING_DISCOUNT;
  var isCustomIncentive = discount_type === EM.CUSTOM;

  var stepsCount = displayType.steps || 1;
  var steps = [[]];

  var smsLastButton = $ctaButton({ className: 'form-sms-button' }, [
    popupSettings.sms_cta_label,
  ]);

  var emailCtaButton = $ctaButton({ className: 'form-email-button' }, [
    popupSettings.email_cta_label,
  ]);

  if (~customer_touchpoints.indexOf('email')) {
    steps[0].push(
      $input({
        className: 'input-field input-email',
        placeholder: 'Your email',
      }),
    );
    if (stepsCount > 1) {
      steps[0].push(emailCtaButton);
    }
  }

  if (~customer_touchpoints.indexOf('sms') && link) {
    if (stepsCount > 1) {
      steps.push([]);
      steps[1].push(smsDisclaimer);
    } else {
      steps[0].push(
        $input({
          className: 'input-field input-phone-number',
          placeholder: 'Your phone number',
        }),
      );
    }
  }

  steps[steps.length - 1].push(smsLastButton);
  if (~customer_touchpoints.indexOf('sms') && link && stepsCount === 1) {
    steps[0].push(smsDisclaimer);
  }
  popupContainer.innerHTML = $div(
    {
      className: 'popup-container',
      style: { 'background-color': popup_background_color },
    },
    [
      $span({ className: ['close-button', 'fa', 'fa-times'] }),
      $div({ className: 'center-content' }, [
        $div({ className: 'content' }, [
          popupSettings.popup_logo_position === 'top' ? logo : '',
          $div(
            {
              className: 'discount',
              style: { color: popupSettings.discount_font_color },
            },
            [
              $div(
                {
                  className: `head ${isFreeShipping && 'd-none'} ${
                    isCustomIncentive && 'd-none'
                  }`,
                },
                ['Unlock'],
              ),
              $div({ className: `numbers ${isCustomIncentive && 'd-none'}` }, [
                getDiscountSymbol(discount_type, discount),
              ]),
              $div(
                {
                  className: [
                    'foot',
                    isFreeShipping && 'd-none',
                    isCustomIncentive && 'd-none',
                  ],
                },
                ['Your order'],
              ),
              $div(
                {
                  className: [
                    isCustomIncentive && 'custom-incentive',
                    !isCustomIncentive && 'd-none',
                  ],
                },
                [
                  discount_custom &&
                    discount_custom.replace(/(\r\n|\n|\r)\1/gm, `<br>`),
                ],
              ),
              popupSettings.popup_logo_position === 'middle' ? logo : '',
            ],
          ),
        ]),
        $div({ className: 'forms' }, [
          ...steps.map((children) => $div({ className: 'step' }, children)),
        ]),
        popupSettings.popup_logo_position === 'bottom' ? logo : '',
      ]),
    ],
  );

  document.body.appendChild(popupContainer);

  let delay = null;
  switch (timing_delay_type) {
    case EM.SECONDS_DELAY:
      delay = timing_delay_amount * 1000;
      break;
    default:
      delay = timing_delay_amount;
  }

  switch (timing_type) {
    case EM.DELAY_TIMING:
      setTimeout(() => showPopup(popupContainer), delay);
      break;
    case EM.IMMEDIATELY_TIMING:
    default:
      showPopup(popupContainer);
  }

  setEventHandlers(popupContainer, id, link);
}

function httpRequest(endpoint, method, body, settings, callback) {
  let xhr = new XMLHttpRequest();

  let url = new URL(endpoint);

  if (settings && typeof settings === 'object') {
    let queryParams = settings.queryParams;
    let headers = settings.headers;

    if (
      queryParams &&
      typeof queryParams === 'object' &&
      Object.keys(queryParams).length > 0
    ) {
      let queryKeys = Object.keys(queryParams);
      for (let qindex = 0; qindex < queryKeys.length; qindex++) {
        let key = queryKeys[qindex];
        let value = queryParams[key];
        url.searchParams.set(key, value);
      }
    }
    xhr.open(method.toUpperCase(), url, true);

    if (
      headers &&
      typeof headers === 'object' &&
      Object.keys(headers).length > 0
    ) {
      let headerKeys = Object.keys(headers);
      for (let hindex = 0; hindex < headerKeys.length; hindex++) {
        let key = headerKeys[hindex];
        let value = headers[key];
        xhr.setRequestHeader(key, value);
      }
    }
  } else {
    xhr.open(method.toUpperCase(), url, true);
  }

  xhr.responseType = 'json';
  xhr.send(JSON.stringify(body));

  xhr.onload = function () {
    if (xhr.status >= 400) {
      if (isFunction(callback)) callback(new Error(xhr.statusText));
      return;
    }

    var responseObj = xhr.response;
    if (settings && isFunction(settings)) {
      settings(responseObj);
    } else if (callback && isFunction(callback)) {
      callback(null, responseObj);
    }
  };
}

function getPopups() {
  httpRequest(
    `${getApiDomain()}subscriber_engine/api/v1/popups/?brand_id=${getBrandId()}`,
    'get',
    null,
    (response) => {
      try {
        drawPopups(response);
      } catch (e) {
        console.error(e);
      }
    },
  );
}

function matchRule(rule, url) {
  switch (rule.cond) {
    case 'equals_to':
      return url === rule.url;
    case 'starts_with':
      return url.substr(0, rule.url.length) === rule.url;
    case 'ends_with':
      return url.substr(-rule.url.length) === rule.url;
    case 'contains':
      return url.indexOf(rule.url) >= 0;
    default:
      return false;
  }
}

function matchUrl(popup, url) {
  var excludePages = popup.exclude_pages.filter((rule) => !!rule.url);
  var includePages = popup.include_pages.filter((rule) => !!rule.url);

  var excluded = excludePages.reduce(
    (excluded, rule) => excluded || matchRule(rule, url),
    false,
  );
  if (excluded) return false;
  if (!includePages.length) return true;
  var included = includePages.reduce(
    (included, rule) => included || matchRule(rule, url),
    false,
  );
  return included;
}

function drawPopups(popups) {
  if (!popups || !Array.isArray(popups)) {
    console.log('[emotive] No popups found for rendering');
    return;
  }
  // TODO: when 'timing_delay_type' will contain other values than 'seconds'
  // TODO: that would be easier to convert minutes to seconds here before sorting and rendering

  // TODO: this logic draw all popups that was responded from server and sorted it by the time of displaying.
  // TODO: This logic might be returned back in further steps.
  /* popups.sort((a, b) => {
    if (a.timing_type === IMMEDIATELY_TIMING || b.timing_type === IMMEDIATELY_TIMING) {
      return a.timing_type === IMMEDIATELY_TIMING && b.timing_type !== IMMEDIATELY_TIMING ? 1 : -1;
    }

    return b.timing_delay_amount - a.timing_delay_amount;
  });

  for (let i = 0; i < popups.length; i++) {
    if (popups[i] && !isPermanentlySeen(popups[i].subscribe_identifier) && !isSessionSeen(popups[i].subscribe_identifier)) {
      addElement(popups[i]);
    }
  } */

  var lastPopup = popups[0];
  drawPopup(lastPopup);
}

function drawPopup(lastPopup) {
  if (!lastPopup) {
    console.log('[emotive] No popups found for rendering');
    return;
  }
  var payload = {};
  objectAssign(payload, EM_DEFAULT_PAYLOAD);
  objectAssign(payload, lastPopup);
  if (
    payload &&
    isCorrectDeviceForPopup(payload) &&
    isCorrectPageForPopup(payload) &&
    !isPermanentlySeen(payload.id) &&
    !isSessionSeen(payload.id)
  ) {
    addElement(payload);
  }
}
