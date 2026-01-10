import type { ReviewRequest, ReviewResponse } from "../types/review";

const BASE_URL = "http://localhost:8080/api/reviews";

const apiRequest = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (options.body) headers.set("Content-Type", "application/json");

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Request failed with status ${response.status}`
    );
  }

  // Skip JSON parsing for DELETE requests or empty responses
  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return {} as T;
  }

  return response.json();
};

export const createReview = (reviewData: ReviewRequest): Promise<void> =>
  apiRequest(BASE_URL, {
    method: "POST",
    body: JSON.stringify(reviewData),
  });

export const getAllReviews = (): Promise<ReviewResponse[]> =>
  apiRequest(BASE_URL);

export const getUserReviews = (userId: string): Promise<ReviewResponse[]> =>
  apiRequest(`${BASE_URL}/user/${userId}`);

export const deleteReview = (reviewId: number): Promise<void> =>
  apiRequest(`${BASE_URL}/${reviewId}`, {
    method: "DELETE",
  });

export const updateReview = (
  reviewId: number,
  data: { rating: number; comment: string }
): Promise<ReviewResponse> =>
  apiRequest(`${BASE_URL}/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
