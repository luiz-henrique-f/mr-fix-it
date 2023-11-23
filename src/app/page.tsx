import Link from "next/link";
import QuickSearch from "./components/QuickSearch"
import RecommendProfessionals from "./components/RecommendProfessionals"
import SearchSection from "./components/SearchSection"
import { getSession, useSession } from 'next-auth/react';
import Login from "./login/page";
import PagamentoPlano from "./pagamentoPlano/page";

export default function Home() {

  return (
    <>
      <div>
        <SearchSection />

        <PagamentoPlano/>
        {/* <QuickSearch /> */}
        {/* <RecommendProfessionals /> */}
      </div>
    </>
  )
}
