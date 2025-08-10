import { useState } from "react";
import "./App.css";

function App() {
    const [details, setDetails] = useState({
        title: "",
        startDate: "",
        endDate: "",
        totalSales: 0,
        totalAdsSpent: 0,
        totalShirtsCost: 0,
        totalDeliveryCost: 0,
        totalPrintCost: 0,
    });
    const [result, setResult] = useState("Result will be shown here...");

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setDetails((prevDetails) => ({
            ...prevDetails,
            [name]: type === "number" ? Number(value) : value,
        }));
    };

    const calculateProfit = () => {
        const {
            totalSales,
            totalAdsSpent,
            totalShirtsCost,
            totalDeliveryCost,
            totalPrintCost,
        } = details;
        return (
            Number(totalSales) -
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
            `${details.title}
(*${details.startDate}* - *${details.endDate}*)
            --------------------------
            Total Sales: PKR ${details.totalSales}
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
        navigator.clipboard.writeText(result);
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div
                    className="card shadow-lg"
                    style={{ maxWidth: "700px", minWidth: "300px" }}
                >
                    <h1 className="card-header text-center">
                        Generate Sales Slips
                    </h1>
                    <div className="card-body">
                        <div className="row g-3 mb-3">
                            <div className="col-12">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        Title of Slip
                                    </span>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="title"
                                        value={details.title}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 mb-3">
                            <div className="col-lg-6 col-sm-12">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        Start Date
                                    </span>
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="startDate"
                                        value={details.startDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-12">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        End Date
                                    </span>
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="endDate"
                                        value={details.endDate}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row g-3 mb-3">
                            <div className="col-12">
                                <div className="input-group">
                                    <span className="input-group-text text-success">
                                        Total Sales
                                    </span>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="totalSales"
                                        value={details.totalSales}
                                        onChange={handleInputChange}
                                    />
                                    <span className="input-group-text">
                                        PKR
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 mb-3">
                            <div className="col-12">
                                <div className="input-group">
                                    <span className="input-group-text text-danger">
                                        Total Ads Spent
                                    </span>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="totalAdsSpent"
                                        value={details.totalAdsSpent}
                                        onChange={handleInputChange}
                                    />
                                    <span className="input-group-text">
                                        PKR
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 mb-3">
                            <div className="col-12">
                                <div className="input-group">
                                    <span className="input-group-text text-danger">
                                        Total Shirts Cost
                                    </span>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="totalShirtsCost"
                                        value={details.totalShirtsCost}
                                        onChange={handleInputChange}
                                    />
                                    <span className="input-group-text">
                                        PKR
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 mb-3">
                            <div className="col-12">
                                <div className="input-group">
                                    <span className="input-group-text text-warning">
                                        Total Delivery Cost
                                    </span>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="totalDeliveryCost"
                                        value={details.totalDeliveryCost}
                                        onChange={handleInputChange}
                                    />
                                    <span className="input-group-text">
                                        PKR
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3 mb-3">
                            <div className="col-12">
                                <div className="input-group">
                                    <span className="input-group-text text-warning">
                                        Total Print Cost
                                    </span>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="totalPrintCost"
                                        value={details.totalPrintCost}
                                        onChange={handleInputChange}
                                    />
                                    <span className="input-group-text">
                                        PKR
                                    </span>
                                </div>
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
                            Copy Slip to Clipboard
                        </button>
                    </div>
                    <div className="card-footer">
                        <textarea
                            className="form-control"
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
