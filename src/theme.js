// !Attentions:
// when this import into a .sass file, camelCase fields must be turn in to words connected with '-'
// example:
// $theme-colors: theme("colors")
// background-color: map.get(b.$theme-colors, "dark-bg")
module.exports = {
  colors: {
    // according to color
    ye: "#fffc58",
    org: "#d7ba7d",
    gn: "#00ff9c",
    darkGn: "#0bb077",
    lightVio: "#8b96ff",
    vio: "#b585d6",
    bu: "#00c3ff",
    bk: "#00140b",
    // according to usage
    bg: "#1e1d45",
    hover: "#0d1f4b",
    darkBg: "#100d23",
    seledBg: "#022216",
    avator: "#42557b",
    // RGB
    darkBgRGB: "16, 13, 35",
    gnRGB: "0,255,156",
    RGBSeledBG: "2,34,22",
  },
  breakpoints: {
    xs: "0",
    sm: "600px",
    md: "960px",
    lg: "1280px",
    xl: "1920px",
  },
};
