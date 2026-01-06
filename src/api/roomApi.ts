import type { Room } from "../types/Room";

const BASE_URL = "http://localhost:8080/api";

export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const response = await fetch(`${BASE_URL}/rooms`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Could not fetch rooms:", error);
    throw error;
  }
};
