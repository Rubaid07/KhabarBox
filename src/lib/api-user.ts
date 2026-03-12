const API_URL = typeof window === "undefined" 
  ? (process.env.BACKEND_URL || "https://khabarbox-backend.vercel.app") 
  : "/api/main";

export type User = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  status?: string;
  isSuspended?: boolean;
};

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  role: string;
  restaurantName?: string;
  restaurantDescription?: string;
  restaurantAddress?: string;
  logoUrl?: string;
  openingHours?: string; 
}

export const getMyProfile = async (): Promise<UserProfile> => {
  const res = await fetch(`${API_URL}/users/me`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch profile");
  const json = await res.json();
  const rawData = json.data;
  return {
    ...rawData,
    restaurantDescription: rawData.description || "",
    restaurantAddress: rawData.address || "",
    openingHours: rawData.openingHours || "",
  };
};

export const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  const payload = {
    name: data.name,
    image: data.image,
    phone: data.phone,
    restaurantName: data.restaurantName,
    description: data.restaurantDescription,
    address: data.restaurantAddress,
    logoUrl: data.logoUrl,
    openingHours: data.openingHours,
  };

  const res = await fetch(`${API_URL}/users/me`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to update profile");
  const json = await res.json();
  const updatedData = json.data;
  return {
    ...updatedData,
    restaurantDescription: updatedData.description || "",
    restaurantAddress: updatedData.address || "",
    openingHours: updatedData.openingHours || "",
  };
};