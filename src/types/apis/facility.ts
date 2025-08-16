import { z } from 'zod'

export const FacilityType = ['KINDERGARTEN', 'DAYCARE', 'PLAYGROUP', 'NURSERY', 'OTHER'] as const
export type FacilityType = (typeof FacilityType)[number]

const facilitySchema = z.object({
  id: z.number(),
  name: z.string(),
  facilityType: z.enum(FacilityType),
  address: z.string(),
  location: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  phoneNumber: z.string(),
  email: z.string().email(),
  capacity: z.number().optional(),
  currentOccupancy: z.number().optional(),
  ageGroups: z.array(z.string()).optional(),
  operatingHours: z.string().optional(),
  programs: z.array(z.string()).optional(),
  facilities: z.array(z.string()),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
  createAt: z.number().optional(),
})
export type Facility = z.infer<typeof facilitySchema>

// /facilities
export const getFacilitiesQuerySchema = z.object({
  page: z.number().min(0).optional(),
  size: z.number().min(1).max(100).optional().default(20),
  location: z.string().optional(),
  facilityType: z.enum(FacilityType).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  radius: z.number().optional(),
})
export type GetFacilitiesQuery = z.infer<typeof getFacilitiesQuerySchema>
export const getFacilitiesResponseSchema = z.object({
  success: z.boolean(),
  content: z.array(facilitySchema),
  page: z.number(),
  size: z.number(),
  totalElements: z.number(),
  totalPages: z.number(),
  first: z.boolean().optional(),
  last: z.boolean().optional(),
})
export type GetFacilitiesResponse = z.infer<typeof getFacilitiesResponseSchema>

// /facilities/{id}
// 시설 상세정보 조회
export const getFacilityByIdPathSchema = z.object({
  id: z.number(),
})
export type GetFacilityByIdPath = z.infer<typeof getFacilityByIdPathSchema>
export const GetFacilityByIdResponseSchema = z.object({
  success: z.boolean(),
  facility: facilitySchema,
})
export type GetFacilityByIdResponse = z.infer<typeof GetFacilityByIdResponseSchema>

// /facilities/{facilityId}/bookings
// 시설 예약
export const postFacilityBookPathSchema = z.object({
  facilityId: z.number(),
})
export type PostFacilityBookPath = z.infer<typeof postFacilityBookPathSchema>
export const postFacilityBookBodySchema = z.object({
  childName: z.string(),
  childAge: z.number(),
  requestedDate: z.string(),
  notes: z.string().optional(),
})
export type PostFacilityBookBody = z.infer<typeof postFacilityBookBodySchema>
export const postFacilityBookResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  booking: z.object({
    id: z.bigint(),
    facilityId: z.bigint(),
    userId: z.string(),
    childName: z.string(),
    childAge: z.number(),
    requestedDate: z.string(),
    status: z.string(),
    notes: z.string(),
    createAt: z.string(),
  }),
})
export type PostFacilityBookResponse = z.infer<typeof postFacilityBookResponseSchema>

// /facilities/type/{facilityType}
// 시설 타입별 필터링
export const getFacilitiesByTypePathSchema = z.object({
  facilityType: z.enum(FacilityType),
})
export type GetFacilitiesByTypePath = z.infer<typeof getFacilitiesByTypePathSchema>
export const getFacilitiesByTypeResponseSchema = z.object({
  contents: z.array(facilitySchema),
})
export type GetFacilitiesByTypeResponse = z.infer<typeof getFacilitiesByTypeResponseSchema>

// /facilities/search
// 시설 검색
export const postFacilitiesSearchBodySchema = z.object({
  keyword: z.string(),
  facilityType: z.enum(FacilityType).optional(),
  region: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  radiusKm: z.number().optional(),
  childAge: z.number().optional(),
  minRating: z.number().optional(),
  isPublic: z.boolean(),
  subsidyAvailable: z.boolean().optional(),
  minAvaiableSpots: z.number().optional(),
  page: z.number().min(0).optional(),
  size: z.number().min(1).max(100).optional(),
  sortBy: z.string().optional(), // rating
  sortDirection: z.string().optional(), // ASC / DESC
})
export type PostFacilitiesSearchBody = z.infer<typeof postFacilitiesSearchBodySchema>
export const postFacilitiesSearchResponseSchema = z.object({
  content: z.array(facilitySchema),
  page: z.number(),
  size: z.number().optional(),
  totalElements: z.number(),
  totalPages: z.number(),
})
export type PostFacilitiesSearchResponse = z.infer<typeof postFacilitiesSearchResponseSchema>

// /facilities/location/{location}
// 위치 기반 시설 검색
export const getFacilitiesByLocationPathSchema = z.object({
  location: z.string(),
})
export type GetFacilitiesByLocationPath = z.infer<typeof getFacilitiesByLocationPathSchema>
export const getFacilitesByLocationResponseSchema = z.array(facilitySchema)
export type GetFacilitesByLocationResponse = z.infer<typeof getFacilitesByLocationResponseSchema>

// /facilities/{id}/rating
// 시설 평점 매기기
// export const PostFacilityRatePathSchema = z.object({
//   id: z.number(),
// })
// export type PostFacilityRatePath = z.infer<typeof PostFacilityRatePathSchema>
// export const PostFacilityRateResponseSchema = z.object({
//   message: z.string().optional(),
// })
// export type PostFacilityRateResponse = z.infer<typeof PostFacilityRateResponseSchema>
