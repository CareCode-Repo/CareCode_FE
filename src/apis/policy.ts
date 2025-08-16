import { z } from 'zod'

export const policySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  targetAge: z.string(),
  region: z.string(),
  eligibility: z.string(),
  supportAmount: z.string(),
  applicationPeriod: z.string().optional(),
  applicationMethod: z.string().optional(),
  requiredDocuments: z.array(z.string()).optional(),
  contactInfo: z.string().optional(),
  documentUrl: z.string().url().optional(),
  isActive: z.boolean(),
  viewCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type Policy = z.infer<typeof policySchema>

export const policyListItemSchema = policySchema.pick({
  id: true,
  title: true,
  description: true,
  category: true,
  targetAge: true,
  region: true,
  eligibility: true,
  supportAmount: true,
  applicationPeriod: true,
  contactInfo: true,
  documentUrl: true,
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
export type getPolicyListResponse = z.infer<typeof getPolicyListResponseSchema>

// /policies/{policyId}
export const getPolicyByIdPathSchema = z.object({
  policyId: z.number(),
})
export type GetPolicyByIdPath = z.infer<typeof getPolicyByIdPathSchema>
export const getPolicyByIdResponseSchema = policySchema
export type getPolicyByIdResponse = z.infer<typeof getPolicyByIdResponseSchema>
