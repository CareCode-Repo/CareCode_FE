'use client'

import { ReactElement, useState } from 'react'
import SearchIcon from '@/assets/icons/search.svg'
import Button from '@/components/common/Button'
import Label from '@/components/common/Label'
import Layout from '@/components/common/Layout'
import Spacer from '@/components/common/Spacer'
import ToggleButton from '@/components/common/ToggleButton'
import Input from '@/components/common/input'
import EditProfileImage from '@/components/features/mypage/EditProfileImage'

const ProfileEditPage = (): ReactElement => {
  const [profileImage, setProfileImage] = useState<string>('')

  const handleImageChange = (base64: string) => {
    setProfileImage(base64)
  }

  return (
    <Layout hasTopNav title="프로필 수정" hasBackButton>
      <div className="p-6 flex flex-col gap-10 grow overflow-y-auto">
        <EditProfileImage imageUrl={profileImage} onImageChange={handleImageChange} />
        <Input label="이름" required value={''} />
        <div className="flex flex-col">
          <Label required>역할</Label>
          <div className="flex gap-2.5">
            <ToggleButton>부모</ToggleButton>
            <ToggleButton>자녀</ToggleButton>
          </div>
        </div>
        <div className="flex flex-col">
          <Label required>위치 정보</Label>
          <Input
            required
            value={''}
            placeholder="공사 위치를 입력해주세요"
            readOnly
            rightIcon={<SearchIcon className="size-6 fill-gray-400 cursor-pointer" />}
          />
          <Spacer className="h-2.5" />
          <Input required value={''} placeholder="상세 주소를 입력해주세요" />
        </div>
      </div>
      <div className="px-6 pb-6">
        <Button color="green">저장</Button>
      </div>
    </Layout>
  )
}

export default ProfileEditPage
