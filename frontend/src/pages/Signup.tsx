import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signup } from "../api/user";
import { useSetRecoilState } from "recoil";
import { LoaderAtom } from "../store/atom/user";
import Dropdown from "../components/Dropdown";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [year, setYear] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [visible, setVisible] = useState(false);
  const setLoading = useSetRecoilState(LoaderAtom);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    cb: (value: string) => void
  ) => {
    cb(e.target.value);
  };

  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await signup(
      name,
      email,
      password,
      Number.parseInt(age),
      Number.parseInt(year),
      selectedValue
    );
    setLoading(false);
  };

  return (
    <div className="h-full flex">
      <div className="h-full w-1/2 flex justify-center items-center">
        <form className="w-[400px]" onSubmit={handleSubmit}>
          <div className="mb-5">
            <h1 className="text-5xl font-bold mb-4">SignUp</h1>
            <p className="text-gray-500">
              Join Our Community and Find Your Perfect Roommate!
            </p>
          </div>
          <label className="block font-semibold mb-1">Name</label>
          <Input
            type="text"
            placeholder="Enter name"
            value={name}
            cb={(e) => handleInputChange(e, setName)}
          />

          <label className="block font-semibold mb-2">Email</label>
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            cb={(e) => handleInputChange(e, setEmail)}
          />

          <div className="flex justify-between items-center gap-x-5">
            <div>
              <label className="block font-semibold mb-2">Age</label>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Enter age"
                value={age}
                cb={(e) => handleInputChange(e, setAge)}
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Year</label>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Enter year"
                value={year}
                cb={(e) => handleInputChange(e, setYear)}
              />
            </div>
          </div>

          <label className="block font-semibold mb-2">Course</label>
          <Dropdown
            placeholder="Select a course"
            options={["B. Tech", "BBA", "BJMC", "M. Tech", "MBA"]}
            value={selectedValue}
            onChange={handleDropdownChange}
          />

          <label className="block font-semibold mb-2">Password</label>
          <div className="relative">
            <Input
              type={visible ? "text" : "password"}
              placeholder="Create password"
              value={password}
              cb={(e) => handleInputChange(e, setPassword)}
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {visible ? (
                <FaEyeSlash className="w-5 h-5 mr-2" />
              ) : (
                <FaEye className="w-5 h-5 mr-2" />
              )}
            </button>
          </div>
          <Button type="submit" label="Submit" className="w-full" />
          <p className="w-full text-center mt-3">
            Already have an account?
            <Link className="font-bold ml-1 text-accent" to="/signin">
              Signin
            </Link>
          </p>
        </form>
      </div>
      <div className="w-1/2 bg-black"></div>
    </div>
  );
};

export default Signup;
