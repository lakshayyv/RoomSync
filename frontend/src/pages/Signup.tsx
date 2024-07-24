import { ChangeEvent, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    cb: (value: string) => void
  ) => {
    cb(e.target.value);
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="h-full w-1/2 flex justify-center items-center">
      <form className="w-[400px]">
        <div className="mb-7">
          <h1 className="text-5xl font-bold mb-3">SignUp</h1>
          <p className="text-gray-500">
            Join Our Community and Find Your Perfect Roommate!
          </p>
        </div>
        <label className="block font-semibold mb-1">Name</label>
        <Input
          type="text"
          placeholder="Lakshay Verma"
          value={name}
          cb={(e) => handleInputChange(e, setName)}
        />

        <label className="block font-semibold mb-2">Email</label>
        <Input
          type="email"
          placeholder="lakshay@example.com"
          value={email}
          cb={(e) => handleInputChange(e, setEmail)}
        />

        <label className="block font-semibold mb-2">Password</label>
        <div className="relative">
          <Input
            type={visible ? "text" : "password"}
            placeholder="Kuchbhi"
            value={password}
            cb={(e) => handleInputChange(e, setPassword)}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {visible ? <FaEyeSlash className="w-5 h-5 text-black mr-2" /> : <FaEye className="w-5 h-5 text-black mr-2" />}
          </button>
        </div>

        <Button type="submit" label="Submit" />
      </form>
    </div>
  );
};

export default Signup;
