export function getSalesSlipTemplate(details, profit) {
    return `
==============================
        SALES SLIP
==============================
Title       : ${details.title}
Period      : ${details.startDate} → ${details.endDate}

------------------------------
Financial Summary
------------------------------
Total Sales       : PKR ${details.totalSales}
Ads Spent         : PKR ${details.totalAdsSpent}
Shirts Cost       : PKR ${details.totalShirtsCost}
Delivery Cost     : PKR ${details.totalDeliveryCost}
Print Cost        : PKR ${details.totalPrintCost}

------------------------------
TOTAL PROFIT      : ***PKR ${profit}***
==============================
       _This sales receipt may or may not be updated in the future._
==============================
`;
}
