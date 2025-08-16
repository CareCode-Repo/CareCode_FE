import { z } from 'zod'

// 유저 스키마
export const UserSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  name: z.string(),
  phoneNumber: z.string(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식은 YYYY-MM-DD여야 합니다'), // YYYY-MM-DD 형식
  gender: z.enum(['MALE', 'FEMALE']),
  address: z.string(),
  profileImageUrl: z.string(),
  role: z.enum(['PARENT', 'CHILD']).optional(),
  isActive: z.boolean(),
  emailVerified: z.boolean(),
  lastLoginAt: z.date(), // 2024-01-15T10:30:00
  createdAt: z.date(), // 2024-01-15T10:30:00
})
export type User = z.infer<typeof UserSchema>

// /auth/me
export const GetUserInfoResponseSchema = z.object({
  success: z.boolean(),
  user: UserSchema,
})
export type GetUserInfoResponse = z.infer<typeof GetUserInfoResponseSchema>

// /users/profile
export const PutUserInfoBodySchema = z.object({
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  profileImageUrl: z.string().url(),
})
export type PutUserInfoBody = z.infer<typeof PutUserInfoBodySchema>
export const PutUserInfoResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})
export type PutUserInfoResponse = z.infer<typeof PutUserInfoResponseSchema>
