import React from "react";
import FormField from "./FormField";

const AddSale = (props) => {
  return (
    <div className="modal fade" id="addSalesModal" tabIndex="-1" aria-labelledby="addSalesModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addSalesModalLabel">
              Add New Sale
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row g-3 mb-3">
              <div className="col-12">
                <FormField label="Order No." type="number" name="orderNumber" value={props.sale.orderNumber || ""} handleInputChange={props.handleSaleChange} />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-12">
                <FormField label="Shirts Count" type="number" name="shirtsCount" value={props.sale.shirtsCount || ""} handleInputChange={props.handleSaleChange} />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-12">
                <FormField label="Total Payable" type="number" name="totalPayable" value={props.sale.totalPayable || ""} handleInputChange={props.handleSaleChange} />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancel
            </button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={props.calculateTotalSales}>
              Add Sale
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSale;
