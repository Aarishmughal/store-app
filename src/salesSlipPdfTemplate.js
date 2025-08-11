// salesSlipPdfTemplate.js
// Exports a function that returns the HTML for the printable PDF slip

export function getSalesSlipPdfTemplate(totalProfit, details, sales) {
    // Calculate total sales sum if it's an array
    const totalSalesSum = Array.isArray(details.totalSales)
        ? details.totalSales.reduce((acc, val) => acc + Number(val), 0)
        : Number(details.totalSales);
    // Render each sale as a row
    let salesRows = "";
    if (Array.isArray(sales) && sales.length > 0) {
        salesRows = sales
            .map(
                (sale, idx) => `
            <tr>
                <td>${idx + 1}</td>
                <td>${sale.orderNumber || ""}</td>
                <td>${sale.shirtsCount || ""}</td>
                <td>PKR ${sale.totalPayable || ""}</td>
            </tr>
        `
            )
            .join("");
    } else {
        salesRows = '<tr><td colspan="4">No sales data</td></tr>';
    }
    return `
<html>
<head>
    <title>Sales Slip PDF</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            margin: 40px;
            background-color: #fafafa;
            font-size: 16px; /* Increased base size */
        }
        .sales-slip {
            border: 1px solid #ccc;
            padding: 20px;
            max-width: 500px;
            margin: auto;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        h2 {
            text-align: center;
            margin-bottom: 15px;
            font-size: 1.7em; /* Increased from 1.5em */
        }
        .meta-table, .details-table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
            font-size: 1.05em; /* Slight bump */
        }
        th, td {
            border: 1px solid #ddd;
            padding: 10px 12px;
        }
        th {
            background-color: #f9f9f9;
        }
        .details-table th {
            text-align: left;
        }
        .total-row td {
            font-weight: bold;
            background-color: #f2f2f2;
            font-size: 1.1em;
        }
        .currency {
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="sales-slip">
        <h2>Sales Slip</h2>
        <table class="meta-table">
            <tr>
                <th colspan="2">${details.title}</th>
            </tr>
            <tr>
                <td>Date Range</td>
                <td>${details.startDate} - ${details.endDate}</td>
            </tr>
        </table>

        <table class="details-table">
            <tr>
                <th colspan="2">Financial Summary</th>
            </tr>
            <tr>
                <td>Total Sales</td>
                <td class="currency">PKR ${totalSalesSum}</td>
            </tr>
            <tr>
                <td>Total Ads Spent</td>
                <td class="currency">PKR ${details.totalAdsSpent}</td>
            </tr>
            <tr>
                <td>Total Shirts Cost</td>
                <td class="currency">PKR ${details.totalShirtsCost}</td>
            </tr>
            <tr>
                <td>Total Delivery Cost</td>
                <td class="currency">PKR ${details.totalDeliveryCost}</td>
            </tr>
            <tr>
                <td>Total Print Cost</td>
                <td class="currency">PKR ${details.totalPrintCost}</td>
            </tr>
            <tr class="total-row">
                <td>Total Profit</td>
                <td class="currency">PKR ${totalProfit}</td>
            </tr>
        </table>

        <table class="details-table">
            <thead>
            <tr>
                <th colspan="4">Sales Details</th>
            </tr>
                <tr>
                    <th>#</th>
                    <th>Order No.</th>
                    <th>Shirts Count</th>
                    <th>Total Payable</th>
                </tr>
            </thead>
            <tbody>
                ${salesRows}
            </tbody>
        </table>
    <p style="text-align:center;font-size:13px;margin-top:10px;font-style:italic">
        This sales receipt may or may not be updated in the future.
    </p>
    </div>
</body>
</html>
    `;
}
