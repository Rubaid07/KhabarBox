import { Restaurant } from "@/types/restaurant";

const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return process.env.BACKEND_URL || "http://localhost:5000";
  }
  return "/api/main";
};

const API_URL = getBaseUrl();

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  const response = await fetch(`${API_URL}/provider/profile`, {
     cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  const result = await response.json();
  return result.success ? result.data : [];
};

export const getRestaurantById = async (userId: string): Promise<Restaurant> => {
  const response = await fetch(`${API_URL}/provider/profile/${userId}`, {
     cache: "no-store"
  });
  
  if (!response.ok) throw new Error("Restaurant not found");
  
  const result = await response.json();
  return result.data;
};

export const getTopRatedRestaurants = async (): Promise<Restaurant[]> => {
  const response = await fetch(`${API_URL}/provider/profile/top-rated`, {
     cache: "no-store"
  });
  const result = await response.json();
  return result.success ? result.data : [];
};