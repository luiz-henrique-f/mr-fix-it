import React from "react";
import Link from "next/link";

import PricesPage from "./components/Prices";
import QuickSearch from "./components/QuickSearch";
import SearchSection from "./components/SearchSection";
import RecommendProfessionals from "./components/RecommendProfessionals";

export default function Home() {

  return (
    <>
      <div>
        <SearchSection />
        <PricesPage />


        {/* <QuickSearch /> */}
        {/* <RecommendProfessionals /> */}
      </div>
    </>
  )
}
