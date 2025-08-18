import { createQueryKeys } from '@lukemorales/query-key-factory'
import {
  getFacilitiesByLocation,
  getFacilitiesByType,
  getFacilityById,
  postSearchFacilities,
} from '@/apis/facility'
import {
  GetFacilitiesByLocationPath,
  GetFacilitiesByTypePath,
  GetFacilityByIdPath,
  PostFacilitiesSearchBody,
} from '@/types/apis/facility'

export const facilityQueries = createQueryKeys('facility', {
  detail: (id: GetFacilityByIdPath['id']) => ({
    queryKey: ['detail', id],
    queryFn: () => getFacilityById({ id }),
  }),

  type: (facilityType: GetFacilitiesByTypePath['facilityType']) => ({
    queryKey: ['type', facilityType],
    queryFn: () => getFacilitiesByType({ facilityType }),
  }),

  location: (location: GetFacilitiesByLocationPath['location']) => ({
    queryKey: ['location', location],
    queryFn: () => getFacilitiesByLocation({ location }),
  }),

  search: (body: PostFacilitiesSearchBody) => ({
    queryKey: ['search', body],
    queryFn: () => postSearchFacilities(body),
  }),
})
