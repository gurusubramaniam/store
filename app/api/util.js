const shoppingData = require('../data/shopping.json');
const fs = require('fs');

for (let i = 0; i < shoppingData.length; i++) {
  shoppingData[i].itemNumber = i + 1;
}

fs.writeFileSync(
  '../data/shopping.json',
  JSON.stringify(shoppingData, null, 2)
);
