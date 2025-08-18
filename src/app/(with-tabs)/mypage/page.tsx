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

const MyPage = (): ReactElement => {
  const router = useRouter()
  const handleEditButtonClick = () => router.push('/mypage/edit')
  return (
    <Layout hasTopNav title="홈" actionButtons={[{ icon: BellIcon }]}>
      <div className="flex gap-3.5 p-3.5 items-center border border-gray-300 rounded-lg bg-white m-4.5">
        <div className="bg-gray-300 rounded-full p-3 flex items-center justify-center">
          <CameraIcon className="size-9 fill-black" />
        </div>
        <div className="flex flex-col gap-1.5 grow">
          <span className="text-b1-semibold text-gray-800">홍길동</span>
          <div className="flex gap-1.5">
            <div className="center bg-yellow p-0.5 rounded-xs">
              <KakaoIcon className="size-2.5" />
            </div>
            <span className="text-c1-regular text-gray-700">0000@naver.com</span>
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
          { id: '1', title: '로그아웃' },
          { id: '2', title: '회원탈퇴' },
        ]}
      />
    </Layout>
  )
}

export default MyPage
