import { Entertainer } from "../types/Entertainer";
import { EntertainerSummary } from "../types/EntertainerSummary";

const API_URL = "https://final-backman-backend-cheeg7dtepeha6da.eastus-01.azurewebsites.net/entertainers";

// ✅ For summary table w/ pagination
export const fetchEntertainers = async (
  pageSize: number,
  pageNum: number
): Promise<{
  entertainers: EntertainerSummary[];
  totalEntertainers: number;
}> => {
  try {
    const response = await fetch(
      `${API_URL}/AllEntertainers?pageHowMany=${pageSize}&pageNum=${pageNum}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch entertainers");
    }

    return await response.json(); // { entertainers, totalEntertainers }
  } catch (error) {
    console.error("Error fetching entertainers: ", error);
    throw error;
  }
};

// ✅ For full data (Admin)
export const fetchAllEntertainers = async (): Promise<Entertainer[]> => {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) {
      throw new Error("Failed to fetch full entertainers");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching full entertainers: ", error);
    throw error;
  }
};

export const fetchEntertainerById = async (id: number): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/GetEntertainerDetails/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch entertainer details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching entertainer details: ", error);
    throw error;
  }
};

export const addEntertainer = async (newEntertainer: Entertainer): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/AddEntertainer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntertainer),
    });
    if (!response.ok) {
      throw new Error("Failed to add entertainer");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding entertainer", error);
    throw error;
  }
};

export const updateEntertainer = async (
  id: number,
  updated: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/UpdateEntertainer/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    });
    if (!response.ok) {
      throw new Error("Failed to update entertainer");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating entertainer", error);
    throw error;
  }
};

export const deleteEntertainer = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteEntertainer/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete entertainer");
    }
  } catch (error) {
    console.error("Error deleting entertainer", error);
    throw error;
  }
};