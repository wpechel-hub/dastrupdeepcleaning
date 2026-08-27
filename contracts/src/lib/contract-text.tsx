type ContractFields = {
  clientName: string;
  serviceAddress: string;
  frequency: string;
  startDate: string;
  rate: string;
  billingContact: string;
  billingEmail: string;
  billingPhone: string;
};

/** Dastrup Deep Cleaning's real Service Agreement, parameterized per client. */
export function ContractBody({ f }: { f: ContractFields }) {
  return (
    <div className="prose-contract text-[#1a1a1a] leading-relaxed">
      <p>
        <strong className="text-[#1B4B7A]">{f.clientName}</strong> (&ldquo;Client&rdquo;) hereby accepts the
        proposal of <strong>DASTRUP DEEP CLEANING</strong> (&ldquo;Company&rdquo;) for janitorial services
        provided at the following address:
      </p>

      <div className="text-center my-4">
        <p className="font-bold uppercase m-0">{f.clientName}</p>
        <p className="m-0">{f.serviceAddress}</p>
        <p className="m-0">with the following terms:</p>
      </div>

      <ol className="contract-clauses">
        <li>
          Effective <strong className="text-[#1B4B7A]">{f.startDate}</strong>, Company will arrange for delivery
          for the professional commercial cleaning services described on the preceding &ldquo;Service
          Schedule&rdquo; <strong className="text-[#1B4B7A]">{f.frequency}</strong> at a monthly fee of:{" "}
          <strong className="text-[#1B4B7A]">{f.rate}</strong>
          <ul>
            <li>
              Any additional services not included within the prescribed Service Schedule are available upon
              request at an additional charge. Additionally, Client may purchase consumable toiletry and other
              supplies through Company. Please see attached pricing list.
            </li>
          </ul>
        </li>
        <li>
          Client accepts that the services provided under the Service Schedule/Scope-of-Work will be delegated by
          Company to an independently-owned Dastrup Deep Cleaning (Service Provider), which will provide the
          necessary labor and cleaning service related equipment and supplies at its own expense.
        </li>
        <li>
          Client agrees to inform Company if dissatisfied with the Service Provider or its services. Additionally,
          Client shall allow Company fair treatment and reasonable time to correct deficient services including
          absenteeism, without punitive action. Client agrees to issue a thirty (30) day written probationary
          notice to Company in which Company may cure unsatisfactory services.
        </li>
        <li>
          The monthly fee amount specified above in Paragraph 1 is valid for one (1) year from the date of this
          Agreement for the services specified within the Service Schedule/Scope-of-Work, and such is to be
          delivered at the intervals provided as specified therein. Thereafter, Company may modify the monthly fee
          upon providing a minimum of twenty (20) days advance written notice to Client of an impending adjustment.
          Either Client or Company may terminate this Agreement by providing thirty (30) days advance written
          notice of cancellation to the other party. Any other modifications to this Agreement must be executed
          via Contract Amendment, signed by both Client and Company. This agreement automatically renews unless
          Client or Company provides thirty (30) days advance written notice of cancellation during a period to
          the other party.
        </li>
        <li>
          Company will invoice at the beginning of each month for that month&apos;s services, and payments are due
          by the 5th day of the following month. Payments not received by the 10th day of the month in which such
          payment is due are considered delinquent and shall be subject to late fees for each 30-day period of
          delinquency until the account is paid in full. Company may suspend services pending receipt of late
          payments, without liability. Monthly Fee charges exclude any use tax; tax on sales, services, or
          supplies; or any other such tax, which are payable by Client. Client agrees to reimburse Company for any
          taxes paid by Company on Client&apos;s behalf. Company will remit amounts due the franchised business
          according to the applicable agreement.
          <p className="font-bold text-red-700 mt-2 mb-1">Invoices for services should be sent to:</p>
          <div className="grid sm:grid-cols-3 gap-2 text-sm">
            <div>
              <span className="text-[#5a6472]">Billing Contact: </span>
              <strong>{f.billingContact}</strong>
            </div>
            <div>
              <span className="text-[#5a6472]">Billing Email: </span>
              <strong>{f.billingEmail}</strong>
            </div>
            <div>
              <span className="text-[#5a6472]">Phone: </span>
              <strong>{f.billingPhone}</strong>
            </div>
          </div>
        </li>
        <li>
          Services are not provided on New Year&apos;s Day, President&apos;s Day, Memorial Day, Independence Day,
          Labor Day, Thanksgiving Day, and Christmas Day, unless separate arrangements are made in advance for an
          additional charge. Monthly Fees are not pro-rated nor reduced for non-performance of services on these
          days.
        </li>
        <li>
          Client shall not hold Company responsible for missed services due to inclement weather, natural
          disasters, major snowstorms, power outages or any other catastrophe beyond Company&apos;s control.
        </li>
        <li>
          Client agrees that during the term of this agreement, and for a period of no less than two (2) years
          from the effective date of its termination, Client will not hire nor employ any employees,
          representatives, agents, franchisees, or subcontractors of Company to perform cleaning related services
          for Client directly or indirectly.
        </li>
        <li>
          Client will deliver to Company a signed copy of this Agreement and two (2) sets of facility keys for the
          Service Provider&apos;s use, which will be returned to Client if this Agreement is cancelled. Client
          understands that Service Provider cannot make an agreement on Company&apos;s behalf.
        </li>
      </ol>
    </div>
  );
}
