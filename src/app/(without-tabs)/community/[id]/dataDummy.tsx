import { Post } from '@/types/apis/community'

export const postDetailDummy: Post = {
  id: 1,
  title: 'Next.js 15 버전 업데이트 주요 내용 정리',
  content:
    '안녕하세요! 이번에 발표된 Next.js 15의 주요 업데이트 내용을 정리해봤습니다.\n\n가장 큰 변화는 React Compiler 지원이 기본으로 활성화된 점입니다. 덕분에 별도 설정 없이도 앱의 렌더링 성능이 크게 향상될 수 있습니다.\n\n자세한 내용은 본문을 참고해주세요.',
  category: '프론트엔드',
  author: {
    userId: 'dev_hong',
    name: '홍길동',
    profileImageUrl: 'https://avatar.iran.liara.run/public/boy',
  },
  tags: ['Next.js', 'React', 'TypeScript', '프론트엔드'],
  viewCount: 1284,
  likeCount: 256,
  commentCount: 2,
  isAnonymous: false,
  createdAt: '2025-08-18T14:30:00Z',
  updatedAt: '2025-08-18T14:35:00Z',
  comments: [
    {
      userId: 'user_lee',
      name: '이순신',
      content: '좋은 정보 감사합니다! React Compiler 기대되네요.',
    },
    {
      userId: 'dev_kim',
      name: '김유신',
      content: '덕분에 쉽게 이해했습니다. 잘 정리해주셨네요.',
    },
    {
      userId: 'dev_kim',
      name: '김유신',
      content: '덕분에 쉽게 이해했습니다. 잘 정리해주셨네요.',
    },
    {
      userId: 'dev_kim',
      name: '김유신',
      content: '덕분에 쉽게 이해했습니다. 잘 정리해주셨네요.',
    },
    {
      userId: 'dev_kim',
      name: '김유신',
      content: '덕분에 쉽게 이해했습니다. 잘 정리해주셨네요.',
    },
    {
      userId: 'dev_kim',
      name: '김유신',
      content: '덕분에 쉽게 이해했습니다. 잘 정리해주셨네요.',
    },
    {
      userId: 'dev_kim',
      name: '김유신',
      content: '덕분에 쉽게 이해했습니다. 잘 정리해주셨네요.',
    },
  ],
}
