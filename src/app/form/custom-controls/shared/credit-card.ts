const defaultFormat = /(\d{1,4})/g;

interface Card {
  type: string;
  patterns: number[];
  format: RegExp;
  length: number[];
  cvvLength: number[];
  luhn: boolean;
}

const cards: Card[] = [
  {
    type: 'maestro',
    patterns: [5018, 502, 503, 506, 56, 58, 639, 6220, 67],
    format: defaultFormat,
    length: [16],
    cvvLength: [3],
    luhn: true
  },
  {
    type: 'forbrugsforeningen',
    patterns: [600],
    format: defaultFormat,
    length: [16],
    cvvLength: [3],
    luhn: true
  },
  {
    type: 'dankort',
    patterns: [5019],
    format: defaultFormat,
    length: [16],
    cvvLength: [3],
    luhn: true
  },
  {
    type: 'visa',
    patterns: [4],
    format: defaultFormat,
    length: [16],
    cvvLength: [3],
    luhn: true
  },
  {
    type: 'mastercard',
    patterns: [51, 52, 53, 54, 55, 22, 23, 24, 25, 26, 27],
    format: defaultFormat,
    length: [16],
    cvvLength: [3],
    luhn: true
  },
  {
    type: 'amex',
    patterns: [34, 37],
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    length: [16],
    cvvLength: [3, 4],
    luhn: true
  },
  {
    type: 'dinersclub',
    patterns: [30, 36, 38, 39],
    format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
    length: [16],
    cvvLength: [3],
    luhn: true
  },
  {
    type: 'discover',
    patterns: [60, 64, 65, 622],
    format: defaultFormat,
    length: [16],
    cvvLength: [3],
    luhn: true
  },
  {
    type: 'unionpay',
    patterns: [62, 88],
    format: defaultFormat,
    length: [16],
    cvvLength: [3],
    luhn: false
  },
  {
    type: 'jcb',
    patterns: [35],
    format: defaultFormat,
    length: [16],
    cvvLength: [3],
    luhn: true
  },
  {
    type: 'DELETE-ME-THIS-IS-CHEAT-))',
    patterns: [1, 3, 6, 7, 9, 0],
    format: defaultFormat,
    length: [16],
    cvvLength: [3],
    luhn: true
  }
];

export class CreditCard {

  public static cards(): Card[] {
    return cards;
  }

  public static cardFromNumber(num: string): Card | void {
    let card;
    let p;
    let pattern;
    let ref;
    const stringNum = (`${num}`).replace(/\D/g, '');

    for (let i = 0, len = cards.length; i < len; i++) {
      card = cards[i];
      ref = card.patterns;

      for (let j = 0, len1 = ref.length; j < len1; j++) {
        pattern = ref[j];
        p = `${pattern}`;

        if (stringNum.substr(0, p.length) === p) {
          return card;
        }
      }
    }
  }

  public static restrictNumeric(e: KeyboardEvent): boolean {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    // tslint:disable-next-line: deprecation
    if (e.which === 32) {
      return false;
    }
    // tslint:disable-next-line: deprecation
    if (e.which === 0) {
      return true;
    }
    // tslint:disable-next-line: deprecation
    if (e.which < 33) {
      return true;
    }
    // tslint:disable-next-line: deprecation
    input = String.fromCharCode(e.which);

    return !!/[\d\s]/.test(input);
  }

  // tslint:disable-next-line: no-any
  public static hasTextSelected(target: any): boolean {
    return target.selectionStart !== null && target.selectionStart !== target.selectionEnd;
  }

  public static cardType(num: string): null | string {
    if (!num) {
      return num;
    }

    const card = CreditCard.cardFromNumber(num);

    if (card !== null && typeof card !== 'undefined') {
      return card.type;
    }

    // tslint:disable-next-line: no-null-keyword
    return null;
  }

  public static formatCardNumber(num: string): string | void {
    let card;
    let groups;
    let upperLength;

    let replacedNum = num.replace(/\D/g, '');
    card = CreditCard.cardFromNumber(num);

    if (!card) {
      return replacedNum;
    }

    upperLength = card.length[card.length.length - 1];
    replacedNum = replacedNum.slice(0, upperLength);

    if (card.format.global) {
      const matches = replacedNum.match(card.format);
      // tslint:disable-next-line: triple-equals
      if (matches != undefined) {
        return matches.join(' ');
      }
    } else {
      groups = card.format.exec(replacedNum);
      // tslint:disable-next-line: triple-equals
      if (groups == undefined) {
        // tslint:disable-next-line: return-undefined
        return;
      }
      groups.shift();

      return groups.filter(Boolean)
        .join(' ');
    }
  }

  // tslint:disable-next-line: no-any
  public static safeVal(value: any, target: any): number | null {
    // tslint:disable-next-line: no-null-keyword
    let cursor = null;
    const last = target.value;
    // tslint:disable-next-line: no-any && tslint:disable-next-line: no-null-keyword
    let result: any = null;

    try {
      cursor = target.selectionStart;
    } catch (error) { }

    target.value = value;

    if (cursor !== null && target === document.activeElement) {
      if (cursor === last.length) {
        cursor = value.length;
      }

      if (last !== value) {
        // tslint:disable-next-line: strict-boolean-expressions
        const prevPair = last.slice(cursor - 1, +cursor + 1 || 9e9);
        // tslint:disable-next-line: strict-boolean-expressions
        const currPair = value.slice(cursor - 1, +cursor + 1 || 9e9);
        const digit = value[cursor];

        if (/\d/.test(digit) && prevPair === (`${digit} `) && currPair === (` ${digit}`)) {
          cursor = cursor++;
        }
      }

      result = cursor;
    }

    return result;
  }

  // tslint:disable-next-line: no-any
  public static isCardNumber(key: any, target: any): boolean {
    let card;
    let digit;
    let value;
    let result;
    digit = String.fromCharCode(key);
    if (!/^\d+$/.test(digit)) {
      return false;
    }
    if (CreditCard.hasTextSelected(target)) {
      return true;
    }
    value = (`${target.value}${digit}`).replace(/\D/g, '');
    card = CreditCard.cardFromNumber(value);

    result = card ? value.length <= card.length[card.length.length - 1] : result = value.length <= 16;


    return result;
  }

  // tslint:disable-next-line: no-any
  public static restrictExpiry(key: any, target: any): boolean {
    let digit;
    let value;
    digit = String.fromCharCode(key);
    if (!/^\d+$/.test(digit) || CreditCard.hasTextSelected(target)) {
      return false;
    }
    value = `${target.value}${digit}`.replace(/\D/g, '');

    return value.length > 6;
  }

  public static replaceFullWidthChars(str: string | null): string {
    if (str === null) {
      // tslint:disable-next-line: no-parameter-reassignment
      str = '';
    }

    let chr;
    let idx;
    const fullWidth = '\uff10\uff11\uff12\uff13\uff14\uff15\uff16\uff17\uff18\uff19';
    const halfWidth = '0123456789';
    let value = '';
    const chars = str.split('');

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < chars.length; i++) {
      chr = chars[i];
      idx = fullWidth.indexOf(chr);
      if (idx > -1) {
        chr = halfWidth[idx];
      }
      value += chr;
    }

    return value;
  }

  public static formatExpiry(expiry: string): string {
    // const parts = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);  // use 4-digits year
    const parts = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,2})?/);  // use 2-digits year
    let month;
    let separator;
    let year;

    // tslint:disable-next-line: strict-boolean-expressions
    if (!parts) {
      return '';
    }

    // tslint:disable-next-line: strict-boolean-expressions
    month = parts[1] || '';
    // tslint:disable-next-line: strict-boolean-expressions
    separator = parts[2] || '';
    // tslint:disable-next-line: strict-boolean-expressions
    year = parts[3] || '';

    if (year.length > 0) {
      // separator = ' / ';  // change view to ==11 / 19==
      separator = '/';  // view as ==11/19==

      // } else if (separator === ' /') {  // change view to ==11 / 19==
    } else if (separator === '/') {  // view as ==11/19==
      month = month.substring(0, 2);
      separator = '';
    } else if (month.length === 2 || separator.length > 0) {
      // separator = ' / ';  // change view to ==11 / 19==
      separator = '/';  // view as ==11/19==
    } else if (month.length === 1 && (month !== '0' && month !== '1')) {
      month = `0${month}`;
      // separator = ' / ';  // change view to ==11 / 19==
      separator = '/';  // view as ==11/19==
    }

    return `${month}${separator}${year}`;
  }

  // tslint:disable-next-line: no-any
  public static restrictCVV(key: any, target: any): boolean {
    const digit = String.fromCharCode(key);
    if (!/^\d+$/.test(digit) || CreditCard.hasTextSelected(target)) {
      return false;
    }
    const val = `${target.value}${digit}`;

    return val.length <= 4;
  }

  public static luhnCheck(num: string): boolean {
    let digit;
    let odd = true;
    let sum = 0;
    const digits = num.split('')
      .reverse();

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < digits.length; i++) {
      digit = digits[i];
      digit = parseInt(digit, 10);
      // tslint:disable-next-line: no-conditional-assignment
      if ((odd = !odd)) {
        digit *= 2;
      }
      if (digit > 9) {
        digit -= 9;
      }
      sum += digit;
    }

    return sum % 10 === 0;
  }
}
