export type ContractClauseFields = {
  frequency: string;
  startDate: string;
  rate: string;
  billingContact: string;
  billingEmail: string;
  billingPhone: string;
};

/**
 * Builds the default Dastrup Deep Cleaning Service Agreement clauses as
 * plain text, with the given fields substituted in. This is the starting
 * point shown in the "Agreement Text" editor when creating a contract —
 * staff can edit it freely before sending; whatever is saved is exactly
 * what the client sees and signs.
 */
export function buildDefaultClauses(f: ContractClauseFields): string {
  const startDate = f.startDate || "____________________";

  return `1. Effective ${startDate}, Company will arrange for delivery for the professional commercial cleaning services described on the preceding "Service Schedule" ${f.frequency} at a monthly fee of: ${f.rate}

   - Any additional services not included within the prescribed Service Schedule are available upon request at an additional charge. Additionally, Client may purchase consumable toiletry and other supplies through Company. Please see attached pricing list.

2. Client accepts that the services provided under the Service Schedule/Scope-of-Work will be delegated by Company to an independently-owned Dastrup Deep Cleaning (Service Provider), which will provide the necessary labor and cleaning service related equipment and supplies at its own expense.

3. Client agrees to inform Company if dissatisfied with the Service Provider or its services. Additionally, Client shall allow Company fair treatment and reasonable time to correct deficient services including absenteeism, without punitive action. Client agrees to issue a thirty (30) day written probationary notice to Company in which Company may cure unsatisfactory services.

4. The monthly fee amount specified above in Paragraph 1 is valid for one (1) year from the date of this Agreement for the services specified within the Service Schedule/Scope-of-Work, and such is to be delivered at the intervals provided as specified therein. Thereafter, Company may modify the monthly fee upon providing a minimum of twenty (20) days advance written notice to Client of an impending adjustment. Either Client or Company may terminate this Agreement by providing thirty (30) days advance written notice of cancellation to the other party. Any other modifications to this Agreement must be executed via Contract Amendment, signed by both Client and Company. This agreement automatically renews unless Client or Company provides thirty (30) days advance written notice of cancellation during a period to the other party.

5. Company will invoice at the beginning of each month for that month's services, and payments are due by the 5th day of the following month. Payments not received by the 10th day of the month in which such payment is due are considered delinquent and shall be subject to late fees for each 30-day period of delinquency until the account is paid in full. Company may suspend services pending receipt of late payments, without liability. Monthly Fee charges exclude any use tax; tax on sales, services, or supplies; or any other such tax, which are payable by Client. Client agrees to reimburse Company for any taxes paid by Company on Client's behalf. Company will remit amounts due the franchised business according to the applicable agreement.

   Invoices for services should be sent to — Billing Contact: ${f.billingContact}   Billing Email: ${f.billingEmail}   Phone: ${f.billingPhone}

6. Services are not provided on New Year's Day, President's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving Day, and Christmas Day, unless separate arrangements are made in advance for an additional charge. Monthly Fees are not pro-rated nor reduced for non-performance of services on these days.

7. Client shall not hold Company responsible for missed services due to inclement weather, natural disasters, major snowstorms, power outages or any other catastrophe beyond Company's control.

8. Client agrees that during the term of this agreement, and for a period of no less than two (2) years from the effective date of its termination, Client will not hire nor employ any employees, representatives, agents, franchisees, or subcontractors of Company to perform cleaning related services for Client directly or indirectly.

9. Client will deliver to Company a signed copy of this Agreement and two (2) sets of facility keys for the Service Provider's use, which will be returned to Client if this Agreement is cancelled. Client understands that Service Provider cannot make an agreement on Company's behalf.`;
}
