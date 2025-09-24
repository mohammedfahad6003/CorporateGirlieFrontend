"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { products, sortOptions } from "@/utils/commonJson";
import Loading from "./loading";
import ErrorComponent from "./error";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProductsContainer from "@/components/ContainerStyles/ProductsContainer";
import ProductsSection from "@/components/ProductsMainSection/PageFilterSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Slider from "@/components/Slider/Slider";
import SelectableList from "@/components/SelectableList/SelectableList";
import { getChildMenuInfo } from "@/utils/menusHelper";
import NotFound from "./not-found";
import Card from "@/components/Cards/Cards";
import HorizontalCard from "@/components/Cards/HorizontalCards";
import Button from "@/components/Button/Button";

interface Props {
  params: Promise<{ slug: string[] }>;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const ResinArtTypesPage = ({ params }: Props) => {
  const { slug } = use(params);
  const [category] = slug;

  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"filter" | "sort">("filter");
  const viewMode = useSelector((state: RootState) => state.viewMode.viewMode);

  // Actual applied states
  const [price, setPrice] = useState(200);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  // Temporary states (for modal only)
  const [tempPrice, setTempPrice] = useState(200);
  const [tempSort, setTempSort] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5"
        );
        if (!res.ok) throw new Error("Failed to fetch todos");
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    setTimeout(fetchTodos, 2000);
  }, []);

  console.log(todos);

  useEffect(() => {
    if (isOpen) {
      setTempPrice(price);
      setTempSort(selectedSort);
    }
  }, [isOpen, price, selectedSort]);

  // Apply Filters
  const handleApplyFilters = () => {
    setPrice(tempPrice);
    setIsOpen(false);
  };

  // Apply Sort
  const handleApplySort = () => {
    setSelectedSort(tempSort);
    setIsOpen(false);
  };

  // Close modal when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const pageInfo = getChildMenuInfo(category, "/resin-art");

  if (!pageInfo) {
    return <NotFound />;
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorComponent
        error={new Error(error)}
        reset={() => location.reload()}
      />
    );
  }

  return (
    <>
      <ProductsContainer>
        <ProductsSection
          title={String(pageInfo?.title)}
          description={String(pageInfo?.description)}
          price={price}
          selectedSort={selectedSort}
          setIsOpen={setIsOpen}
          setActiveTab={setActiveTab}
          setPrice={setPrice}
          setSelectedSort={setSelectedSort}
        />

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 mt-4"
              : "grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mt-4"
          }
        >
          {products?.map((product) =>
            viewMode === "grid" ? (
              <Card key={product.id} product={product} />
            ) : (
              <HorizontalCard key={product.id} product={product} />
            )
          )}
        </div>
      </ProductsContainer>

      {isOpen && (
        <div
          className={`fixed inset-0 z-40 flex items-end sm:items-center justify-center overflow-y-auto bg-black/75 transition-opacity duration-300 ease-out`}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          <div
            ref={modalRef}
            className={`relative w-full sm:max-w-md mx-auto transform transition-transform duration-300 ease-out
              ${
                darkMode
                  ? "bg-black text-white border-2 border-yellow-400"
                  : "bg-white text-gray-900"
              }
              sm:rounded-xl rounded-t-none shadow-2xl max-h-[90vh] flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4 sm:p-6 relative">
              {/* Tabs */}
              <div className="flex w-full">
                <button
                  onClick={() => setActiveTab("filter")}
                  className={`flex-1 text-center text-base sm:text-lg font-medium pb-2 border-b-2 sm:border-b-4 transition-colors cursor-pointer ${
                    activeTab === "filter"
                      ? darkMode
                        ? "border-yellow-400 text-yellow-400"
                        : "border-yellow-400 text-black"
                      : darkMode
                      ? "border-transparent text-white"
                      : "border-transparent text-gray-900"
                  }`}
                >
                  Filters
                </button>
                <button
                  onClick={() => setActiveTab("sort")}
                  className={`flex-1 text-center text-base sm:text-lg font-medium pb-2 border-b-2 sm:border-b-4 transition-colors cursor-pointer ${
                    activeTab === "sort"
                      ? darkMode
                        ? "border-yellow-400 text-yellow-400"
                        : "border-yellow-400 text-black"
                      : darkMode
                      ? "border-transparent text-white"
                      : "border-transparent text-gray-900"
                  }`}
                >
                  Sort By
                </button>
              </div>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className={`hidden sm:inline absolute right-2 top-1/4 -translate-y-1/2 p-2 rounded-full transition-colors cursor-pointer ${
                  darkMode
                    ? "text-yellow-400 hover:text-yellow-300"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-4 sm:p-6 h-[25vh] sm:h-[45vh] overflow-y-auto flex flex-col gap-2 sm:gap-5">
              {activeTab === "filter" ? (
                <>
                  {/* Slider uses tempPrice */}
                  <Slider
                    label="Price Range"
                    min={200}
                    max={10000}
                    step={200}
                    value={tempPrice}
                    unit="₹"
                    onChange={setTempPrice}
                  />
                </>
              ) : (
                <>
                  {/* Sort uses tempSort */}
                  <SelectableList
                    items={sortOptions}
                    selected={tempSort}
                    onSelect={setTempSort}
                    multiSelect={false}
                  />
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 sm:p-6 border-t flex justify-center">
              <Button
                label={activeTab === "filter" ? "Apply Filters" : "Apply Sort"}
                onClick={
                  activeTab === "filter" ? handleApplyFilters : handleApplySort
                }
                variant="filled"
                className={`sm:w-[75%] w-[60%] py-3 text-sm sm:text-base rounded-xl 
                  font-semibold cursor-pointer transition-shadow duration-200 shadow-sm`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResinArtTypesPage;
