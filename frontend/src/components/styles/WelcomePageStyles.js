export default {
  "@global": {
    ".navbar": {
      margin: 0
    },
    body: {
      overflowY: "hidden"
    }
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    background: "url(/static/bcg.jpg)",
    backgroundRepeat: "no-repeat",
    opacity: 0,
    animationName: "appear",
    animationDelay: "1s",
    animationDuration: "1.5s",
    animationFillMode: "forwards"
  },
  "@keyframes appear": {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  message: {
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 30,
    borderRadius: 15
  }
};
