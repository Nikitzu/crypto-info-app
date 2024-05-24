export const formatFloat = (numString: string): string => {
    const numParts = numString.split('.');
    const integralPart = numParts[0];
    let decimalPart = numParts[1] || '';

    if (parseInt(integralPart) > 0) {
        if (decimalPart.length > 5 - integralPart.length) {
            decimalPart = decimalPart.substring(0, 5 - integralPart.length);
        }
        return `${integralPart}.${decimalPart.padEnd(2, '0')}`;
    }

    if (numString == '0') return '0.00';

    let zerosCounted = false;
    let nonZeroCounter = 0;
    let newDecimalPart = '';

    for (let i = 0; i < decimalPart.length; i++) {
        if (!zerosCounted && decimalPart[i] === '0') {
            newDecimalPart += decimalPart[i];
        } else {
            zerosCounted = true;
            if (decimalPart[i] !== '0' || (decimalPart[i] === '0' && decimalPart[i+1] !== '0')) {
                nonZeroCounter++;
                newDecimalPart += decimalPart[i];
            } else {
                break;
            }
        }
        if (nonZeroCounter === 5) {
            break;
        }
    }
    return `${integralPart}.${newDecimalPart}`;
}