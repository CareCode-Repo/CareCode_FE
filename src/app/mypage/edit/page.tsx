'use client'
import { ReactElement, useState, useEffect } from 'react'
import SearchIcon from '@/assets/icons/search.svg'
import Button from '@/components/common/Button'
import Label from '@/components/common/Label'
import Layout from '@/components/common/Layout'
import Spacer from '@/components/common/Spacer'
import ToggleButton from '@/components/common/ToggleButton'

import Input from '@/components/common/input'
import EditProfileImage from '@/components/features/mypage/EditProfileImage'

// Daum Postcode API 타입 정의
interface DaumPostcodeData {
  userSelectedType: string
  roadAddress: string
  jibunAddress: string
  bname: string
  buildingName: string
  apartment: string
}

declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeData) => void
        width?: string
        height?: string
      }) => {
        embed: (element: HTMLElement) => void
      }
    }
  }
}

const ProfileEditPage = (): ReactElement => {
  const [profileImage, setProfileImage] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [detailAddress, setDetailAddress] = useState<string>('')
  const [showPostcode, setShowPostcode] = useState<boolean>(false)

  // 다음 우편번호 서비스 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
    script.async = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handleImageChange = (base64: string) => {
    setProfileImage(base64)
  }

  const handleAddressSearch = () => {
    setShowPostcode(true)
  }

  const handleComplete = (data: DaumPostcodeData) => {
    let addr = '' // 주소 변수
    let extraAddr = '' // 참고항목 변수

    // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
    if (data.userSelectedType === 'R') {
      // 사용자가 도로명 주소를 선택했을 경우
      addr = data.roadAddress
    } else {
      // 사용자가 지번 주소를 선택했을 경우(J)
      addr = data.jibunAddress
    }

    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
    if (data.userSelectedType === 'R') {
      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        extraAddr += data.bname
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraAddr !== '') {
        extraAddr = ' (' + extraAddr + ')'
      }
    }

    // 선택된 주소 정보를 해당 필드에 넣는다.
    setAddress(addr + extraAddr)
    setShowPostcode(false)
  }

  // 우편번호 검색 컴포넌트
  useEffect(() => {
    if (showPostcode && window.daum) {
      const postcodeElement = document.getElementById('postcode-container')
      if (postcodeElement) {
        new window.daum.Postcode({
          oncomplete: handleComplete,
          width: '100%',
          height: '400px',
        }).embed(postcodeElement)
      }
    }
  }, [showPostcode])

  return (
    <Layout hasTopNav title="프로필 수정" hasBackButton>
      <div className="flex grow flex-col gap-10 overflow-y-auto p-6">
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
            readOnly
            required
            value={address}
            placeholder="공사 위치를 입력해주세요"
            onClick={handleAddressSearch}
            rightIcon={<SearchIcon className="size-6 cursor-pointer fill-gray-400" />}
          />
          <Spacer className="h-2.5" />

          {/* 우편번호 검색 iframe 영역 */}
          {showPostcode && (
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">주소 검색</span>
                <button
                  onClick={() => setShowPostcode(false)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  ✕ 닫기
                </button>
              </div>
              <div
                id="postcode-container"
                className="h-96 w-full overflow-hidden rounded-md border border-gray-300"
              />
            </div>
          )}

          <Input
            required
            value={detailAddress}
            onChange={(value: string) => setDetailAddress(value)}
            placeholder="상세 주소를 입력해주세요"
          />
        </div>
      </div>
      <div className="px-6 pb-6">
        <Button color="green">저장</Button>
      </div>
    </Layout>
  )
}

export default ProfileEditPage
