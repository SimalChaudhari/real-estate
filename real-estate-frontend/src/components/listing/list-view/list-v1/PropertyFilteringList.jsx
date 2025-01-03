"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingsFailure, fetchListingsStart, fetchListingsSuccess } from "@/app/features/listingsSlice";
import { GetList } from "@/services/listing/listingApi";
import ListingSidebar from "../../sidebar";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";

export default function PropertyFilteringList() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const listingsData = useSelector((state) => state.listings?.listings);

  const [listings2, setListings2] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [colstyle, setColstyle] = useState(false);

  // Extract initial filter values from query string
  const keyword = searchParams.get("keyword")?.toLowerCase();
  const initialTab = searchParams.get("status")?.toLowerCase() || "all"; // Ensure lowercase for consistency

  const initialPriceMin = parseInt(searchParams.get("priceMin")) || 0;
  const initialPriceMax = parseInt(searchParams.get("priceMax")) || 100000;
  const initialPropertyType = searchParams.get("propertyType") || null;
  const initialCity = searchParams.get("city") || "All Cities";
  const initialArea = searchParams.get("area") || "All Areas"; // Added `area` extraction


  // Filter states
  const [listingStatus, setListingStatus] = useState("All");
  const [propertyTypes, setPropertyTypes] = useState(
    initialPropertyType ? [initialPropertyType] : []
  );
  const [priceRange, setPriceRange] = useState([initialPriceMin, initialPriceMax]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [location, setLocation] = useState(initialCity);
  const [area, setArea] = useState(initialArea); // Added area state
  const [sqftRange, setSqftRange] = useState([]);
  const [yearBuild, setYearBuild] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(keyword || "");

  // Fetch listings on component mount
  useEffect(() => {
    const fetchListings = async () => {
      dispatch(fetchListingsStart());
      try {
        const data = await GetList();
        if (data.success) {
          setListings2(data.data || []);
          dispatch(fetchListingsSuccess(data.data || []));
        } else {
          dispatch(fetchListingsFailure("Failed to fetch listings."));
        }
      } catch (error) {
        dispatch(fetchListingsFailure(error.message || "An error occurred."));
      }
    };
    fetchListings();
  }, [dispatch]);

  // Update filtered data based on filters
  useEffect(() => {
    const filteredItems = listingsData.filter((item) => {
      const matchesStatus =
        listingStatus === "All" ||
        (listingStatus === "Buy" && !item.availability.forRent) ||
        (listingStatus === "Rent" && item.availability.forRent);

      const matchesPropertyType =
        propertyTypes?.length === 0 || propertyTypes.includes(item.propertyType);

      const matchesPrice =
        item.price.rent >= priceRange[0] && item.price.rent <= priceRange[1];

      const matchesBedrooms = item.bed >= bedrooms;
      const matchesBathrooms = item.bath >= bathrooms;

      const matchesLocation =
        location === "All Cities" || item.address.city === location;

        const matchesArea =
        area === "All Areas" || item.address.area === area; // Area matching logic

      const matchesSqft =
        sqftRange.length === 0 ||
        (item.sqft >= sqftRange[0] && item.sqft <= sqftRange[1]);

      const matchesYearBuild =
        yearBuild.length === 0 ||
        (item.yearBuilding >= yearBuild[0] && item.yearBuilding <= yearBuild[1]);

      const matchesSearchQuery =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.state.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesStatus &&
        matchesPropertyType &&
        matchesPrice &&
        matchesBedrooms &&
        matchesBathrooms &&
        matchesLocation &&
        matchesArea && // Include area matching
        matchesSqft &&
        matchesYearBuild &&
        matchesSearchQuery
      );
    });

    setFilteredData(filteredItems);
  }, [
    listingsData,
    listingStatus,
    propertyTypes,
    priceRange,
    bedrooms,
    bathrooms,
    location,
    area, // Add area to dependency array
    sqftRange,
    yearBuild,
    searchQuery,
  ]);

  // Update sorted data
  useEffect(() => {
    setPageNumber(1);
    let sortedData = [...filteredData];

    if (currentSortingOption === "Newest") {
      sortedData.sort((a, b) => b.yearBuilding - a.yearBuilding);
    } else if (currentSortingOption === "Price Low") {
      sortedData.sort((a, b) => a.price.rent - b.price.rent);
    } else if (currentSortingOption === "Price High") {
      sortedData.sort((a, b) => b.price.rent - a.price.rent);
    }

    setSortedFilteredData(sortedData);
  }, [filteredData, currentSortingOption]);

  // Update page items
  useEffect(() => {
    const itemsPerPage = 6;
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = pageNumber * itemsPerPage;

    setPageItems(sortedFilteredData.slice(startIndex, endIndex));
    setPageContentTrac([startIndex + 1, endIndex, sortedFilteredData.length]);
  }, [sortedFilteredData, pageNumber]);

  const resetFilter = () => {
    setListingStatus("All");
    setPropertyTypes([]);
    setPriceRange([0, 100000]);
    setBedrooms(0);
    setBathrooms(0);
    setLocation("All Cities");
    setArea("All Areas"); // Reset area
    setSqftRange([]);
    setYearBuild([]);
    setCategories([]);
    setSearchQuery("");
    setCurrentSortingOption("Newest");
  };

  return (
    <div>
      <section className="pt0 pb90 bgc-f7">
        <div className="container">
          <div className="row gx-xl-5">
            <div className="col-lg-4 d-none d-lg-block">
              <ListingSidebar
                filterFunctions={{
                  setListingStatus,
                  setPropertyTypes,
                  setPriceRange,
                  setBedrooms,
                  setBathrooms,
                  setLocation,
                  setArea, // Added setArea
                  setSqftRange,
                  setYearBuild,
                  setCategories,
                  resetFilter,
                  setSearchQuery,
                }}
                filterData={{
                  listingStatus,
                  propertyTypes,
                  priceRange,
                  bedrooms,
                  bathrooms,
                  location,
                  area, // Added area
                  sqftRange,
                  yearBuild,
                  categories,
                  searchQuery
                }}
              />
            </div>

            <div className="col-lg-8">
              <div className="row align-items-center mb20">
                <TopFilterBar
                  pageContentTrac={pageContentTrac}
                  colstyle={colstyle}
                  setColstyle={setColstyle}
                  setCurrentSortingOption={setCurrentSortingOption}
                />
              </div>

              <div className="row mt15">
                <FeaturedListings colstyle={colstyle} data={pageItems} />
              </div>

              <div className="row">
                {sortedFilteredData.length > 6 && (
                  <PaginationTwo
                    pageCapacity={6}
                    data={sortedFilteredData}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
