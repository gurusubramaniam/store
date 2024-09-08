import shoppingData from '../data/shopping.json';
import fs from 'fs';

for (let i = 0; i < shoppingData.length; i++) {
  shoppingData[i].itemNumber = i + 1;
}

fs.writeFileSync(
  '../data/shopping.json',
  JSON.stringify(shoppingData, null, 2)
);
