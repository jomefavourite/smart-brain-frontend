import Tilt from "react-tilt";

const Logo = () => {
  return (
    <div className="ma4">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner">Logo</div>
      </Tilt>
    </div>
  );
};

export default Logo;
