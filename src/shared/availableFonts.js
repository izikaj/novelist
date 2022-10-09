const FONT_NAMES = [
  'American Typewriter', 'Andale Mono', 'Arial', 'Arial Black', 'Arial Narrow',
  'Arial Rounded MT Bold', 'Arial Unicode MS', 'Avenir', 'Avenir Next',
  'Avenir Next Condensed', 'Bahnschrift', 'Baskerville', 'Big Caslon',
  'Bradley Hand', 'Brush Script MT', 'Calibri', 'Cambria', 'Cambria Math',
  'Candara', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charter',
  'Cochin', 'Comic Sans MS', 'Consolas', 'Constantia', 'Copperplate',
  'Corbel', 'Courier', 'Courier New', 'DIN Alternate', 'DIN Condensed', 'Didot',
  'Droid Sans', 'Droid Sans Mono', 'Droid Serif', 'Ebrima', 'Franklin Gothic Medium',
  'Futura', 'Gabriola', 'Gadugi', 'Geneva', 'Georgia', 'Gill Sans', 'Helvetica',
  'Helvetica Neue', 'Herculanum', 'Hoefler Text', 'HoloLens MDL2 Assets', 'Impact',
  'Ink Free', 'Javanese Text', 'Leelawadee UI', 'Lucida Console', 'Lucida Grande',
  'Lucida Sans Unicode', 'Luminari', 'MS Gothic', 'MV Boli', 'Malgun Gothic',
  'Marker Felt', 'Marlett', 'Menlo', 'Microsoft Himalaya', 'Microsoft JhengHei',
  'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Sans Serif',
  'Microsoft Tai Le', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU-ExtB',
  'Monaco', 'Mongolian Baiti', 'Myanmar Text', 'Nirmala UI', 'Noteworthy',
  'Optima', 'Palatino', 'Palatino Linotype', 'Papyrus', 'Phosphate', 'Rockwell',
  'Savoye LET', 'Segoe MDL2 Assets', 'Segoe Print', 'Segoe Script', 'Segoe UI',
  'Segoe UI Emoji', 'Segoe UI Historic', 'Segoe UI Symbol', 'SignPainter', 'SimSun',
  'Sitka', 'Skia', 'Snell Roundhand', 'Sylfaen', 'Symbol', 'Tahoma', 'Times',
  'Times New Roman', 'Trattatello', 'Trebuchet MS', 'Verdana', 'Yu Gothic', 'Zapfino'
];

async function detectFontsFromList() {
  await document.fonts.ready;
  const list = [];
  for (const font of FONT_NAMES) {
    if (document.fonts.check(`12px "${font}"`)) list.push(font);
  }
  return list;
}

async function availableFonts() {
  const detected = await detectFontsFromList();
  if (detected.length > 0) return detected;

  throw 'not available';
}

export default availableFonts;
