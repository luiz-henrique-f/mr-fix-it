import QuickSearch from "./components/QuickSearch"
import RecommendProfessionals from "./components/RecommendProfessionals"
import SearchSection from "./components/SearchSection"

export default function Home() {

  return (
    <div>
      <SearchSection />
      <QuickSearch />
      <RecommendProfessionals />
    </div>
  )
}
