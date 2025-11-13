import React from "react";

const ErrorMessage = React.memo(function ErrorMessage({
  message,
}: {
  message: string | null;
}) {
  if (!message) return null;

  return (
    <>
      <div>
        <h1>{message}</h1>
      </div>
    </>
  );
});

export default ErrorMessage;
