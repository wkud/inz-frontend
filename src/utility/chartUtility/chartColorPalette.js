const chartColorPalette = (colorCount) => {
  let colors = [];
  switch (colorCount) {
    case 3:
      colors = ['#bc5090'];
      break;
    case 4:
      colors = ['#7a5195', '#ef5675'];
      break;
    case 5:
      colors = ['#58508d', '#bc5090', '#ff6361'];
      break;
    case 6:
      colors = ['#444e86', '#955196', '#dd5182', '#ff6e54'];
      break;
    case 7:
      colors = ['#374c80', '#7a5195', '#bc5090', '#ef5675', '#ff764a'];
      break;
    case 8:
      colors = [
        '#2f4b7c',
        '#665191',
        '#a05195',
        '#d45087',
        '#f95d6a',
        '#ff7c43',
      ];
      break;
    default:
      if (colorCount > 8) return chartColorPalette(8);
  }
  return ['#003f5c', ...colors, '#ffa600'];
};

export default chartColorPalette;
