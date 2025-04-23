
import NavBar from "@/components/navBar";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const params = useParams()
  const query = params.query; // Retrieve the query parameter from the URL  
  console.log("Query parameter:", query); // Log the query parameter to the console

  return (
    <div>
      <NavBar />
      <h1 className="text-4xl text-center mt-8">Search Page</h1>
      <h1 className="text-4xl text-center mt-8">
        
      </h1>
      
    </div>
  );
};

export default SearchPage;