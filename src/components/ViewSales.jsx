import React from "react";

const ViewSales = (props) => {
  return (
    <div className="modal fade" id="salesModal" tabIndex="-1" aria-labelledby="salesModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="salesModalLabel">
              All Sales
            </h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Order No.</th>
                    <th>Shirts Count</th>
                    <th>Total Payable</th>
                  </tr>
                </thead>
                <tbody>
                  {props.sales.map((sale, index) => (
                    <tr key={index}>
                      <td>{sale.orderNumber}</td>
                      <td>{sale.shirtsCount}</td>
                      <td>{sale.totalPayable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-footer">
            <span className="fst-italic small text-muted">Refresh Page to clear all sales.</span>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSales;
