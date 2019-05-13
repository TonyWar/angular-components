export const getNumberWithDecimalsFromString = (value: string, toString: number = 2): string => {
  const regex1 = /^[0-9.,]$/;
  const regex2 = new RegExp(`^[0-9]{1,13}([,.][0-9]{0,${toString}})?$`);
  const anArray = String(value)
    .replace(/,/g, '.')
    .split('');
  for (let i = 0; i < anArray.length; i++) {
    if (!regex1.test(anArray[i])) {
      anArray[i] = '';
    }
  }
  anArray
    .join('')
    .split('');

  const arr = [];
  for (let i = 0; i < anArray.length; i++) {
    let temp = '';
    for (let j = 0; j <= i; j++) {
      temp += anArray[j];
    }
    if (regex2.test(temp)) {
      arr.push(anArray[i]);
    }
  }

  return arr.join('');
};

export const removeZeroDuplicates = (value: string): string => {
  let hasNotZero = false;

  return value
    .split('')
    .map((char, index, array) => {
      if (index + 1 === array.length || hasNotZero) {
        return char;
      }

      if (array[index] === '0') {
        return '';
      } else {
        hasNotZero = true;
      }

      return char;
    })
    .join('');
};

export const numberToStringFormat = (value: string): string => value
  .split('')
  .reverse()
  .join('')
  .replace(/(\d{3})/g, '$1 ')
  .replace(/(^\s+|\s+$)/, '')
  .split('')
  .reverse()
  .join('');