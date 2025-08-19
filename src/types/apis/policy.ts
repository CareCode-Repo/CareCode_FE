import { z } from 'zod'

// export const policySchema = z.object({
//   id: z.number(),
//   title: z.string(),
//   description: z.string(),
//   category: z.string(),
//   targetAge: z.string(),
//   region: z.string(),
//   eligibility: z.string(),
//   supportAmount: z.string(),
//   applicationPeriod: z.string().optional(),
//   applicationMethod: z.string().optional(),
//   requiredDocuments: z.array(z.string()).optional(),
//   contactInfo: z.string().optional(),
//   documentUrl: z.string().url().optional(),
//   isActive: z.boolean(),
//   viewCount: z.number(),
//   createdAt: z.string(),
//   updatedAt: z.string(),
// })
// export type Policy = z.infer<typeof policySchema>

export const policySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  location: z.string(),
  minAge: z.number(),
  maxAge: z.number(),
  supportAmount: z.number().nullable(),
  applicationPeriod: z.string(),
  eligibilityCriteria: z.string().nullable(),
  applicationMethod: z.string(),
  requiredDocuments: z.string(),
  contactInfo: z.string(),
  websiteUrl: z.string(),
  viewCount: z.number(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Policy = z.infer<typeof policySchema>

export const policyListItemSchema = policySchema.pick({
  id: true,
  title: true,
  description: true,
  category: true,
  location: true,
  minAge: true,
  maxAge: true,
  supportAmount: true,
  applicationPeriod: true,
  eligibilityCriteria: true,
  applicationMethod: true,
  contactInfo: true,
  websiteUrl: true,
  isActive: true,
  createdAt: true,
})
export type PolicyListItem = z.infer<typeof policyListItemSchema>

// /policies
export const getPolicyListQuerySchema = z.object({
  category: z.string().optional(),
  region: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type GetPolicyListQuery = z.infer<typeof getPolicyListQuerySchema>
export const getPolicyListResponseSchema = z.array(policyListItemSchema)
export type GetPolicyListResponse = z.infer<typeof getPolicyListResponseSchema>

// /policies/{policyId}
export const getPolicyByIdPathSchema = z.object({
  policyId: z.number(),
})
export type GetPolicyByIdPath = z.infer<typeof getPolicyByIdPathSchema>
export const getPolicyByIdResponseSchema = policySchema
export type GetPolicyByIdResponse = z.infer<typeof getPolicyByIdResponseSchema>

// /policies/latest
export const getLatestPoliciesResponseSchema = z.array(policySchema)
export type GetLatestPoliciesResponse = z.infer<typeof getLatestPoliciesResponseSchema>
