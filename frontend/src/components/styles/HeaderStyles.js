export default {
  "@global": {
    "*": {
      boxSizing: "border-box",
      padding: "0",
      margin: "0"
    },
    ".navbar": {
      minWidth: "100vw",
      fontSize: "18px",
      backgroundImage: "linear-gradient(260deg, #2376ae 0%, #c16ecf 100%)",
      paddingBottom: 10,
      marginBottom: 15
    },
    ".main-nav": {
      listStyleType: "none",
      display: "none"
    },
    ".nav-links": {
      textDecoration: "none",
      color: "rgba(255, 255, 255, 0.7)",
      "&:hover": {
        color: "rgba(255, 255, 255, 1)"
      }
    },
    ".nav-username": {
      textDecoration: "none",
      color: "rgba(255, 255, 255, 0.7)"
    },

    ".logo": {
      display: "inline-block",
      fontSize: "22px",
      fontWeight: 500,
      marginTop: "10px",
      marginLeft: "20px",
      color: "rgba(255, 255, 255, 0.7)",
      "&:hover": {
        color: "rgba(255, 255, 255, 1)"
      }
    },
    ".main-nav li": {
      textAlign: "center",
      margin: "15px auto"
    },
    ".navbar-toggle": {
      position: "absolute",
      top: "10px",
      right: "20px",
      cursor: "pointer",
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "24px",
      "&:hover": {
        color: "rgba(255, 255, 255, 1)"
      }
    },
    ".active": {
      display: "block"
    },
    "@media screen and (min-width: 768px)": {
      ".navbar": {
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: "0",
        height: "70px",
        alignItems: "center",
        marginBottom: 40
      },
      ".main-nav": {
        display: "flex",
        marginRight: "30px",
        flexDirection: "row",
        justifyContent: "flex-end"
      },
      ".main-nav li": {
        margin: "0"
      },
      ".nav-links": {
        marginLeft: "40px"
      },
      ".logo": {
        marginTop: "0"
      },
      ".navbar-toggle": {
        display: "none"
      }
    }
  }
};
