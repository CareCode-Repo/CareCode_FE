import { createQueryKeys } from '@lukemorales/query-key-factory'
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query'
import {
  getKakaoAuthUrl,
  postKakaoAuth,
  postSignup,
  postKakaoCompleteRegistration,
} from '@/apis/auth'
import {
  GetKakaoAuthUrlResponse,
  PostKakaoAuthBody,
  PostKakaoAuthResponse,
  PostSignupBody,
  PostSignupResponse,
  KakaoRegistrationRequest,
  KakaoRegistrationResponse,
} from '@/types/apis/auth'

export const authQueries = createQueryKeys('auth', {
  kakaoAuthUrl: (redirectUri?: string) => ({
    queryKey: ['kakaoAuthUrl', redirectUri],
    queryFn: () => getKakaoAuthUrl(redirectUri),
  }),
})

export const useGetKakaoAuthUrl = (
  redirectUri?: string,
): UseQueryResult<GetKakaoAuthUrlResponse, Error> => {
  return useQuery({
    ...authQueries.kakaoAuthUrl(redirectUri),
  })
}

export const useGetKakaoAuthUrlMutation = (): UseMutationResult<
  GetKakaoAuthUrlResponse,
  Error,
  string | undefined
> => {
  return useMutation({
    mutationFn: (redirectUri?: string) => getKakaoAuthUrl(redirectUri),
  })
}

export const usePostKakaoAuth = (): UseMutationResult<
  PostKakaoAuthResponse,
  Error,
  PostKakaoAuthBody
> => {
  return useMutation({
    mutationFn: postKakaoAuth,
  })
}

export const usePostSignup = (): UseMutationResult<PostSignupResponse, Error, PostSignupBody> => {
  return useMutation({
    mutationFn: postSignup,
  })
}

export const usePostKakaoCompleteRegistration = (): UseMutationResult<
  KakaoRegistrationResponse,
  Error,
  KakaoRegistrationRequest
> => {
  return useMutation({
    mutationFn: postKakaoCompleteRegistration,
  })
}
