export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      // .split(',')[1] 제거 - 완전한 Data URL 반환
      const base64String = reader.result as string
      resolve(base64String)
    }

    reader.onerror = () => {
      reject(new Error('파일 읽기 실패'))
    }

    reader.readAsDataURL(file)
  })
}
