type ContractFields = {
  clientName: string;
  serviceAddress: string;
  serviceType: string;
  frequency: string;
  startDate: string;
  rate: string;
  cancelFee: string;
};

/** Shared agreement body, used on the public /sign/[token] page (and reusable anywhere else). */
export function ContractBody({ f }: { f: ContractFields }) {
  return (
    <div className="prose-contract text-[#1a1a1a] leading-relaxed">
      <p>
        Thank you for the opportunity to work with you. At Dastrup Deep Cleaning, our mission is to give Utah
        homeowners and businesses a cleaning service they can actually rely on. This Agreement is entered into
        between Dastrup Deep Cleaning (&ldquo;Company&rdquo;) and{" "}
        <strong className="text-[#1B4B7A]">{f.clientName}</strong> (&ldquo;Client&rdquo;) for cleaning services
        performed at <strong className="text-[#1B4B7A]">{f.serviceAddress}</strong>, and outlines the terms under
        which those services will be provided.
      </p>

      <h3>1. Services</h3>
      <p>
        Dastrup Deep Cleaning provides residential and commercial cleaning services, including recurring
        maintenance cleaning, deep cleaning, move in/move out cleaning, post-construction cleanup, and specialty
        cleaning for spaces such as vacation rentals, model homes, offices, and other commercial facilities.
      </p>
      <p>
        Scope of service for this engagement: <strong className="text-[#1B4B7A]">{f.serviceType}</strong>{" "}
        performed on a <strong className="text-[#1B4B7A]">{f.frequency.toLowerCase()}</strong> basis, beginning{" "}
        <strong className="text-[#1B4B7A]">{f.startDate}</strong>. Any change to this scope must be agreed upon in
        writing by both parties.
      </p>

      <h3>2. Fees and Payment</h3>
      <ul>
        <li>
          Cleaning services are billed at a rate of <strong className="text-[#1B4B7A]">{f.rate}</strong> per visit,
          as quoted and agreed upon prior to the first appointment.
        </li>
        <li>A valid credit card or payment method must be kept on file at the time of booking.</li>
        <li>
          Payment is due in full on the day of service and may be made by cash, check, or credit/debit card. A 3%
          surcharge applies to payments made by credit card.
        </li>
        <li>Any invoice left unpaid after 7 days will be automatically charged to the payment method on file.</li>
        <li>
          Add-on services requested outside the agreed scope (e.g. inside oven, inside refrigerator, interior
          windows) will be quoted and billed separately, with the client&apos;s approval before work begins.
        </li>
        <li>
          Recurring service pricing is based on the agreed-upon frequency. Skipped or infrequently rescheduled
          visits may result in a rate adjustment to reflect actual service frequency.
        </li>
        <li>
          Travel beyond a reasonable distance from our standard service area may be subject to a travel fee,
          disclosed prior to booking.
        </li>
      </ul>

      <h3>3. Cancellation and Rescheduling Policy</h3>
      <p>
        We kindly ask that clients provide at least 24 hours&apos; notice to cancel or reschedule a scheduled
        cleaning. Cancellations with less than 24 hours&apos; notice will be billed a cancellation fee of{" "}
        <strong className="text-[#1B4B7A]">{f.cancelFee}</strong>.
      </p>
      <p>
        By signing this Agreement, the client confirms that they are authorized to enter into this contract on
        behalf of themselves or the organization named below.
      </p>

      <h3>4. Client Responsibilities and Property Access</h3>
      <p>
        The client agrees to provide our team with safe and reasonable access to the property at the scheduled
        service time (e.g. key, code, or on-site access). The client is responsible for securing pets and
        disclosing, prior to service, any known hazards, fragile items, or areas requiring special care. Dastrup
        Deep Cleaning is not responsible for delays, missed service, or additional charges resulting from denied or
        delayed access.
      </p>

      <h3>5. Satisfaction Guarantee</h3>
      <p>
        If any area cleaned does not meet the client&apos;s expectations, the client must notify Dastrup Deep
        Cleaning within 24 hours of service. We will return to re-clean the area(s) in question at no additional
        charge. This guarantee applies only to work within the agreed scope of service.
      </p>

      <h3>6. Liability, Damages and Professional Conduct</h3>
      <p>
        Dastrup Deep Cleaning is fully insured and bonded, and every team member is background-checked prior to
        their first visit. In the unlikely event of damage caused directly by our team during a scheduled service,
        the client must report it within 24 hours so it can be investigated and resolved. Dastrup Deep Cleaning is
        not liable for pre-existing damage, normal wear and tear, or damage to improperly secured, fragile, or
        high-value items not disclosed in advance. We hold all information seen or discussed while providing
        services in the strictest confidence.
      </p>

      <h3>7. License and Insurance</h3>
      <p>
        Dastrup Deep Cleaning is licensed to operate in the state of Utah and carries liability insurance for the
        protection of our clients and our team.
      </p>

      <h3>8. Agreement</h3>
      <p>IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the day and year written below.</p>
    </div>
  );
}
