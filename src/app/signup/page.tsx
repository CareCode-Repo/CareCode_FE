'use client'

import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Button from '@/components/common/Button'
import Label from '@/components/common/Label'
import Layout from '@/components/common/Layout'
import ToggleButton from '@/components/common/ToggleButton'
import Input from '@/components/common/input'
import { usePostSignup } from '@/queries/auth'
import { PostSignupBody } from '@/types/apis/auth'

const SignUpPage = (): ReactElement => {
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PostSignupBody>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      // email: '',
      // password: '',
      role: 'PARENT',
    },
  })

  const signupMutation = usePostSignup()

  const onSubmit = async (data: PostSignupBody) => {
    try {
      await signupMutation.mutateAsync(data)

      // 회원가입 성공 시 로그인 페이지로 이동
      router.push('/home')
    } catch (error: unknown) {
      console.error('회원가입 실패:', error)
    }
  }

  return (
    <Layout title="회원가입" hasTopNav hasBackButton contentClassName="px-6 py-5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex grow flex-col">
        <div className="flex grow flex-col overflow-y-scroll">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-h3-bold whitespace-pre-wrap text-black">
                {
                  '맘편한에 오신 걸 환영해요 :)\n함께하는 육아,\n이제 조금 더 편안하게 시작해볼까요?'
                }
              </span>
              <span className="text-t2-regular text-gray-800">
                회원가입을 위한 정보를 입력해주세요.
              </span>
            </div>

            {/* 닉네임 */}
            <Controller
              name="name"
              control={control}
              rules={{
                required: '닉네임을 입력해주세요',
                minLength: {
                  value: 2,
                  message: '닉네임은 2글자 이상이어야 합니다',
                },
                maxLength: {
                  value: 10,
                  message: '닉네임은 10글자 이하여야 합니다',
                },
                pattern: {
                  value: /^[가-힣a-zA-Z0-9]+$/,
                  message: '닉네임은 한글, 영문, 숫자만 사용할 수 있습니다',
                },
                validate: {
                  noSpaces: (value) => !value.includes(' ') || '공백은 사용할 수 없습니다',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  label="닉네임"
                  placeholder="닉네임을 입력해주세요 (2-10글자)"
                  required
                  minLength={2}
                  maxLength={10}
                  errorText={errors.name?.message}
                  showErrorText={!!errors.name}
                />
              )}
            />

            {/* 역할 */}
            <div className="flex flex-col gap-2">
              <Label required>역할</Label>
              <Controller
                name="role"
                control={control}
                rules={{
                  required: '역할을 선택해주세요',
                }}
                render={({ field }) => (
                  <div className="flex gap-2.5">
                    <ToggleButton
                      pressed={field.value === 'PARENT'}
                      onPressedChange={(pressed) => pressed && field.onChange('PARENT')}
                    >
                      부모
                    </ToggleButton>
                    <ToggleButton
                      pressed={field.value === 'CAREGIVER'}
                      onPressedChange={(pressed) => pressed && field.onChange('CAREGIVER')}
                    >
                      자녀
                    </ToggleButton>
                  </div>
                )}
              />
            </div>

            {/* 임시 필수 필드들 */}
            {/* <div className="flex flex-col gap-4">
              <span className="text-t2-medium text-gray-600">임시 필수 정보 (추후 제거 예정)</span>

              <Controller
                name="email"
                control={control}
                rules={{
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '올바른 이메일 형식을 입력해주세요',
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="이메일"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    required
                    errorText={errors.email?.message}
                    showErrorText={!!errors.email}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: '비밀번호를 입력해주세요',
                  minLength: {
                    value: 6,
                    message: '비밀번호는 6글자 이상이어야 합니다',
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="비밀번호"
                    type="password"
                    placeholder="비밀번호를 입력해주세요 (6자 이상)"
                    required
                    errorText={errors.password?.message}
                    showErrorText={!!errors.password}
                  />
                )}
              />
            </div> */}
          </div>
        </div>
        <Button type="submit" color="green" disabled={!isValid || signupMutation.isPending}>
          {signupMutation.isPending ? '회원가입 중...' : '회원가입 하기'}
        </Button>
      </form>
    </Layout>
  )
}

export default SignUpPage
