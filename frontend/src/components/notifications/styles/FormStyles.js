export default {
  "@global": {
    label: {
      display: "block",
      margin: "0 0 .28571429rem 0",
      color: "rgba(0,0,0,.87)",
      fontSize: ".92857143em",
      fontWeight: 700,
      textTransform: "none"
    },
    input: {
      fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
      margin: 0,
      outline: 0,
      tapHighlightColor: "rgba(255,255,255,0)",
      lineHeight: "1.21428571em",
      padding: ".67857143em 1em",
      fontSize: "1.5em !important",
      background: "#fff",
      border: "1px solid rgba(34,36,38,.15)",
      color: "rgba(0,0,0,.87)",
      borderRadius: ".28571429rem",
      boxShadow: "0px 0px 0px 0px transparent inset",
      transition: "color .1s ease,border-color .1s ease",
      "&:disabled": {
        pointerEvents: "none",
        opacity: "1 !important",
        border: "none !important"
      }
    }
  },
  createForm: {
    width: "80%",
    marginBottom: 25
  }
};
