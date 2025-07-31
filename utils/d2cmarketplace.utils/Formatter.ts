export class Formatter {

  static formatProductName(productKey: string): string {
    // Replace underscores with spaces
    let formattedName = productKey.replace(/_/g, ' ');

    // Perform capitalization only if the first character is a letter
    if (formattedName.length > 0 && /[a-zA-Z]/.test(formattedName.charAt(0))) {
      // Capitalize the first letter and retain the case of the remaining string
      formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
    }

    return formattedName;
  }

}
