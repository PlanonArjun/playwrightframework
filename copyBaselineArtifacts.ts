const fs = require('fs');
const path = require('path');

let sourceDirWin;
let destinationDir;
let pcComponents;

pcComponents = [
  'Address_Information_Component',
  'Application_Review_Component',
  'Bank_Information_Component',
  'Card_Information_Component',
  'Cart_Review_Component',
  'Contact_Information_Component',
  'Income_Information_Component',
  'Landing_Page_Component',
  'Onboarding_Page_Component',
  'Payment_at_Signing_Component',
  'Personal_Information_Component',
  'Results_Page_Component',
  'Review_Terms_Component',
  'Submit_Disclosure_Component',
  'Terms_Conditions_Component',
];

for (let i = 0; i < pcComponents.length; i++) {
  sourceDirWin = `./sauce-artifacts/${pcComponents[i]}`;
  // const sourceDirMac = './sauce-artifacts/Webkit_Mac/';
  destinationDir = './tests/storybook/';

  function copyFiles(source, destination, newValue) {
    fs.readdirSync(source).forEach((item) => {
      const sourcePath = path.join(source, item);
      if (!item.endsWith('-actual.png')) {
        fs.unlinkSync(sourcePath);
      } else {
        const folderDestination = `${destination}pc-apply-${getTestNameFromFile(
          item
        )}.spec.ts-snapshots`;
        console.log(folderDestination);
        const destinationPath = path.join(
          folderDestination,
          item.replace(/-(?!.*-).*$/, `-${newValue}`)
        );
        fs.copyFileSync(sourcePath, destinationPath);
      }
    });
    fs.rmSync(source, { recursive: true });
  }

  function getTestNameFromFile(fileName) {
    const pattern = /^([^\s-]+-+[^\s-]+)/;
    const match = fileName.match(pattern);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  copyFiles(sourceDirWin, destinationDir, 'storybook-chrome-win32.png');
}
