import React from "react";
import Typography from "@material-ui/core/Typography";

const DisplayMessage = ({ message }) => {
  return (
    <div>
      <Typography variant="h1" color="inherit">
        {message}
      </Typography>
    </div>
  );
};

DisplayMessage.defaultProps = {
  message: "Your email has been sent to you =)"
};

export default DisplayMessage;
