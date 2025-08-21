import { z } from 'zod'

// 유저 스키마
export const userSchema = z.object({
  id: z.number(),
  userId: z.string(),
  email: z.string().email(),
  password: z.string().nullable(),
  name: z.string(),
  phoneNumber: z.string().nullable(),
  birthDate: z.string().nullable(), // date format
  gender: z.string().nullable(),
  address: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  profileImageUrl: z.string().nullable(),
  role: z.string(),
  provider: z.string().nullable(),
  providerId: z.string().nullable(),
  isActive: z.boolean(),
  emailVerified: z.boolean(),
  registrationCompleted: z.boolean(),
  deletedAt: z.string().nullable(), // date-time format
  lastLoginAt: z.string().nullable(), // date-time format
  createdAt: z.string().nullable(), // date-time format
  updatedAt: z.string().nullable(), // date-time format
})
export type User = z.infer<typeof userSchema>

// /api/user/profile
export const getUserInfoResponseSchema = userSchema
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
