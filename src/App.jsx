import { useState } from "react";
import "./App.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FormField from "./components/FormField";
import {
  SHIRT_COST,
  SHOPIFY_FEE_PERCENTAGE,
  SAFETY_DEPOSIT_PERCENTAGE,
} from "./constants";
import { getSalesSlipTemplate } from "./salesSlipTemplate";
import { getSalesSlipPdfTemplate } from "./salesSlipPdfTemplate";
import round from "./utils/round";
function App() {
  const [details, setDetails] = useState({
    title: `Sales Slip`,
    startDate: `${Date.now()}`,
    endDate: `${Date.now()}`,
    totalSales: [],
    totalAdsSpent: 0,
    totalShirtsCost: 0,
    totalDeliveryCost: 0,
    totalPrintCost: 0,
  });
  const [sale, setSale] = useState({
    orderNumber: 0,
    shirtsCount: 0,
    totalPayable: 0,
  });
  const [result, setResult] = useState("Result will be shown here...");
  const [salesHistory, setSalesHistory] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSaleChange = (e) => {
    const { name, value, type } = e.target;
    setSale((prevDetails) => ({
      ...prevDetails,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const calculateTotalSales = () => {
    setSalesHistory((prevHistory) => [...prevHistory, sale]);
    setDetails((prevDetails) => ({
      ...prevDetails,
      totalSales: [...prevDetails.totalSales, sale.totalPayable],
    }));
    setDetails((prevDetails) => ({
      ...prevDetails,
      totalShirtsCost:
        prevDetails.totalShirtsCost + sale.shirtsCount * SHIRT_COST,
    }));
    setSale({
      orderNumber: 0,
      shirtsCount: 0,
      totalPayable: 0,
    });
  };
  const calculateShopifyFee = () => {
    return calculateProfit() * SHOPIFY_FEE_PERCENTAGE;
  };
  const calculateSafetyDeposit = () => {
    return (
      (calculateProfit() - calculateShopifyFee()) * SAFETY_DEPOSIT_PERCENTAGE
    );
  };
  const calculateClaimableProfit = () => {
    return calculateProfit() - calculateShopifyFee() - calculateSafetyDeposit();
  };
  const calculateProfit = () => {
    const {
      totalSales,
      totalAdsSpent,
      totalShirtsCost,
      totalDeliveryCost,
      totalPrintCost,
    } = details;
    const totalSalesSum = Array.isArray(totalSales)
      ? totalSales.reduce((acc, val) => acc + Number(val), 0)
      : Number(totalSales);
    return (
      totalSalesSum -
      Number(totalAdsSpent) -
      Number(totalShirtsCost) -
      Number(totalDeliveryCost) -
      Number(totalPrintCost)
    );
  };

  const handleGetSlip = (e) => {
    e.preventDefault();
    const profit = calculateProfit();
    setResult(
      getSalesSlipTemplate(
        details,
        profit,
        calculateShopifyFee(),
        calculateSafetyDeposit(),
        calculateClaimableProfit()
      )
    );
  };

  // Handler to copy the slip to clipboard
  const handleCopySlip = (e) => {
    e.preventDefault();
    handleGetSlip(e);
    navigator.clipboard.writeText(result);
  };

  const handlePrintPdf = () => {
    const profit = calculateProfit();
    const pdfHtml = getSalesSlipPdfTemplate(profit, details, salesHistory);
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(pdfHtml);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-start vh-100 overflow-y-auto pt-5">
        <div
          className="card shadow-sm"
          style={{ maxWidth: "700px", minWidth: "300px" }}
        >
          <h1 className="card-header text-center">Generate Sales Slips</h1>
          <div className="card-body">
            <div className="row g-3 mb-3">
              <div className="col-12">
                <FormField
                  label="Title of Slip"
                  type="text"
                  name="title"
                  value={details.title || ""}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-lg-6 col-sm-12">
                <FormField
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={details.startDate || ""}
                  handleInputChange={handleInputChange}
                />
              </div>
              <div className="col-lg-6 col-sm-12">
                <FormField
                  label="End Date"
                  type="date"
                  name="endDate"
                  value={details.endDate || ""}
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <hr />
            <button
              className="btn btn-success mb-3 w-100"
              data-bs-toggle="modal"
              data-bs-target="#salesModal"
            >
              <i className="bi bi-database-fill-add me-2"></i>Add New Sale
            </button>
            <div
              className="modal fade"
              id="salesModal"
              tabIndex="-1"
              aria-labelledby="salesModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="salesModalLabel">
                      Add New Sale
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row g-3 mb-3">
                      <div className="col-12">
                        <FormField
                          label="Order No."
                          type="text"
                          name="orderNumber"
                          value={sale.orderNumber || ""}
                          handleInputChange={handleSaleChange}
                        />
                      </div>
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col-12">
                        <FormField
                          label="Shirts Count"
                          type="number"
                          name="shirtsCount"
                          value={sale.shirtsCount || ""}
                          handleInputChange={handleSaleChange}
                        />
                      </div>
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col-12">
                        <FormField
                          label="Total Payable"
                          type="number"
                          name="totalPayable"
                          value={sale.totalPayable || ""}
                          handleInputChange={handleSaleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={calculateTotalSales}
                    >
                      Add Sale
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-12">
                <FormField
                  label="Total Sales"
                  type="number"
                  className="text-info"
                  name="totalSales"
                  value={
                    (Array.isArray(details.totalSales)
                      ? details.totalSales.reduce(
                          (acc, val) => acc + Number(val),
                          0
                        )
                      : details.totalSales) || ""
                  }
                  currency="PKR"
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-12">
                <FormField
                  label="Ads Spent"
                  type="number"
                  className="text-danger"
                  name="totalAdsSpent"
                  value={details.totalAdsSpent || ""}
                  currency="PKR"
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-12">
                <FormField
                  label="Shirts Cost"
                  type="number"
                  className="text-danger"
                  name="totalShirtsCost"
                  value={details.totalShirtsCost || ""}
                  currency="PKR"
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-12">
                <FormField
                  label="Total Delivery Cost"
                  type="number"
                  className="text-warning"
                  name="totalDeliveryCost"
                  value={details.totalDeliveryCost || ""}
                  currency="PKR"
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-12">
                <FormField
                  label="Print Cost"
                  type="number"
                  className="text-warning"
                  name="totalPrintCost"
                  value={details.totalPrintCost || ""}
                  currency="PKR"
                  handleInputChange={handleInputChange}
                />
              </div>
            </div>
            <hr />
            <div className="row g-3 mb-3">
              <div className="col-12">
                <div className="input-group">
                  <span className="input-group-text text-info">
                    Total Profit
                    <OverlayTrigger
                      placement={"top"}
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip>
                          Total Profit after deducting regular expenses.
                        </Tooltip>
                      }
                    >
                      <i
                        className="bi bi-info-circle-fill ms-2"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </OverlayTrigger>
                  </span>
                  <input
                    className="form-control"
                    type="number"
                    value={round(calculateProfit()) || ""}
                    disabled
                    readOnly
                  />
                  <span className="input-group-text">PKR</span>
                </div>
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-12">
                <div className="input-group">
                  <span className="input-group-text text-warning">
                    Shopify Fee
                    <OverlayTrigger
                      placement={"top"}
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip>
                          Fee for Shopify Store, collected once every week.
                          Should be about <strong>1,875PKR</strong> for
                          stability.
                        </Tooltip>
                      }
                    >
                      <i
                        className="bi bi-info-circle-fill ms-2"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </OverlayTrigger>
                  </span>
                  <input
                    className="form-control"
                    type="number"
                    value={round(calculateShopifyFee()) || ""}
                    disabled
                    readOnly
                  />
                  <span className="input-group-text">PKR</span>
                </div>
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-12">
                <div className="input-group">
                  <span className="input-group-text text-warning">
                    Safety Deposit
                    <OverlayTrigger
                      placement={"top"}
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip>
                          <strong>20%</strong> Fee collected as a safety
                          measure, collected once every week. Important in case
                          of unexpected expenses.
                        </Tooltip>
                      }
                    >
                      <i
                        className="bi bi-info-circle-fill ms-2"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </OverlayTrigger>
                  </span>
                  <input
                    className="form-control"
                    type="number"
                    value={round(calculateSafetyDeposit()) || ""}
                    disabled
                    readOnly
                  />
                  <span className="input-group-text">PKR</span>
                </div>
              </div>
            </div>
            <div className="row g-3 mb-3">
              <div className="col-12">
                <div className="input-group">
                  <span className="input-group-text text-success">
                    Total Claimable Profit
                    <OverlayTrigger
                      placement={"top"}
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip>
                          Final amount classed as{" "}
                          <strong>Claimable Profit</strong>, which can be
                          withdrawn by owners.
                        </Tooltip>
                      }
                    >
                      <i
                        className="bi bi-info-circle-fill ms-2"
                        style={{ cursor: "pointer" }}
                      ></i>
                    </OverlayTrigger>
                  </span>
                  <input
                    className="form-control"
                    type="number"
                    value={round(calculateClaimableProfit()) || ""}
                    disabled
                    readOnly
                  />
                  <span className="input-group-text">PKR</span>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary me-2"
              onClick={handleGetSlip}
              data-bs-toggle="modal"
              data-bs-target="#textResultData"
            >
              Get Slip
            </button>
            <div
              className="modal fade"
              id="textResultData"
              tabIndex="-1"
              aria-labelledby="textResultDataLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="textResultDataLabel">
                      Result
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <textarea
                      className="form-control text-muted"
                      rows="15"
                      value={result}
                      readOnly
                    />
                  </div>
                  <div className="modal-footer">
                    <OverlayTrigger
                      placement={"top"}
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip>Copy to Clipboard.</Tooltip>}
                    >
                      <button
                        className="btn btn-success me-2"
                        onClick={handleCopySlip}
                      >
                        <i className="bi bi-copy"></i>
                      </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement={"top"}
                      delay={{ show: 250, hide: 400 }}
                      overlay={<Tooltip>Export to PDF.</Tooltip>}
                    >
                      <button
                        className="btn btn-secondary"
                        onClick={handlePrintPdf}
                      >
                        <i className="bi bi-filetype-pdf"></i>
                      </button>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <p className="text-muted small mb-0">
              Made with ❤️ by{" "}
              <a
                href="https://github.com/Aarishmughal"
                target="_blank"
                rel="noopener noreferrer"
              >
                Muhammad Aarish Mughal
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
