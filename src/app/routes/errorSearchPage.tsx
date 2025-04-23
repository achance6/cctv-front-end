import NavBar from "@/components/navBar";
import { useSearchParams } from "react-router";
//import { useParams } from "react-router-dom";

const ErrorSearchPage = () => {
  //const { query } = useParams<{ query: string }>();
  const [searchParams, setSearchQuery] = useSearchParams();
  setSearchQuery(searchParams);

  return (
    <div>
        <NavBar />
      <h1 className="text-4xl text-center mt-8">
        Error! No videos found for this search term {searchParams.get("query")}
        </h1>

    </div>
  );
};

export default ErrorSearchPage;