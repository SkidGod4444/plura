import React from "react";
import SectionLabel from "../section/section.label";

export default function BillingSettings() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <SectionLabel
          label="Billing Settings"
          msg="Add payment information, upgrade or modify your plan."
        />
      </div>
    </div>
  );
}
