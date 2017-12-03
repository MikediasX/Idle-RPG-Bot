const Helper = require('../../utils/Helper');
const items = require('../data/items');

class Item {
  generateItem() {
    const randomRarityChance = Helper.randomInt(0, 100);
    const randomMaterialChance = Helper.randomInt(0, 100);
    const itemRarityList = items.rarity.filter(itemRarity => itemRarity.rarity >= randomRarityChance);
    const itemMaterialList = items.material.filter(materialRarity => materialRarity.rarity >= randomMaterialChance);

    const randomRarityIndex = Helper.randomInt(0, itemRarityList.length - 1);
    const randomMaterialIndex = Helper.randomInt(0, itemMaterialList.length - 1);
    const randomEquipmentIndex = Helper.randomInt(0, items.type.length - 1);
    const randomTypeIndex = Helper.randomInt(0, items.type[randomEquipmentIndex].length - 1);

    const itemStr = (itemRarityList[randomRarityIndex].stats.str
      * (itemMaterialList[randomMaterialIndex].stats.str
        + items.type[randomEquipmentIndex][randomTypeIndex].stats.str)) / 4;

    const itemDex = (itemRarityList[randomRarityIndex].stats.dex
      * (itemMaterialList[randomMaterialIndex].stats.dex
        + items.type[randomEquipmentIndex][randomTypeIndex].stats.dex)) / 4;

    const itemEnd = (itemRarityList[randomRarityIndex].stats.end
      * (itemMaterialList[randomMaterialIndex].stats.end
        + items.type[randomEquipmentIndex][randomTypeIndex].stats.end)) / 4;

    const itemInt = (itemRarityList[randomRarityIndex].stats.int
      * (itemMaterialList[randomMaterialIndex].stats.int
        + items.type[randomEquipmentIndex][randomTypeIndex].stats.int)) / 4;

    const itemRating = itemStr + itemDex + itemEnd + itemInt;

    const itemObj = {
      name: `${itemRarityList[randomRarityIndex].name} ${itemMaterialList[randomMaterialIndex].name} ${items.type[randomEquipmentIndex][randomTypeIndex].name}`,
      position: items.type[randomEquipmentIndex][randomTypeIndex].position,
      stats: {
        str: itemStr,
        dex: itemDex,
        end: itemEnd,
        int: itemInt
      },
      rating: itemRating,
      gold: Number((itemRarityList[randomRarityIndex].gold
        * itemMaterialList[randomMaterialIndex].gold
        * items.type[randomEquipmentIndex][randomTypeIndex].gold).toFixed()) * itemRating
    };
    return itemObj;
  }
}
module.exports = new Item();
