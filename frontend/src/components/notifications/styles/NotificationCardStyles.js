export default {
  card: {
    width: 350,
    margin: 6,
    padding: 10,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    borderRadius: 10,
    "&:hover": {
      boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
    }
  },
  "@global": {
    ".cardDisabled > div > div": {
      border: "none",
      backgroundColor: "unset !important"
    },
    ".cardDisabled > div > div > span": {
      display: "none"
    },
    ".dateTimePicker > div > div > input": {
      border: "none !important"
    }
  },
  "@media screen and (max-width: 900px)": {
    card: {
      width: 280
    }
  },
  "@media screen and (max-width: 730px)": {
    card: {
      width: 305
    }
  }
};
