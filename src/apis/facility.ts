import {
  GetFacilitesByLocationResponseSchema,
  GetFacilitiesByLocationPath,
  GetFacilitiesByLocationPathSchema,
  GetFacilitiesByTypePath,
  GetFacilitiesByTypePathSchema,
  GetFacilitiesByTypeResponseSchema,
  GetFacilityByIdPath,
  GetFacilityByIdPathSchema,
  GetFacilityByIdResponse,
  GetFacilityByIdResponseSchema,
  PostFacilitiesSearchBody,
  PostFacilitiesSearchBodySchema,
  PostFacilityBookPath,
  PostFacilityBookPathSchema,
  PostFacilityBookResponseSchema,
} from '@/types/apis/facility'
import { CareCode } from './interceptor'

// 시설 상세 정보 조회
export const getFacilityById = async (
  path: GetFacilityByIdPath,
): Promise<GetFacilityByIdResponse> => {
  const parsedPath = GetFacilityByIdPathSchema.parse(path)
  const res = await CareCode.get(`/facilities/${parsedPath.id}`)
  return GetFacilityByIdResponseSchema.parse(res.data)
}

// 시설 예약
export const postBookFacility = async (path: PostFacilityBookPath) => {
  const parsedPath = PostFacilityBookPathSchema.parse(path)
  const res = await CareCode.post(`/facilities/${parsedPath.facilityId}/bookings`)
  return PostFacilityBookResponseSchema.parse(res.data)
}

// 시설 검색
export const postSearchFacilities = async (body: PostFacilitiesSearchBody) => {
  const parsedBody = PostFacilitiesSearchBodySchema.parse(body)
  const res = await CareCode.post('/facilities/search', parsedBody)
  return PostFacilityBookResponseSchema.parse(res.data)
}

// type기반 시설 검색
export const getFacilitiesByType = async (path: GetFacilitiesByTypePath) => {
  const paresdPath = GetFacilitiesByTypePathSchema.parse(path)
  const res = await CareCode.get(`/facilities/type/${paresdPath.facilityType}`)
  return GetFacilitiesByTypeResponseSchema.parse(res.data)
}

// 위치 기반 시설 검색
export const getFacilitiesByLocation = async (path: GetFacilitiesByLocationPath) => {
  const parsedPath = GetFacilitiesByLocationPathSchema.parse(path)
  const res = await CareCode.get(`/facilities/location/${parsedPath.location}`)
  return GetFacilitesByLocationResponseSchema.parse(res.data)
}
