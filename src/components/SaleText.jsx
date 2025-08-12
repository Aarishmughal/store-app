import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const SaleText = (props) => {
  return (
    <div className="modal fade" id="textResultData" tabIndex="-1" aria-labelledby="textResultDataLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="textResultDataLabel">
              Result
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <textarea className="form-control text-muted" rows="15" readOnly value={props.text} />
          </div>
          <div className="modal-footer">
            <OverlayTrigger placement={"top"} delay={{ show: 250, hide: 400 }} overlay={<Tooltip>Copy to Clipboard.</Tooltip>}>
              <button className="btn btn-success me-2" onClick={props.copyFunction}>
                <i className="bi bi-copy"></i>
              </button>
            </OverlayTrigger>
            <OverlayTrigger placement={"top"} delay={{ show: 250, hide: 400 }} overlay={<Tooltip>Export to PDF.</Tooltip>}>
              <button className="btn btn-secondary" onClick={props.exportPdfFunction}>
                <i className="bi bi-filetype-pdf"></i>
              </button>
            </OverlayTrigger>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleText;
