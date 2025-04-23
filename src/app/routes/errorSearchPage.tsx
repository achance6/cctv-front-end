import NavBar from "@/components/navBar";
import { useSearchParams } from "react-router";
import { Heading, View } from "@aws-amplify/ui-react";

const ErrorSearchPage = () => {
  const [searchParams, setSearchQuery] = useSearchParams();
  setSearchQuery(searchParams);

  return (
    <View>
      <NavBar />
      <Heading level={1} className="text-4xl text-center mt-8">
        Error! No videos found for this search term {searchParams.get("query")}
      </Heading>
    </View>
  );
};

export default ErrorSearchPage;