/* functions for formatting numbers for use in rent or buy applications */


/*
 * get the formatted string of the input (number) from the input field.
 * e.g., "500,0000.45" --> "5,000,000.45"
 * e.g., "5000000.45" --> 5,000,000.
 */
export function formatNumberInString(str) {
  const formatter = new Intl.NumberFormat();
  const regex = /\d*/g;
  const arr = str.split(".");
  const integer = arr[0].match(regex).join("");
  const decimal = arr.length > 1 ? arr[1].match(regex).join("") : "";
  const display = (integer ? formatter.format(integer) : "") + (str[arr[0].length] == "." ? "." :  "") + decimal; 

  return display;
}

/*
 * get the number from within a string, assuming it's coming from one of
 * the pre-formatted inputs and not a complete mess of characters.
 * e.g., '$5,523.67' -> 5523.67
 */
export function extractNumberInString(str) {
  const regex = /\d*/g;
  const arr = str.split(".");
  const integer = arr[0].match(regex).join("");
  const decimal = arr.length > 1 ? arr[1].match(regex).join("") : "";
  const value = Number(integer + "." +  decimal);

  return value;
}


