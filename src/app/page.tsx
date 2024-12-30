import React from "react";
import Link from "next/link";

import PricesSection from "./components/PricesSection";
import QuickSearch from "./components/QuickSearch";
import SearchSection from "./components/SearchSection";
import RecommendProfessionals from "./components/RecommendProfessionals";
import FeedbackSection from "./components/FeedbackSection";

export default function Home() {

  return (
    <>
      <div>
        <SearchSection />
        <PricesSection />
        <FeedbackSection />
        <h1>oi</h1>
      </div>
    </>
  )
}
