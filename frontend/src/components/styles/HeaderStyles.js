export default {
  "@global": {
    header: {
      height: "6vh",
      background: "#BCE784",
      borderBottomLeftRadius: "10px",
      borderBottomRightRadius: "10px"
    },
    ".effectOne > a": {
      position: "relative"
    },
    ".effectOne > a:before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: 2,
      bottom: "0",
      margin: "-5px 0",
      backgroundColor: "white",
      visibility: "hidden",
      transform: "scaleX(0)",
      transition: "all 0.25s ease-in-out 0s"
    },
    ".effectOne > a:hover:before": {
      visibility: "visible",
      transform: "scaleX(1)"
    }
  },
  logo: {
    color: ["#525174", "!important"],
    fontWeight: 1000,
    fontSize: "1.2em",
    marginLeft: 20
  }
};
// linkHover: {
//   position: "relative",
//   "&:before": {
//     content: "",
//     position: "absolute",
//     width: "100%",
//     height: "2px",
//     bottom: "0",
//     margin: ["-5px", "0"],
//     backgroundColor: "white",
//     visibility: "hidden",
//     transform: "scaleX(0)",
//     transition: ["all", "0.4s", "ease-in-out", "0s"]
//   },
//   "&:hover:before": {
//     visibility: "visible",
//     transform: "scaleX(1)"
//   }
// }
