import { useState } from "react";
import "./App.css";
import FormField from "./components/FormField";

const SHIRT_COST = 500;
function App() {
    const [details, setDetails] = useState({
        title: `URGENT Sales Slip`,
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
        const totalSalesSum = Array.isArray(details.totalSales)
            ? details.totalSales.reduce((acc, val) => acc + Number(val), 0)
            : Number(details.totalSales);
        setResult(
            `${details.title}
(*${details.startDate}* - *${details.endDate}*)
            --------------------------
            Total Sales: PKR ${totalSalesSum}
            Total Ads Spent: PKR ${details.totalAdsSpent}
            Total Shirts Cost: PKR ${details.totalShirtsCost}
            Total Delivery Cost: PKR ${details.totalDeliveryCost}
            Total Print Cost: PKR ${details.totalPrintCost}
            --------------------------
            Total Profit: PKR ${profit}`
        );
    };

    // Handler to copy the slip to clipboard
    const handleCopySlip = (e) => {
        e.preventDefault();
        handleGetSlip(e);
        navigator.clipboard.writeText(result);
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-start vh-100 overflow-y-auto pt-5">
                <div
                    className="card shadow-sm"
                    style={{ maxWidth: "700px", minWidth: "300px" }}
                >
                    <h1 className="card-header text-center">
                        Generate Sales Slips
                    </h1>
                    <div className="card-body">
                        <div className="row g-3 mb-3">
                            <div className="col-12">
                                <FormField
                                    label="Title of Slip"
                                    type="text"
                                    name="title"
                                    value={details.title}
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
                                    value={details.startDate}
                                    handleInputChange={handleInputChange}
                                />
                            </div>
                            <div className="col-lg-6 col-sm-12">
                                <FormField
                                    label="End Date"
                                    type="date"
                                    name="endDate"
                                    value={details.endDate}
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
                            Add Sales
                        </button>
                        <div
                            class="modal fade"
                            id="salesModal"
                            tabindex="-1"
                            aria-labelledby="salesModalLabel"
                            aria-hidden="true"
                        >
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1
                                            class="modal-title fs-5"
                                            id="salesModalLabel"
                                        >
                                            Add Sales
                                        </h1>
                                        <button
                                            type="button"
                                            class="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div class="modal-body">
                                        <div className="row g-3 mb-3">
                                            <div className="col-12">
                                                <FormField
                                                    label="Order No."
                                                    type="text"
                                                    name="orderNumber"
                                                    value={
                                                        sale.orderNumber || ""
                                                    }
                                                    handleInputChange={
                                                        handleSaleChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-12">
                                                <FormField
                                                    label="Shirts Count"
                                                    type="number"
                                                    name="shirtsCount"
                                                    value={
                                                        sale.shirtsCount || ""
                                                    }
                                                    handleInputChange={
                                                        handleSaleChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="row g-3 mb-3">
                                            <div className="col-12">
                                                <FormField
                                                    label="Total Payable"
                                                    type="number"
                                                    name="totalPayable"
                                                    value={
                                                        sale.totalPayable || ""
                                                    }
                                                    handleInputChange={
                                                        handleSaleChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button
                                            type="button"
                                            class="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-primary"
                                            data-bs-dismiss="modal"
                                            onClick={calculateTotalSales}
                                        >
                                            Save changes
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
                                        Array.isArray(details.totalSales)
                                            ? details.totalSales.reduce(
                                                  (acc, val) =>
                                                      acc + Number(val),
                                                  0
                                              )
                                            : details.totalSales
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
                                    value={details.totalAdsSpent}
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
                                    value={details.totalShirtsCost}
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
                                    value={details.totalDeliveryCost}
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
                                    value={details.totalPrintCost}
                                    currency="PKR"
                                    handleInputChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <hr />
                        <div className="row g-3 mb-3">
                            <div className="col-12">
                                <div className="input-group">
                                    <span className="input-group-text text-success">
                                        Total Profit
                                    </span>
                                    <input
                                        className="form-control"
                                        type="number"
                                        value={calculateProfit()}
                                        disabled
                                        readOnly
                                    />
                                    <span className="input-group-text">
                                        PKR
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary me-2"
                            onClick={handleGetSlip}
                        >
                            Get Slip
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={handleCopySlip}
                        >
                            <i class="bi bi-copy"></i>
                        </button>
                    </div>
                    <div className="card-footer">
                        <textarea
                            className="form-control text-muted"
                            rows="5"
                            value={result}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
