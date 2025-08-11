export function getSalesSlipTemplate(details, profit) {
    return `${details.title}
(${details.startDate} - ${details.endDate})
            Total Sales: PKR ${details.totalSales}
            Total Ads Spent: PKR ${details.totalAdsSpent}
            Total Shirts Cost: PKR ${details.totalShirtsCost}
            Total Delivery Cost: PKR ${details.totalDeliveryCost}
            Total Print Cost: PKR ${details.totalPrintCost}
            --------------------------
            Total Profit: *PKR ${profit}*`;
}
