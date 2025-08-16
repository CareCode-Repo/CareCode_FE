import { z as zod } from 'zod'

const FacilityType = ['KINDERGARTEN', 'DAYCARE', 'PLAYGROUP', 'NURSERY', 'OTHER']

export const facilitySchema = zod.object({
  id: zod.number(),
  name: zod.string(),
  facilityType: zod.enum(FacilityType),
  address: zod.string(),
  location: zod.string().optional(),
  latitude: zod.number(),
  longitude: zod.number(),
  phoneNumber: zod.string(),
  email: zod.string().email(),
  capacity: zod.number().optional(),
  currentOccupancy: zod.number().optional(),
  ageGroups: zod.array(zod.string()).optional(),
  operatingHours: zod.string().optional(),
  programs: zod.array(zod.string()).optional(),
  facilities: zod.array(zod.string()),
  rating: zod.number().optional(),
  reviewCount: zod.number().optional(),
  createAt: zod.number().optional(),
})
export type Facility = zod.infer<typeof facilitySchema>

// /facilities
export const GetFacilitiesQuerySchema = zod.object({
  page: zod.number().min(0).optional(),
  size: zod.number().min(1).max(100).optional().default(20),
  location: zod.string().optional(),
  facilityType: zod.enum(FacilityType).optional(),
  latitude: zod.number().optional(),
  longitude: zod.number().optional(),
  radius: zod.number().optional(),
})
export type GetFacilitiesQuery = zod.infer<typeof GetFacilitiesQuerySchema>
export const GetFacilitiesResponseSchema = zod.object({
  success: zod.boolean(),
  content: zod.array(facilitySchema),
  page: zod.number(),
  size: zod.number(),
  totalElements: zod.number(),
  totalPages: zod.number(),
  first: zod.boolean().optional(),
  last: zod.boolean().optional(),
})
export type GetFacilitiesResponse = zod.infer<typeof GetFacilitiesResponseSchema>

// /facilities/{id}
// 시설 상세정보 조회
export const GetFacilityByIdPathSchema = zod.object({
  id: zod.number(),
})
export type GetFacilityByIdPath = zod.infer<typeof GetFacilityByIdPathSchema>
export const GetFacilityByIdResponseSchema = zod.object({
  success: zod.boolean(),
  facility: facilitySchema,
})
export type GetFacilityByIdResponse = zod.infer<typeof GetFacilityByIdResponseSchema>

// /facilities/{facilityId}/bookings
// 시설 예약
export const PostFacilityBookPathSchema = zod.object({
  facilityId: zod.number(),
})
export type PostFacilityBookPath = zod.infer<typeof PostFacilityBookPathSchema>
export const PostFacilityBookBodySchema = zod.object({
  childName: zod.string(),
  childAge: zod.number(),
  requestedDate: zod.string(),
  notes: zod.string().optional(),
})
export type PostFacilityBookBody = zod.infer<typeof PostFacilityBookBodySchema>
export const PostFacilityBookResponseSchema = zod.object({
  success: zod.boolean(),
  message: zod.string(),
  booking: zod.object({
    id: zod.bigint(),
    facilityId: zod.bigint(),
    userId: zod.string(),
    childName: zod.string(),
    childAge: zod.number(),
    requestedDate: zod.string(),
    status: zod.string(),
    notes: zod.string(),
    createAt: zod.string(),
  }),
})
export type PostFacilityBookResponse = zod.infer<typeof PostFacilityBookResponseSchema>

// /facilities/type/{facilityType}
// 시설 타입별 필터링
export const GetFacilitiesByTypePathSchema = zod.object({
  facilityType: z.enum(FacilityType),
})
export type GetFacilitiesByTypePath = zod.infer<typeof GetFacilitiesByTypePathSchema>
export const GetFacilitiesByTypeResponseSchema = zod.object({
  contents: zod.array(facilitySchema),
})
export type GetFacilitiesByTypeResponse = zod.infer<typeof GetFacilitiesByTypeResponseSchema>

// /facilities/search
// 시설 검색
export const PostFacilitiesSearchBodySchema = zod.object({
  keyword: zod.string(),
  facilityType: zod.enum(FacilityType).optional(),
  region: zod.string().optional(),
  latitude: zod.number().optional(),
  longitude: zod.number().optional(),
  radiusKm: zod.number().optional(),
  childAge: zod.number().optional(),
  minRating: zod.number().optional(),
  isPublic: zod.boolean(),
  subsidyAvailable: zod.boolean().optional(),
  minAvaiableSpots: zod.number().optional(),
  page: zod.number().min(0).optional(),
  size: zod.number().min(1).max(100).optional(),
  sortBy: zod.string().optional(), // rating
  sortDirection: zod.string().optional(), // ASC / DESC
})
export type PostFacilitiesSearchBody = zod.infer<typeof PostFacilitiesSearchBodySchema>
export const PostFacilitiesSearchResponse = zod.object({
  content: zod.array(facilitySchema),
  page: zod.number(),
  size: zod.number().optional(),
  totalElements: zod.number(),
  totalPages: zod.number(),
})

// /facilities/location/{location}
// 위치 기반 시설 검색
export const GetFacilitiesByLocationPathSchema = zod.object({
  location: zod.string(),
})
export type GetFacilitiesByLocationPath = zod.infer<typeof GetFacilitiesByLocationPathSchema>
export const GetFacilitesByLocationResponseSchema = zod.array(facilitySchema)
export type GetFacilitesByLocationResponse = zod.infer<typeof GetFacilitesByLocationResponseSchema>

// /facilities/{id}/rating
// 시설 평점 매기기
// export const PostFacilityRatePathSchema = zod.object({
//   id: zod.number(),
// })
// export type PostFacilityRatePath = zod.infer<typeof PostFacilityRatePathSchema>
// export const PostFacilityRateResponseSchema = zod.object({
//   message: zod.string().optional(),
// })
// export type PostFacilityRateResponse = zod.infer<typeof PostFacilityRateResponseSchema>
