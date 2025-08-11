import React from "react";

const FormField = (props) => {
    const classes = `input-group-text ${props.className || ""}`;
    const currency = props.currency || "";
    return (
        <div className="input-group">
            <span className={classes}>{props.label}</span>
            <input
                className="form-control"
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.handleInputChange}
            />
            {currency && <span className={classes}>{currency}</span>}
        </div>
    );
};

export default FormField;
