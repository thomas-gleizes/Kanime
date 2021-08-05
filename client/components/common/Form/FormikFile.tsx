import { FC } from "react";
import { useField } from "formik";
import { encodeTo64 } from "../../../helpers/function";

interface Props {
  innerRef: any;
  name: string;
  disabled?: boolean;
}

const FormikFile: FC<Props> = ({ innerRef, name, disabled }) => {
  const [__, _, { setValue }] = useField(name);

  const handleChange = ({ target }) => {
    const file = target.files[0];

    encodeTo64(file)
      .then((result) => {
        console.log("data", result);

        setValue({ data: result, extension: file.type });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <input
      ref={innerRef}
      onChange={handleChange}
      type="file"
      className="hidden"
      disabled={disabled}
    />
  );
};

export default FormikFile;
