import React from "react";
import Link from "next/link";

import PricesSection from "./components/PricesSection";
import QuickSearch from "./components/QuickSearch";
import SearchSection from "./components/SearchSection";
import RecommendProfessionals from "./components/RecommendProfessionals";
import Feedbacks from "./components/Feedbacks";

export default function Home() {

  return (
    <>
      <div>
        <SearchSection />
        <PricesSection />
        {/* <Feedbacks /> */}
      </div>
    </>
  )
}
