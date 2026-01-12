// components/Pricing.tsx

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PricingProps {
  pricingList: any;
}

const Pricing: React.FC<PricingProps> = ({ pricingList }) => {
  console.log(pricingList, 'oalsdplasd');
  return (
    <div className="text-lg text-body-secondary">
      <Accordion type="single" collapsible className="flex flex-col gap-4 ">
        {pricingList.map((pricing, index) => {
          return (
            <AccordionItem key={index} value={`item-${index}`} className="group border-b-0 [&[data-state=open]]:border-2 [&[data-state=open]]:rounded-lg">
              <AccordionTrigger className="bg-wild-sand-100 w-full px-8 py-4 rounded-lg group-hover:no-underline [&[data-state=open]]:bg-transparent [&[data-state=open]]:py-0 [&[data-state=open]]:pt-4">
                <div>
                  <span className="flex gap-8">
                    <p className="text-lg">{pricing.name}</p>
                    <p className="flex-1 font-bold text-lg">{`${pricing.minGroupSize} - ${pricing.maxGroupSize}`} People</p>
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-md px-8 py-4">
                <hr className="w-full pb-4"/>
                <div className="w-2/3 flex flex-col gap-6">
                  {pricing.standardPricing != null &&
                  pricing.standardInclusions != null ? (
                    <div>
                      <span className="flex justify-between text-red-400 font-bold text-base">
                        <p>Standart Package:</p>
                        <p>${pricing.standardPricing} per {pricing.pricingType.slice(3).toLowerCase()}</p>
                      </span>
                      <ul className="flex flex-col gap-3 ml-16 list-[circle] font-semibold mt-3">
                        {pricing.standardInclusions.map((item, index) => {
                          return <li key={index} className="pl-[10px]">{item}</li>;
                        })}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                  {pricing.premiumPricing != null &&
                  pricing.premiumInclusions != null ? (
                    <div>
                      <span className="flex justify-between text-red-400 font-bold text-base">
                        <p>Premium Package:</p>
                        <p>${pricing.premiumPricing} per {pricing.pricingType.slice(3).toLowerCase()}</p>
                      </span>
                      <ul className="flex flex-col gap-3 ml-16 list-[circle] font-semibold mt-3">
                        {pricing.premiumInclusions.map((item, index) => {
                          return <li key={index} className="pl-[10px]">{item}</li>;
                        })}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                {pricing.addon != null ? (
                  <p className="w-1/2 ml-0 mt-3">
                    {pricing.addon}
                  </p>
                ) : (
                  ""
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Pricing;
