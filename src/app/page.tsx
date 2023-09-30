import Link from "next/link";
import QuickSearch from "./components/QuickSearch"
import RecommendProfessionals from "./components/RecommendProfessionals"
import SearchSection from "./components/SearchSection"
import { useSession } from 'next-auth/react';

export default function Home() {

  return (
    <div>
      <SearchSection />
      {/* <QuickSearch /> */}
      {/* <RecommendProfessionals /> */}
    </div>
  )
}
