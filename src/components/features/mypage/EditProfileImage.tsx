'use client'

import Image from 'next/image'
import { ReactElement, useRef } from 'react'
import CameraIcon from '@/assets/icons/camera_small.svg'
import IconButton from '@/components/common/top-navbar/IconButton'
import { convertFileToBase64 } from '@/utils/file'

interface EditProfileImageProps {
  imageUrl?: string
  onImageChange?: (base64: string) => void
}

const EditProfileImage = ({ imageUrl, onImageChange }: EditProfileImageProps): ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImagePickerClick = () => inputRef.current?.click()

  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onImageChange) {
      try {
        const base64String = await convertFileToBase64(file)
        onImageChange(base64String)
      } catch (error) {
        console.error('파일 변환 중 오류:', error)
      }
    }
  }

  return (
    <div className="relative mx-auto size-30 shrink-0 rounded-full border border-gray-300 bg-gray-300">
      {imageUrl && (
        <Image
          src={imageUrl}
          width={120}
          height={120}
          alt="profile-image"
          className="h-full w-full rounded-full object-cover"
        />
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleChangeFile}
      />
      <IconButton
        icon={CameraIcon}
        iconClassName="size-6 fill-gray-700"
        className="absolute right-0 bottom-0 rounded-full border border-gray-50 bg-white p-1"
        onClick={handleImagePickerClick}
      />
    </div>
  )
}

export default EditProfileImage
