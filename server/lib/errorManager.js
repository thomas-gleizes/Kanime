const ErrorManager = {
  generate500: (error) => {
    if (process.env.ENV === "dev") {
      console.log(error);
      return { error: error };
    } else {
      return { error: "Une erreur interne est survenue" };
    }
  },
};

module.exports = ErrorManager;
