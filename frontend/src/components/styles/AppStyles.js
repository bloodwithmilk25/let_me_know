export default {
  "@global": {
    body: {
      // fontFamily: ["Playfair Display", "serif"],
      display: "flex",
      margin: 0,
      flexDirection: "column",
      minHeight: "100vh",
      fontSize: "22px"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    a: {
      "&:link": {
        textDecoration: "inherit",
        color: "white",
        cursor: "pointer"
      },
      "&:visited": {
        textDecoration: "inherit",
        color: "white",
        cursor: "auto"
      }
    }
  },
  main: {
    display: "flex",
    flexBasis: "800px"
  },
  "@media all and (max-width: 640px)": {
    main: {
      flexDirection: "column",
      flexGrow: 1
    },
    "@global": {
      header: {
        flexBasis: "50px"
      }
    }
  }
};
