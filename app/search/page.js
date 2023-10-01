"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/context/search";
import BlogList from "@/components/blogs/BlogList";

export default function SearchPage() {
  const { setSearchQuery, searchResults, setSearchResults } = useSearch();

  const searchParams = useSearchParams();
  const query = searchParams.get("searchQuery");

  useEffect(() => {
    fetchResultsOnLoad();
  }, [query]);

  const fetchResultsOnLoad = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/search?searchQuery=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="lead">Search Results {searchResults.length}</p>
          {searchResults ? <BlogList blogs={searchResults} /> : ""}
        </div>
      </div>
    </div>
  );
}
