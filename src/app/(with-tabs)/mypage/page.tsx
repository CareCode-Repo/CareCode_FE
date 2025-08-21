'use client'
import { useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import BellIcon from '@/assets/icons/bell.svg'
import CameraIcon from '@/assets/icons/camera_small.svg'
import KakaoIcon from '@/assets/icons/logo/kakao.svg'
import PencilIcon from '@/assets/icons/pencil.svg'
import Layout from '@/components/common/Layout'
import IconButton from '@/components/common/top-navbar/IconButton'
import MenuList from '@/components/features/mypage/MenuList'
import { useUserProfile } from '@/queries/user'

const MyPage = (): ReactElement | null => {
  const router = useRouter()
  const { data: user } = useUserProfile()
  const handleEditButtonClick = () => router.push('/mypage/edit')
  const handleLogout = () => {
    // 로그아웃 로직 구현
    // 토큰 삭제 등
    router.push('/')
  }
  const handleWithdrawal = () => {
    // 회원탈퇴 로직 api 호출, 토큰삭제 등?
    console.log('회원탈퇴')
  }

  if (!user) {
    return null
  }

  return (
    <Layout hasTopNav title="홈" actionButtons={[{ icon: BellIcon }]}>
      <div className="m-4.5 flex items-center gap-3.5 rounded-lg border border-gray-300 bg-white p-3.5">
        <div className="flex items-center justify-center rounded-full bg-gray-300 p-3">
          <CameraIcon className="size-9 fill-black" />
        </div>
        <div className="flex grow flex-col gap-1.5">
          <span className="text-b1-semibold text-gray-800">{user?.name || '사용자'}</span>
          <div className="flex gap-1.5">
            {user?.provider === 'kakao' && (
              <div className="center bg-yellow rounded-xs p-0.5">
                <KakaoIcon className="size-2.5" />
              </div>
            )}
            <span className="text-c1-regular text-gray-700">
              {user?.email || '이메일을 불러올 수 없습니다'}
            </span>
          </div>
        </div>
        <IconButton
          icon={PencilIcon}
          iconClassName="size-6 fill-gray-700 cursor-pointer"
          onClick={handleEditButtonClick}
        />
      </div>
      <MenuList
        className="bg-white"
        title="나의 활동"
        items={[
          { id: '1', title: '작성 글' },
          { id: '2', title: '작성 댓글' },
          { id: '3', title: '북마크' },
        ]}
      />
      <MenuList
        className="bg-white"
        title="이용 안내"
        items={[{ id: '1', title: '이용 약관 및 개인정보 처리 방침' }]}
      />
      <MenuList className="bg-white" title="기타" items={[{ id: '1', title: '알림 설정' }]} />
      <MenuList
        className="bg-white"
        title="회원 관리"
        items={[
          { id: '1', title: '로그아웃', onClick: handleLogout },
          { id: '2', title: '회원탈퇴', onClick: handleWithdrawal },
        ]}
      />
    </Layout>
  )
}

export default MyPage
