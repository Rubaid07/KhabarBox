export const dynamic = "force-dynamic";
import { getAllMeals } from "@/lib/api-meals";
import { Meal } from "@/types/meal";
import PaginationControls from "@/components/ui/pagination-controls";
import { UtensilsCrossed, Flame, ChevronRight } from "lucide-react";
import MealFilters from "@/components/meal/meal-filters";
import MealCard from "@/components/meal/meal-card";
import Link from "next/link";
import { Suspense } from "react";

interface MealsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

type SearchParamsType = { [key: string]: string | string[] | undefined };

// Skeleton
function MealsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse"
        >
          <div className="aspect-4/3 bg-gray-200" />

          <div className="p-4 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />

            <div className="flex gap-2 mt-2">
              <div className="h-5 bg-gray-200 rounded-full w-16" />
              <div className="h-5 bg-gray-200 rounded-full w-16" />
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="h-6 bg-gray-200 rounded w-24" />
            </div>

            <div className="h-10 bg-gray-200 rounded-lg w-full mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function MealsContent({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const filters = {
    page: Number(searchParams.page) || 1,
    limit: 12,
    search: searchParams.search as string,
    categoryId: searchParams.categoryId as string,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    dietaryTags: searchParams.dietaryTags
      ? (searchParams.dietaryTags as string).split(",")
      : [],
    sortBy: (searchParams.sortBy as string) || "createdAt",
    sortOrder: (searchParams.sortOrder as "asc" | "desc") || "desc",
  };

  const { data: meals, metaData } = await getAllMeals(filters);

  if (!meals || meals.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <UtensilsCrossed className="w-12 h-12 text-orange-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          No meals found
        </h2>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          We couldn&apos;t find any meals matching your criteria. Try adjusting
          your search or filters.
        </p>
        <Link
          href="/meals"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
        >
          Clear Filters
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {meals.map((meal: Meal, index: number) => (
          <MealCard key={meal.id} meal={meal} index={index} />
        ))}
      </div>

      {metaData && metaData.totalPages > 1 && (
        <div className="mt-12">
          <PaginationControls meta={metaData} />
        </div>
      )}
    </>
  );
}

export default async function AllMealsPage({ searchParams }: MealsPageProps) {
  const resolvedParams = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="lg:container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-orange-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">All Meals</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame className="w-6 h-6 text-orange-500" />
                <span className="text-orange-500 font-semibold text-sm uppercase tracking-wide">
                  Browse Menu
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                All Meals
              </h1>
              <p className="text-gray-600 mt-2">
                Discover delicious dishes from our top restaurants
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-8">
          <MealFilters />
        </div>

        <Suspense
          fallback={
            <div className="space-y-8">
              <div className="flex justify-end">
                <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
              </div>

              <MealsGridSkeleton />

              <div className="mt-12 flex justify-center">
                <div className="h-12 w-96 bg-gray-200 rounded-lg animate-pulse" />
              </div>
            </div>
          }
        >
          <MealsContent searchParams={resolvedParams} />
        </Suspense>
      </div>
    </div>
  );
}
