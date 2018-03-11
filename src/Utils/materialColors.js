import {red, pink, purple, deepPurple, indigo, blue,
        lightBlue, cyan, teal, green, lightGreen, 
        lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey  } from 'material-ui/colors';

const mainColors = [
  'Red',
  'Pink',
  'Purple',
  'Deep Purple',
  'Indigo',
  'Blue',
  'Light Blue',
  'Cyan',
  'Teal',
  'Green',
  'Light Green',
  'Lime',
  'Yellow',
  'Amber',
  'Orange',
  'Deep Orange',
  'Brown', 
  'Grey',
  'Blue Grey'
];
const lightPalette = [200];
const darkPalette = [500,900];

function getColorObject(name){
  switch(name){
    case mainColors[0]:
    return red;
    case mainColors[1]:
    return pink;
    case mainColors[2]:
    return purple;
    case mainColors[3]:
    return deepPurple;
    case mainColors[4]:
    return indigo;
    case mainColors[5]:
    return blue;
    case mainColors[6]:
    return lightBlue;
    case mainColors[7]:
    return cyan;
    case mainColors[8]:
    return teal;
    case mainColors[9]:
    return green;
    case mainColors[10]:
    return lightGreen;
    case mainColors[11]:
    return lime;
    case mainColors[12]:
    return yellow;
    case mainColors[13]:
    return amber;
    case mainColors[14]:
    return orange;
    case mainColors[15]:
    return deepOrange;
    case mainColors[16]:
    return brown;
    case mainColors[17]:
    return grey;
    case mainColors[18]:
    return blueGrey;
    default:
    return getColorObject(mainColors[Math.floor(Math.random()*mainColors.length)]);
  }
}

function getColor(){
  const colorDark = darkPalette[Math.floor(Math.random()*darkPalette.length)];
  const colorLight = lightPalette[Math.floor(Math.random()*lightPalette.length)];
  const colorName = mainColors[Math.floor(Math.random()*mainColors.length)];

  const colorObject = getColorObject(colorName);

  let colorValue = colorObject[colorDark];
  let colorLightValue = colorObject[colorLight];

  return [colorValue,colorLightValue];
}

export function getColorRandom(numColors, currentColors){
  let arrayColors = [];
  let color = null;
  for(let i=0; i<numColors; i++){
    if(numColors<(mainColors.length * darkPalette.length)){
      do{
        color = getColor();
      }while(currentColors.map(x=>x.join('')).indexOf(color.join(''))>=0);
      currentColors.push(color);
    }else{
      color = getColor();
    }
    arrayColors.push(color);
  }
  return arrayColors;
}