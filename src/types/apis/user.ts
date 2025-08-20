import { z } from 'zod'

// 유저 스키마
export const userSchema = z.object({
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
  registrationCompleted: z.boolean(),
  lastLoginAt: z.string().optional(), // 2024-01-15T10:30:00
  createdAt: z.string().optional(), // 2024-01-15T10:30:00
  updatedAt: z.string().optional(),
})
export type User = z.infer<typeof userSchema>

// /auth/me
export const getUserInfoResponseSchema = z.object({
  success: z.boolean(),
  user: userSchema,
})
export type GetUserInfoResponse = z.infer<typeof getUserInfoResponseSchema>

// /users/profile
export const putUserInfoBodySchema = z.object({
  name: z.string().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  profileImageUrl: z.string().url(),
})
export type PutUserInfoBody = z.infer<typeof putUserInfoBodySchema>
export const putUserInfoResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
})
export type PutUserInfoResponse = z.infer<typeof putUserInfoResponseSchema>
