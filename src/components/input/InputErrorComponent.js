import React from "react";
import iSvg from "../../assets/svg/info-mark.svg";

const InputErrorComponent = ({error}) => {
  if (error)
    return (
      <div className="ant-form-explain" style={{marginTop: "5px", paddingLeft: 0, display: "flex", justifyContent:"center", maxHeight: "45px", maxWidth: "290px"}}>
        <p><img src={iSvg} style={{maxWidth: "17px", marginRight:"10px"}} alt={""}/></p>
        <p>{error}</p>
      </div>
    ); else return null;
};

export default React.memo(InputErrorComponent);
