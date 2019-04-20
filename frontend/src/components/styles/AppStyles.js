export default {
  "@global": {
    body: {
      fontFamily: '"Josefin Sans", sans-serif'
    }
  },
  cont: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    margin: 0,
    fontSize: "22px"
  },
  main: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "nowrap",
    width: "80vw"
  },
  "@media all and (max-width: 640px)": {
    "@global": {}
  }
};
