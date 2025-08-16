import {
  GetFacilityByIdPath,
  GetFacilityByIdResponse,
  GetFacilityByIdResponseSchema,
  PostFacilityBookPath,
  PostFacilityBookResponse,
  PostFacilitiesSearchBody,
  PostFacilitiesSearchResponse,
  GetFacilitiesByTypePath,
  GetFacilitiesByTypeResponse,
  GetFacilitiesByLocationPath,
  GetFacilitesByLocationResponse,
  getFacilitiesByTypeResponseSchema,
  getFacilitesByLocationResponseSchema,
  getFacilitiesByLocationPathSchema,
  getFacilitiesByTypePathSchema,
  getFacilityByIdPathSchema,
  postFacilitiesSearchBodySchema,
  postFacilitiesSearchResponseSchema,
  postFacilityBookPathSchema,
  postFacilityBookResponseSchema,
} from '@/types/apis/facility'
import { CareCode } from './interceptor'

// 시설 상세 정보 조회
export const getFacilityById = async (
  path: GetFacilityByIdPath,
): Promise<GetFacilityByIdResponse> => {
  const parsedPath = getFacilityByIdPathSchema.parse(path)
  const res = await CareCode.get(`/facilities/${parsedPath.id}`)
  return GetFacilityByIdResponseSchema.parse(res.data)
}

// 시설 예약
export const postBookFacility = async (
  path: PostFacilityBookPath,
): Promise<PostFacilityBookResponse> => {
  const parsedPath = postFacilityBookPathSchema.parse(path)
  const res = await CareCode.post(`/facilities/${parsedPath.facilityId}/bookings`)
  return postFacilityBookResponseSchema.parse(res.data)
}

// 시설 검색
export const postSearchFacilities = async (
  body: PostFacilitiesSearchBody,
): Promise<PostFacilitiesSearchResponse> => {
  const parsedBody = postFacilitiesSearchBodySchema.parse(body)
  const res = await CareCode.post('/facilities/search', parsedBody)
  return postFacilitiesSearchResponseSchema.parse(res.data)
}

// type기반 시설 검색
export const getFacilitiesByType = async (
  path: GetFacilitiesByTypePath,
): Promise<GetFacilitiesByTypeResponse> => {
  const paresdPath = getFacilitiesByTypePathSchema.parse(path)
  const res = await CareCode.get(`/facilities/type/${paresdPath.facilityType}`)
  return getFacilitiesByTypeResponseSchema.parse(res.data)
}

// 위치 기반 시설 검색
export const getFacilitiesByLocation = async (
  path: GetFacilitiesByLocationPath,
): Promise<GetFacilitesByLocationResponse> => {
  const parsedPath = getFacilitiesByLocationPathSchema.parse(path)
  const res = await CareCode.get(`/facilities/location/${parsedPath.location}`)
  return getFacilitesByLocationResponseSchema.parse(res.data)
}
