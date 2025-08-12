export function getSalesSlipTemplate(
    details,
    profit,
    shopifyFee,
    safetyDeposit,
    claimableProfit
) {
    return `📄 *Sales Slip*

📝 *Title:* ${details.title}
📅 *Period:* ${details.startDate} → ${details.endDate}

💰 *Financial Summary*
• Total Sales: PKR ${details.totalSales}
• Ads Spent: PKR ${details.totalAdsSpent}
• Shirts Cost: PKR ${details.totalShirtsCost}
• Delivery Cost: PKR ${details.totalDeliveryCost}
• Print Cost: PKR ${details.totalPrintCost}

💵 *Profit:* PKR ${profit}
🏷 *Shopify Fee:* PKR ${shopifyFee}
💳 *Safety Deposit:* PKR ${safetyDeposit}

✅ *Total Claimable Profit:* PKR ${claimableProfit}

_This sales receipt may or may not be updated in the future._
`;
}
