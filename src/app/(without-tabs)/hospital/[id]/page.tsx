'use client'
import { useParams, useRouter } from 'next/navigation'
import { ReactElement } from 'react'
import { getAccessToken } from '@/apis/auth'
import StarIcon from '@/assets/icons/star_small.svg'
import Chip from '@/components/common/Chip'
import DescriptionItem from '@/components/common/DescriptionItem'
import EmptyState from '@/components/common/EmptyState'
import ErrorView from '@/components/common/Error'
import Layout from '@/components/common/Layout'
import Separator from '@/components/common/Separator'
import ReviewForm from '@/components/features/facility/ReviewForm'
import {
  useCreateHospitalReview,
  useHospitalDetail,
  useHospitalLikeStatus,
  useHospitalReviews,
  useToggleHospitalLike,
} from '@/queries/hospital'
import { formatDate } from '@/utils/date'

const HospitalDetailPage = (): ReactElement => {
  const params = useParams<{ id: string }>()
  const hospitalId = Number(params?.id)
  const router = useRouter()

  const { data: hospital, isLoading, isError, refetch } = useHospitalDetail(hospitalId)
  // 찜 여부는 서버가 알려준다. 로컬 state 로 두면 새로고침마다 초기화된다.
  const { data: likeStatus } = useHospitalLikeStatus(hospitalId)
  const { data: reviews = [], isLoading: isReviewLoading } = useHospitalReviews(hospitalId)
  const { mutate: toggleLike, isPending: isTogglingLike } = useToggleHospitalLike(hospitalId)
  const { mutate: createReview, isPending: isReviewPending } = useCreateHospitalReview(hospitalId)

  const liked = likeStatus?.liked ?? false
  const likeCount = likeStatus?.likeCount ?? 0

  const requireLogin = (action: () => void) => {
    if (!getAccessToken()) {
      router.push('/')
      return
    }
    action()
  }

  if (isError) {
    return (
      <Layout hasTopNav hasBackButton title="병원 정보">
        <ErrorView content="병원 정보를 불러오지 못했어요." onRetry={() => refetch()} />
      </Layout>
    )
  }

  return (
    <Layout hasTopNav hasBackButton title={hospital?.name ?? '병원 정보'}>
      {isLoading ? (
        <div className="flex flex-col gap-3 p-4.5">
          <div className="h-24 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-40 animate-pulse rounded-lg bg-gray-200" />
        </div>
      ) : (
        <>
          <section className="flex flex-col gap-3 bg-white px-4.5 py-5">
            <div className="flex flex-wrap items-center gap-2">
              {hospital?.grade && <Chip color="purple">{hospital.grade}</Chip>}
              {hospital?.type && <Chip color="blue">{hospital.type}</Chip>}
              <h1 className="text-t1-semibold text-gray-900">{hospital?.name}</h1>
            </div>

            <dl className="flex flex-col gap-1.5">
              {hospital?.address && <DescriptionItem title="주소" content={hospital.address} />}
              {hospital?.phoneNumber && (
                <DescriptionItem title="전화" content={hospital.phoneNumber} />
              )}
            </dl>

            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                disabled={isTogglingLike}
                onClick={() => requireLogin(() => toggleLike(liked))}
                aria-pressed={liked}
                className="text-b2-semibold rounded-full border border-green-600 px-3 py-1.5 text-green-700 transition-colors hover:bg-green-50 disabled:opacity-50"
              >
                {liked ? '찜 해제' : '찜하기'}
              </button>
              <span className="text-b2-regular text-gray-600">{`찜 ${likeCount}`}</span>
              {hospital?.phoneNumber && (
                <a
                  href={`tel:${hospital.phoneNumber}`}
                  className="text-b2-semibold ml-auto text-green-700 underline"
                >
                  전화 걸기
                </a>
              )}
            </div>
          </section>

          <Separator />

          <section className="flex flex-col gap-4 px-4.5 py-5">
            <h2 className="text-b1-semibold text-gray-800">{`리뷰 ${reviews.length}`}</h2>

            {isReviewLoading ? (
              <div className="h-20 animate-pulse rounded-lg bg-gray-200" />
            ) : !reviews.length ? (
              <EmptyState
                title="아직 리뷰가 없어요"
                description="진료 경험을 남겨 다른 부모님께 도움을 주세요."
              />
            ) : (
              <ul className="flex flex-col gap-3">
                {reviews.map((review) => (
                  <li
                    key={review.id}
                    className="flex flex-col gap-1.5 rounded-lg border border-gray-200 bg-white p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <StarIcon className="fill-yellow size-4" aria-hidden />
                        <span className="text-b1-semibold text-gray-800">
                          {review.rating ?? '-'}
                        </span>
                        {review.userName && (
                          <span className="text-c1-regular pl-2 text-gray-500">
                            {review.userName}
                          </span>
                        )}
                      </div>
                      <span className="text-c1-regular text-gray-500">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    <p className="text-b1-regular whitespace-pre-line text-gray-700">
                      {review.content}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <ReviewForm
              isPending={isReviewPending}
              onSubmit={(body) => requireLogin(() => createReview({ ...body, hospitalId }))}
            />
          </section>
        </>
      )}
    </Layout>
  )
}

export default HospitalDetailPage
