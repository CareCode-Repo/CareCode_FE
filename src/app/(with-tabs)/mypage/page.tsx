'use client'
import { useRouter } from 'next/navigation'
import { ReactElement, useState } from 'react'
import BellIcon from '@/assets/icons/bell.svg'
import CameraIcon from '@/assets/icons/camera_small.svg'
import KakaoIcon from '@/assets/icons/logo/kakao.svg'
import PencilIcon from '@/assets/icons/pencil.svg'
import AlertDialog from '@/components/common/AlertDialog'
import AuthGuard from '@/components/common/AuthGuard'
import Button from '@/components/common/Button'
import Layout from '@/components/common/Layout'
import IconButton from '@/components/common/top-navbar/IconButton'
import MenuList from '@/components/features/mypage/MenuList'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { useLogout, useUserProfile } from '@/queries/user'

const MyPage = (): ReactElement => {
  const router = useRouter()
  const { data: user, isLoading } = useUserProfile()
  const { mutate: logout, isPending: isLoggingOut } = useLogout()
  const isAdmin = useIsAdmin()

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  return (
    <AuthGuard>
      <Layout
        hasTopNav
        title="마이페이지"
        actionButtons={[{ icon: BellIcon, onClick: () => router.push('/notification') }]}
      >
        {/* 프로필 */}
        <div className="m-4.5 flex items-center gap-3.5 rounded-lg border border-gray-300 bg-white p-3.5">
          <div className="flex items-center justify-center rounded-full bg-gray-300 p-3">
            <CameraIcon className="size-9 fill-black" />
          </div>
          <div className="flex grow flex-col gap-1.5">
            {isLoading ? (
              <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
            ) : (
              <span className="text-b1-semibold text-gray-800">{user?.name || '사용자'}</span>
            )}
            <div className="flex items-center gap-1.5">
              {user?.provider === 'kakao' && (
                <div className="center bg-yellow rounded-xs p-0.5">
                  <KakaoIcon className="size-2.5" />
                </div>
              )}
              <span className="text-c1-regular text-gray-700">
                {user?.email || '이메일 정보 없음'}
              </span>
            </div>
          </div>
          <IconButton
            icon={PencilIcon}
            iconClassName="size-6 fill-gray-700 cursor-pointer"
            onClick={() => router.push('/mypage/edit')}
          />
        </div>

        <MenuList
          className="bg-white"
          title="우리 아이"
          items={[
            {
              id: 'children',
              title: '아이 관리·예방접종',
              onClick: () => router.push('/children'),
            },
            { id: 'health', title: '건강 기록', onClick: () => router.push('/health') },
            { id: 'hospital', title: '병원 찾기', onClick: () => router.push('/hospital') },
          ]}
        />
        <MenuList
          className="bg-white"
          title="지원금"
          items={[
            {
              id: 'missed',
              title: '놓친 지원금 찾기',
              onClick: () => router.push('/benefits/missed'),
            },
            {
              id: 'regional',
              title: '지역별 지원금 비교',
              onClick: () => router.push('/benefits/regional'),
            },
          ]}
        />
        <MenuList
          className="bg-white"
          title="나의 활동"
          items={[
            {
              id: 'liked',
              title: '좋아요한 글',
              onClick: () => router.push('/mypage/activity?tab=liked'),
            },
            {
              id: 'bookmarked',
              title: '북마크',
              onClick: () => router.push('/mypage/activity?tab=bookmarked'),
            },
            { id: 'bookings', title: '내 예약', onClick: () => router.push('/mypage/bookings') },
            { id: 'waitlist', title: '내 대기', onClick: () => router.push('/mypage/waitlist') },
          ]}
        />
        <MenuList
          className="bg-white"
          title="이용 안내"
          items={[
            {
              id: 'notification-settings',
              title: '알림 설정',
              onClick: () => router.push('/notification/settings'),
            },
            {
              id: 'privacy',
              title: '개인정보 설정 및 약관 동의',
              onClick: () => router.push('/mypage/privacy'),
            },
          ]}
        />
        {/* 관리자에게만 노출한다. 실제 접근 통제는 서버가 한다. */}
        {isAdmin && (
          <MenuList
            className="bg-white"
            title="관리자"
            items={[
              { id: 'admin', title: '지표·검증·신고 관리', onClick: () => router.push('/admin') },
            ]}
          />
        )}
        <MenuList
          className="bg-white"
          title="회원 관리"
          items={[
            { id: 'logout', title: '로그아웃', onClick: () => setLogoutDialogOpen(true) },
            { id: 'withdraw', title: '회원탈퇴', onClick: () => router.push('/mypage/privacy') },
          ]}
        />

        <AlertDialog
          title="로그아웃 할까요?"
          description="다시 로그인하면 이어서 이용할 수 있어요."
          isOpen={logoutDialogOpen}
          onClose={() => setLogoutDialogOpen(false)}
          cancelButton={
            <Button color="gray" size="small" onClick={() => setLogoutDialogOpen(false)}>
              취소
            </Button>
          }
          confirmButton={
            <Button color="green" size="small" onClick={() => logout()} disabled={isLoggingOut}>
              로그아웃
            </Button>
          }
        />
      </Layout>
    </AuthGuard>
  )
}

export default MyPage
