import { Grid } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10">
        <Grid
          visible={true}
          height="40"
          width="40"
          color="#2285FA"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    </div>
  );
};

export default Loader;
