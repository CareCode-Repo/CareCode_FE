import { z as zod } from 'zod'

// 유저 스키마
export const UserSchema = zod.object({
  userId: zod.string(),
  email: zod.string().email(),
  name: zod.string(),
  phoneNumber: zod.string(),
  birthDate: zod.string().regex(/^\d{4}-\d{2}-\d{2}$/, '날짜 형식은 YYYY-MM-DD여야 합니다'), // YYYY-MM-DD 형식
  gender: zod.enum(['MALE', 'FEMALE']),
  address: zod.string(),
  profileImageUrl: zod.string(),
  role: zod.enum(['PARENT', 'CHILD']).optional(),
  isActive: zod.boolean(),
  emailVerified: zod.boolean(),
  lastLoginAt: zod.date(), // 2024-01-15T10:30:00
  createdAt: zod.date(), // 2024-01-15T10:30:00
})
export type User = zod.infer<typeof UserSchema>

// /auth/me
export const GetUserInfoResponseSchema = zod.object({
  success: zod.boolean(),
  user: UserSchema,
})
export type GetUserInfoResponse = zod.infer<typeof GetUserInfoResponseSchema>

// /users/profile
export const PutUserInfoBodySchema = zod.object({
  name: zod.string().optional(),
  phoneNumber: zod.string().optional(),
  address: zod.string().optional(),
  profileImageUrl: zod.string().url(),
})
export type PutUserInfoBody = zod.infer<typeof PutUserInfoBodySchema>
export const PutUserInfoResponseSchema = zod.object({
  success: zod.boolean(),
  message: zod.string(),
})
export type PutUserInfoResponse = zod.infer<typeof PutUserInfoResponseSchema>
