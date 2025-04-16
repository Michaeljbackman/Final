import { Entertainer } from "../types/Entertainer";
import { EntertainerSummary } from "../types/EntertainerSummary";

const API_URL = 'https://localhost:5000/entertainers';

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

    return await response.json(); // Must return { entertainers, totalEntertainers } from backend
  } catch (error) {
    console.error("Error fetching entertainers: ", error);
    throw error;
  }
};


// ✅ Get full entertainer details by ID
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

// ✅ Add entertainer
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

// ✅ Update entertainer
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

// ✅ Delete entertainer
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