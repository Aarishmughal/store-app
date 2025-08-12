import round from "./utils/round";

export function getSalesSlipPdfTemplate(totalProfit, details, sales, shopifyFee, safetyDeposit, claimableProfit) {
  const totalSalesSum = Array.isArray(details.totalSales) ? details.totalSales.reduce((acc, val) => acc + Number(val), 0) : Number(details.totalSales);

  let salesRows = "";
  if (Array.isArray(sales) && sales.length > 0) {
    salesRows = sales
      .map(
        (sale, idx) => `
            <tr>
                <td>${idx + 1}</td>
                <td>${sale.orderNumber || ""}</td>
                <td>${sale.shirtsCount || ""}</td>
                <td class="currency">PKR ${round(sale.totalPayable || 0)}</td>
            </tr>
        `
      )
      .join("");
  } else {
    salesRows = '<tr><td colspan="4" style="text-align:center;">No sales data</td></tr>';
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
            font-size: 16px;
        }
        .sales-slip {
            border: 1px solid #ccc;
            padding: 20px;
            max-width: 700px;
            margin: auto;
            background: white;
            box-shadow: 0 0 10px rgba(0,0,0,0.05);
        }
        h2 {
            text-align: center;
            margin-bottom: 15px;
            font-size: 1.8em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
            font-size: 1.05em;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 10px 12px;
        }
        th {
            background-color: #f5f5f5;
        }
        .section-header {
            background-color: #eee;
            font-weight: bold;
            text-align: center;
        }
        .currency {
            text-align: right;
            font-weight: bold;
        }
        .total-row td {
            font-weight: bold;
            background-color: #f2f2f2;
            font-size: 1.1em;
        }
        .highlight {
            background-color: #e8f7e8;
        }
    </style>
</head>
<body>
    <div class="sales-slip">
        <h2>Sales Slip</h2>

        <table>
            <tr class="section-header">
                <th colspan="2">${details.title}</th>
            </tr>
            <tr>
                <td>Date Range</td>
                <td>${details.startDate} - ${details.endDate}</td>
            </tr>
        </table>

        <table>
            <tr class="section-header">
                <th colspan="2">Financial Summary</th>
            </tr>
            <tr>
                <td>Total Sales</td>
                <td class="currency">PKR ${round(totalSalesSum)}</td>
            </tr>
            <tr>
                <td>Total Ads Spent</td>
                <td class="currency">PKR ${round(details.totalAdsSpent)}</td>
            </tr>
            <tr>
                <td>Total Shirts Cost</td>
                <td class="currency">PKR ${round(details.totalShirtsCost)}</td>
            </tr>
            <tr>
                <td>Total Delivery Cost</td>
                <td class="currency">PKR ${round(details.totalDeliveryCost)}</td>
            </tr>
            <tr>
                <td>Total Print Cost</td>
                <td class="currency">PKR ${round(details.totalPrintCost)}</td>
            </tr>
            <tr class="total-row">
                <td>Total Profit</td>
                <td class="currency">PKR ${round(totalProfit)}</td>
            </tr>
            <tr>
                <td>Shopify Fee</td>
                <td class="currency">PKR ${round(shopifyFee || 0)}</td>
            </tr>
            <tr>
                <td>Safety Deposit</td>
                <td class="currency">PKR ${round(safetyDeposit || 0)}</td>
            </tr>
            <tr class="total-row highlight">
                <td>Total Claimable Profit</td>
                <td class="currency">PKR ${round(claimableProfit || 0)}</td>
            </tr>
        </table>

        <table>
            <thead>
                <tr class="section-header">
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
