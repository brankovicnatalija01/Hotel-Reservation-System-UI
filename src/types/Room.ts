export interface Room {
  id: number;
  roomNumber: string;
  pricePerNight: number;
  description: string;
  propertyId: number;
  propertyName: string;
  roomTypeId: number;
  roomTypeName: string;
  roomTypeCapacity: number;
  roomTypeDescription: string;
  amenities: string[];
  imageUrls: string[];
}
