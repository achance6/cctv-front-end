import NavBar from "@/components/navBar";
import { useParams } from "react-router";
import { Heading, View } from "@aws-amplify/ui-react";

const SearchPage = () => {
  const params = useParams();
  const query = params.query; // Retrieve the query parameter from the URL
  console.log("Query parameter:", query); // Log the query parameter to the console

  return (
    <View>
      <NavBar />
      <Heading level={1} className="text-4xl text-center mt-8">
        Search Page
      </Heading>
    </View>
  );
};

export default SearchPage;