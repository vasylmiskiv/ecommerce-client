import { PulseLoader } from "react-spinners";

const Loader = ({ button }) => {
  return (
    <div
      className={`w-full flex ${
        !button ? `pt-40` : `px-4 py-[7px]`
      } justify-center`}
    >
      <PulseLoader
        color={button ? `#fff` : `#52525b`}
        size={`${button ? 7 : 20}`}
        speedMultiplier="0.3"
      />
    </div>
  );
};

export default Loader;
