import { useState } from "react";
import "./App.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FormField from "./components/FormField";
import { SHIRT_COST, SHOPIFY_FEE_PER_DAY, SAFETY_DEPOSIT_PERCENTAGE } from "./constants";
import { getSalesSlipTemplate } from "./salesSlipTemplate";
import { getSalesSlipPdfTemplate } from "./salesSlipPdfTemplate";
import round from "./utils/round";
import getToday from "./utils/getToday";
import getTotalDays from "./utils/getTotalDays";
import SaleText from "./components/SaleText";
import AddSale from "./components/AddSale";
import ViewSales from "./components/ViewSales";
function App() {
  const [details, setDetails] = useState({
    title: `Sales Slip`,
    startDate: getToday(),
    endDate: getToday(),
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
      totalShirtsCost: prevDetails.totalShirtsCost + sale.shirtsCount * SHIRT_COST,
    }));
    setSale({
      orderNumber: 0,
      shirtsCount: 0,
      totalPayable: 0,
    });
  };
  const calculateShopifyFee = () => {
    return SHOPIFY_FEE_PER_DAY * getTotalDays(details.startDate, details.endDate);
  };
  const calculateSafetyDeposit = () => {
    return (calculateProfit() - calculateShopifyFee()) * SAFETY_DEPOSIT_PERCENTAGE;
  };
  const calculateClaimableProfit = () => {
    return calculateProfit() - calculateShopifyFee() - calculateSafetyDeposit();
  };
  const calculateProfit = () => {
    const { totalSales, totalAdsSpent, totalShirtsCost, totalDeliveryCost, totalPrintCost } = details;
    const totalSalesSum = Array.isArray(totalSales) ? totalSales.reduce((acc, val) => acc + Number(val), 0) : Number(totalSales);
    return totalSalesSum - Number(totalAdsSpent) - Number(totalShirtsCost) - Number(totalDeliveryCost) - Number(totalPrintCost);
  };

  const handleGetSlip = (e) => {
    e.preventDefault();
    const profit = calculateProfit();
    setResult(getSalesSlipTemplate(details, profit, calculateShopifyFee(), calculateSafetyDeposit(), calculateClaimableProfit()));
  };

  // Handler to copy the slip to clipboard
  const handleCopySlip = (e) => {
    e.preventDefault();
    handleGetSlip();
    navigator.clipboard.writeText(result);
  };

  const handlePrintPdf = () => {
    const profit = calculateProfit();
    const pdfHtml = getSalesSlipPdfTemplate(profit, details, salesHistory, calculateShopifyFee(), calculateSafetyDeposit(), calculateClaimableProfit());
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(pdfHtml);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-start vh-100 pt-5">
        <div className="shadow-sm" style={{ width: "600px" }}>
          <h1 className="mb-2">Generate Sales Slips</h1>
          <div className="row g-3 mb-3">
            <div className="col-12">
              <FormField label="Title of Slip" type="text" name="title" value={details.title || ""} handleInputChange={handleInputChange} />
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-lg-6 col-sm-12">
              <FormField label="Start Date" type="date" name="startDate" value={details.startDate || ""} handleInputChange={handleInputChange} />
            </div>
            <div className="col-lg-6 col-sm-12">
              <FormField label="End Date" type="date" name="endDate" value={details.endDate || ""} handleInputChange={handleInputChange} />
            </div>
          </div>
          <hr />
          <div className="d-flex gap-3  mb-3">
            <button className="btn btn-success w-100" data-bs-toggle="modal" data-bs-target="#addSalesModal">
              <i className="bi bi-database-fill-add me-2"></i>Add New Sale
            </button>
            <button className="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#salesModal">
              <i className="bi bi-database-fill-add me-2"></i>View Added Sales
            </button>
          </div>
          <AddSale sale={sale} handleSaleChange={handleSaleChange} calculateTotalSales={calculateTotalSales} />
          <ViewSales sales={salesHistory} />
          <div className="row g-3 mb-3">
            <div className="col-12">
              <FormField
                label="Total Sales"
                type="number"
                className="text-info"
                name="totalSales"
                value={(Array.isArray(details.totalSales) ? details.totalSales.reduce((acc, val) => acc + Number(val), 0) : details.totalSales) || ""}
                currency="PKR"
                handleInputChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-12">
              <FormField label="Ads Spent" type="number" className="text-danger" name="totalAdsSpent" value={details.totalAdsSpent || ""} currency="PKR" handleInputChange={handleInputChange} />
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-12">
              <FormField label="Shirts Cost" type="number" className="text-danger" name="totalShirtsCost" value={details.totalShirtsCost || ""} currency="PKR" handleInputChange={handleInputChange} />
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
              <FormField label="Print Cost" type="number" className="text-warning" name="totalPrintCost" value={details.totalPrintCost || ""} currency="PKR" handleInputChange={handleInputChange} />
            </div>
          </div>
          <hr />
          <div className="row g-3 mb-3">
            <div className="col-12">
              <FormField label="Total Profit" type="number" className="text-info" name="totalPrintCost" value={round(calculateProfit()) || ""} currency="PKR" disabled>
                <OverlayTrigger placement={"top"} delay={{ show: 250, hide: 400 }} overlay={<Tooltip>Total Profit after deducting regular expenses.</Tooltip>}>
                  <i className="bi bi-info-circle-fill ms-2" style={{ cursor: "pointer" }}></i>
                </OverlayTrigger>
              </FormField>
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-12">
              <FormField label="Shopify Fee" type="number" className="text-warning" name="shopifyFee" value={round(calculateShopifyFee()) || ""} currency="PKR" disabled>
                <OverlayTrigger
                  placement={"top"}
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip>
                      Fee for Shopify Store, collected once every week. Should be about <strong>{round(calculateShopifyFee()) || "0"}PKR</strong> for stability.
                    </Tooltip>
                  }
                >
                  <i className="bi bi-info-circle-fill ms-2" style={{ cursor: "pointer" }}></i>
                </OverlayTrigger>
              </FormField>
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-12">
              <FormField label="Safety Deposit" type="number" className="text-warning" name="safetyDeposit" value={round(calculateSafetyDeposit()) || ""} currency="PKR" disabled>
                <OverlayTrigger
                  placement={"top"}
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip>
                      <strong>20%</strong> Fee collected as a safety measure, collected once every week. Important in case of unexpected expenses.
                    </Tooltip>
                  }
                >
                  <i className="bi bi-info-circle-fill ms-2" style={{ cursor: "pointer" }}></i>
                </OverlayTrigger>
              </FormField>
            </div>
          </div>
          <div className="row g-3 mb-3">
            <div className="col-12">
              <FormField label="Total Claimable Profit" type="number" className="text-success" name="totalClaimableProfit" value={round(calculateClaimableProfit()) || ""} currency="PKR" disabled>
                <OverlayTrigger
                  placement={"top"}
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip>
                      Final amount classed as <strong>Claimable Profit</strong>, which can be withdrawn by owners.
                    </Tooltip>
                  }
                >
                  <i className="bi bi-info-circle-fill ms-2" style={{ cursor: "pointer" }}></i>
                </OverlayTrigger>
              </FormField>
            </div>
          </div>
          <button className="btn btn-primary me-2" onClick={handleGetSlip} data-bs-toggle="modal" data-bs-target="#textResultData">
            Get Slip
          </button>
          <SaleText text={result} copyFunction={handleCopySlip} exportPdfFunction={handlePrintPdf} />
          <div className="mt-3 pb-3">
            <p className="text-muted small mb-0">
              Made with ❤️ by{" "}
              <a href="https://github.com/Aarishmughal" target="_blank" rel="noopener noreferrer">
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
