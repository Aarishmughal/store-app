import React from "react";

const FormField = (props) => {
  const classes = `form-text m-0 ${props.className || ""}`;
  const currency = props.currency || "";
  return (
    <>
      <label className={classes}>
        {props.label}
        {props.children}
      </label>
      <div className="input-group">
        <input className="form-control" type={props.type} name={props.name} value={props.value} onChange={props.handleInputChange} disabled={props.disabled} />
        {currency && <span className="input-group-text">{currency}</span>}
      </div>
    </>
  );
};

export default FormField;
