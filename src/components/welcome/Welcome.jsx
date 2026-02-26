import "./w.css";
import lo from "../../assets/logo.png";
const Welcome = ({para}) => {
  return (
    <div className="welcome">
      <img src={lo} alt="" className="logo_png" />
{para && 
      <p className="w_p">
        
        {para}
      </p>
}
    </div>
  );
};

export default Welcome;
