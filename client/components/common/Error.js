import Error from "next/error";

const Error = ({ status, message }) => {
  return <Error statusCode={status} title={message} />;
};

export default Error;
